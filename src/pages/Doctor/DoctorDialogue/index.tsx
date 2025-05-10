import {Empty, Spin, Avatar, Input, Button, List, message} from 'antd';
import {SendOutlined, LeftOutlined} from '@ant-design/icons';
import React, {useState, useRef, useEffect} from 'react';
import './index.less';
import {askUsingPost, getDoctorDialoguePageUsingPost} from "@/services/healthy_sys/doctorDialogueController";
import ReactMarkdown from "react-markdown";
import {getUserByIdUsingPost} from "@/services/healthy_sys/userController";
import { history } from '@umijs/max';
interface Message {
  id: string;
  content: string;
  isDoctor: boolean;
  loading?: boolean;
  operationTime?: string;
}

interface DoctorInfo {
  doctorId: number;
  doctorName: string;
  doctorAvatar: string;
}

const DoctorDialogue: React.FC = () => {
  // 初始化搜索参数(todo)
  const initSearchParams = {
    current: 1,
    pageSize: 100,
    sortField: 'create_time',
    sortOrder: 'asc',
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [searchParams] = useState<API.DoctorDialogueQueryDTO>({...initSearchParams});
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore] = useState(false);
  const [hasMore] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>();
// 加载历史消息 - 修改为直接设置messages状态
  const loadHistoryMessages = async () => {
    setLoading(true);
    try {

      const getDoctorRes = await getUserByIdUsingPost({
        userId: window.localStorage.getItem("doctorId")
      })
      if (!getDoctorRes.data) {
        message.error('获取医生信息失败');
      }
      setDoctorInfo({
        doctorId: getDoctorRes.data.id,
        doctorName: getDoctorRes.data.username,
        doctorAvatar: getDoctorRes.data.userAvatar
      })
      const res = await getDoctorDialoguePageUsingPost({
        ...searchParams,
        doctorId: window.localStorage.getItem("doctorId"),
        currentRole: 'user'
      });
      if (res.data?.records) {
        // 转换API数据为messages格式
        const historyMessages = res.data.records.map(item => ({
          id: item.id?.toString() || Date.now().toString(),
          content: item.content || '',
          isDoctor: item.spokesman === 'doctor',
          loading: item.status === 1,
          operationTime: item.operationTime
        }));
        setMessages(historyMessages);
      }
    } catch (e: any) {
      message.error('获取聊天记录失败: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

// AI回复处理 - 添加状态更新
  const userAsk = async (userInput: string) => {
    setLoading(true);

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      isDoctor: false,
      operationTime: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await askUsingPost({
        content: userInput,
        doctorId: window.localStorage.getItem("doctorId")
      });
      if (res.code !== 0){
        message.error('系统错误');
      }
    } catch (error) {
      message.error('系统错误');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) {
      message.warning('请输入消息内容');
      return;
    }
    userAsk(inputValue);
    setInputValue('');
  };

  // 处理滚动事件
  const handleScroll = () => {
    if (!listContainerRef.current) return;

    const {scrollTop} = listContainerRef.current;
    if (scrollTop < 100 && !loadingMore && hasMore) {
      // loadHistoryMessages();
    }
  };

  // 初始化加载数据
  useEffect(() => {
    loadHistoryMessages();
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    if (searchParams.current === 1) {
      messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);

  return (
    <div className="doctor-container">

      <div>
        <div className="doctor-header">
          <Button type={"link"} onClick={()=>{history.push('/doctor/info')}}>
            <LeftOutlined/>
            返回
          </Button>
        </div>
      </div>

      <div
        className="message-list-container"
        ref={listContainerRef}
        onScroll={handleScroll}
      >
        {loadingMore && (
          <div className="loading-more">
            <Spin tip="加载更多历史消息..."/>
          </div>
        )}

        {messages.length === 0 && !loadingMore ? (
          <div className="empty-container">
            <Empty description="暂无聊天记录"/>
          </div>
        ) : (
          <List
            dataSource={messages}
            renderItem={(item) => (
              <List.Item className={`message-item ${item.isDoctor ? 'doctor-message' : 'user-message'}`}>
                <div className="message-content">
                  <div className="message-avatar">
                    {item.isDoctor && <Avatar
                      src={doctorInfo?.doctorAvatar}
                      className="doctor-avatar"/>}
                  </div>
                  <div className="message-bubble">
                    {item.loading ? (
                      <Spin size="small"/>
                    ) : (
                      <>
                        <ReactMarkdown>{item.content}</ReactMarkdown>
                        {item.operationTime && (
                          <div className="message-time">
                            {new Date(item.operationTime).toLocaleString()}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
        <div ref={messagesEndRef}/>
      </div>

      <div className="input-container">
        <Input.TextArea
          rows={3}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="输入您的问题..."
          className="message-input"
        />
        <Button
          type="primary"
          icon={<SendOutlined/>}
          onClick={handleSend}
          loading={loading}
          className="send-button"
        >
          发送
        </Button>
      </div>
    </div>
  );
};

export default DoctorDialogue;

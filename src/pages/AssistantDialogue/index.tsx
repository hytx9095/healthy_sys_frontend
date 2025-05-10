import { Empty, Spin, Avatar, Input, Button, List, message } from 'antd';
import { SendOutlined, RobotOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import { useModel } from "@@/exports";
import {chatUsingPost, getAssistantDialoguePageUsingPost} from "@/services/healthy_sys/assistantDialogueController";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  loading?: boolean;
  operationTime?: string;
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
  const [searchParams, setSearchParams] = useState<API.AssistantDialogueQueryDTO>({...initSearchParams});
  const [inputValue, setInputValue] = useState('');
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

// 加载历史消息 - 修改为直接设置messages状态
  const loadHistoryMessages = async () => {
    setLoading(true);
    try {
      const res = await getAssistantDialoguePageUsingPost(searchParams);
      if (res.data?.records) {
        // 转换API数据为messages格式
        const historyMessages = res.data.records.map(item => ({
          id: item.id?.toString() || Date.now().toString(),
          content: item.content || '',
          isAI: item.spokesman === 'assistant',
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
  const getAIResponse = async (userInput: string) => {
    setLoading(true);

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      isAI: false,
      operationTime: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await chatUsingPost({ content: userInput });
      if (res.data) {
        // 添加AI回复
        const aiMessage: Message = {
          id: Date.now().toString() + '-ai',
          content: res.data.content || '',
          isAI: true,
          loading: true,
          operationTime: new Date().toISOString()
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      message.error('获取AI回复失败');
    } finally {
      setLoading(false);
    }
  };


  const handleSend = () => {
    if (!inputValue.trim()) {
      message.warning('请输入消息内容');
      return;
    }
    getAIResponse(inputValue);
    setInputValue('');
  };

  // 处理滚动事件
  const handleScroll = () => {
    if (!listContainerRef.current) return;

    const { scrollTop } = listContainerRef.current;
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
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="assistant-container">
      <div
        className="message-list-container"
        ref={listContainerRef}
        onScroll={handleScroll}
      >
        {loadingMore && (
          <div className="loading-more">
            <Spin tip="加载更多历史消息..." />
          </div>
        )}

        {messages.length === 0 && !loadingMore ? (
          <div className="empty-container">
            <Empty description="暂无聊天记录" />
          </div>
        ) : (
          <List
            dataSource={messages}
            renderItem={(item) => (
              <List.Item className={`message-item ${item.isAI ? 'ai-message' : 'user-message'}`}>
                <div className="message-content">
                  <div className="message-avatar">
                    {item.isAI && <Avatar src={'https://img2.baidu.com/it/u=646080001,2138416633&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'} className="ai-avatar" />}
                  </div>
                  <div className="message-bubble">
                    {item.loading ? (
                      <Spin size="small" />
                    ) : (
                      <>
                        <ReactMarkdown>{item.content}</ReactMarkdown>
                        {/*<AiResponseContent content={item.content}/>*/}
                        {/*<div className="message-text">{item.content}</div>*/}
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
        <div ref={messagesEndRef} />
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
          icon={<SendOutlined />}
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

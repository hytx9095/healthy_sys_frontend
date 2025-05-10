import {Avatar, Button, Empty, Input, List, message, Spin, Tabs} from 'antd';
import {LeftOutlined, SendOutlined} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from 'react';
import './index.less';
import { history } from '@umijs/max';
import {
  answerUsingPost,
  getDoctorDialoguePageUsingPost,
  getDoctorDialogueUserUsingPost
} from "@/services/healthy_sys/doctorDialogueController";
import ReactMarkdown from "react-markdown";
import {useModel} from "@@/exports";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  createTime?: string;
}
const MessageCenter: React.FC = () => {

  const initSearchParams = {
    current: 1,
    pageSize: 100,
    sortField: 'create_time',
    sortOrder: 'desc',
  };

  const [searchParams] = useState<API.DoctorDialogueQueryDTO>({...initSearchParams});
  // 联系人数据
  const [contacts, setContacts] = useState<API.UserContact[]>();
  // 当前选中的联系人
  const [currentContact, setCurrentContact] = useState<API.UserContact | null>(null);
  // 消息数据
  const [messages, setMessages] = useState<Message[]>([]);
  // 输入框内容
  const [inputValue, setInputValue] = useState('');
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [loadingMore] = useState(false);
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState ?? {};
  const messagesEndRef = useRef<HTMLDivElement>(null);


  // 加载联系人列表
  const loadUserContacts =  async () => {
    const res = await getDoctorDialogueUserUsingPost();
    if (!res.data) {
      message.error('获取联系人列表失败');
      return;
    }
    setContacts(res.data);
  }

  // 加载联系人消息
  const loadMessages = async (contact: API.UserContact) => {
    setCurrentContact(contact);

    const res = await getDoctorDialoguePageUsingPost({
      ...searchParams,
      userId: contact.userId,
      currentRole: 'doctor',
    });

    if (res.data?.records) {
      // 转换API数据为messages格式，并反转顺序使最新的在底部
      const historyMessages = res.data.records
        .map(item => ({
          id: item.id?.toString() || Date.now().toString(),
          content: item.content || '',
          isUser: item.spokesman === 'user',
          createTime: item.createTime
        }))
        .reverse(); // 反转数组使最新消息在底部

      setMessages(historyMessages);

      // 滚动到底部
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    // 标记为已读
    setContacts(contacts?.map(c =>
      c.userId === contact.userId ? {...c, unread: 0} : c
    ));
  };

  const doctorAnswer = async (userInput: string) => {

    // 添加医生消息
    const doctorMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      isUser: false,
      createTime: new Date().toISOString()
    };

    setMessages(prev => [...prev, doctorMessage]);

    try {
      const res = await answerUsingPost({
        content: userInput,
        userId: currentContact?.userId
      });
    } catch (error) {
      message.error('获取AI回复失败');
    }
  };

  // 发送消息
  const handleSend = async () => {
    if (!inputValue.trim()) {
      message.warning('请输入消息内容');
      return;
    }

    if (!currentContact) {
      message.warning('请选择联系人');
      return;
    }

    await doctorAnswer(inputValue);
    setInputValue('');

    // 更新联系人最后消息
    setContacts(contacts?.map(c =>
      c.userId === currentContact.userId
        ? {...c, lastMessage: inputValue, lastTime: '刚刚'}
        : c
    ));

    // 滚动到底部
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 处理滚动事件
  const handleScroll = () => {
    if (!listContainerRef.current) return;

    // const {scrollTop} = listContainerRef.current;
    // if (scrollTop < 100 && !loadingMore && hasMore) {
    //   // loadHistoryMessages();
    // }
  };

  // 初始化加载数据
  useEffect(() => {
    loadUserContacts();
  }, []);

  return (
    <div className="message-center">
      <div className="message-container">
        {/* 左侧消息列表 - 修改后 */}
        <div className="contact-list">
          <div className="message-tab-title">咨询消息</div>
          <List
            dataSource={contacts}
            renderItem={contact => (
              <List.Item
                className={`contact-item ${currentContact?.userId === contact.userId ? 'active' : ''}`}
                onClick={() => loadMessages(contact)}
              >
                <div className="contact-info">
                  <Avatar src={contact.userAvatar} size={48} />
                  <div className="contact-detail">
                    <div className="contact-name">{contact.username}</div>
                    <div className="contact-last">{contact.lastMessage}</div>
                  </div>
                </div>
                <div className="contact-meta">
                  <div className="contact-time">{contact.lastTime}</div>
                  {contact.unread > 0 && (
                    <div className="unread-count">{contact.unread}</div>
                  )}
                </div>
              </List.Item>
            )}
          />
          <div>
            <Button type={"link"} onClick={() => {history.push('/doctor/info')}}>
              <LeftOutlined/>
              返回
            </Button>
          </div>
        </div>

        {/* 右侧聊天区域 */}
        <div className="chat-area">
          {currentContact ? (
            <>
              <div className="chat-header">
                <Avatar src={currentContact.userAvatar} size={40} />
                <div className="chat-title">{currentContact.username}</div>
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
                      <List.Item className={`message-item ${item.isUser ? 'user-message' : 'doctor-message'}`}>
                        <div className="message-content">
                          <div className="message-avatar">
                            {item.isUser && <Avatar
                              src={currentContact?.userAvatar}
                              className="doctor-avatar"/>}
                          </div>
                          <div className="message-bubble">
                            <ReactMarkdown>{item.content}</ReactMarkdown>
                            {item.createTime && (
                              <div className="message-time">
                                {new Date(item.createTime).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                )}
                <div ref={messagesEndRef}/>
              </div>


              <div className="message-input">
                <Input.TextArea
                  rows={3}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onPressEnter={e => {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="输入消息内容..."
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSend}
                  className="send-button"
                >
                  发送
                </Button>
              </div>
            </>
          ) : (
            <div className="chat-empty">
              <Empty description="请选择联系人开始聊天" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;

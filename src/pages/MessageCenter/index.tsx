import { Avatar, Button, Empty, List, message, Spin } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import { history } from '@umijs/max';
import ReactMarkdown from 'react-markdown';
import {getMessageUserPageUsingPost} from '@/services/healthy_sys/messageController';
import { useModel } from '@@/exports';

const MessageCenter: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 100,
    sortField: 'create_time',
    sortOrder: 'desc',
  };

  const [searchParams] = useState<API.DoctorDialogueQueryDTO>({ ...initSearchParams });
  const [messages, setMessages] = useState<API.MessageVO[]>([]);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [loadingMore] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 固定的系统消息联系人
  const systemContact = {
    userId: 'system',
    username: '系统消息',
    userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    lastMessage: '系统通知和提醒',
    lastTime: '刚刚',
    unread: 0,
  };

  // 加载系统消息
  const loadSystemMessages = async () => {
    const res = await getMessageUserPageUsingPost({
      ...searchParams,
      userId: currentUser?.id,
    });

    if (res.code !== 0) {
      message.error('获取系统消息失败');
      return;
    }
    setMessages(res.data?.records || []);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 处理滚动事件
  const handleScroll = () => {
    if (!listContainerRef.current) return;
    // 可以在这里添加加载更多历史消息的逻辑
  };

  // 初始化加载数据
  useEffect(() => {
    loadSystemMessages();
  }, []);

  return (
    <div className="message-center">
      <div className="message-container">
        {/* 左侧固定系统消息联系人 */}
        <div className="contact-list">
          <div className="message-tab-title">系统消息</div>
          <List
            dataSource={[systemContact]}
            renderItem={contact => (
              <List.Item
                className="contact-item active" // 始终激活状态
                onClick={() => loadSystemMessages()}
              >
                <div className="contact-info">
                  <Avatar src={contact.userAvatar} size={48} />
                  <div className="contact-detail">
                    <div className="contact-name">{contact.username}</div>
                    <div className="contact-last">{contact.lastMessage}</div>
                  </div>
                </div>
              </List.Item>
            )}
          />
          <div>
            <Button type="link" onClick={() => history.push('/home')}>
              <LeftOutlined />
              返回
            </Button>
          </div>
        </div>

        {/* 右侧系统消息聊天区域 */}
        <div className="chat-area">
          <>
            <div className="chat-header" style={{ textAlign: 'center' }}>
              <Avatar src={systemContact.userAvatar} size={40} />
              <div className="chat-title">{systemContact.username}</div>
            </div>

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
                  <Empty description="暂无系统消息" />
                </div>
              ) : (
                <List
                  dataSource={messages}
                  renderItem={(item) => (
                    <List.Item className={`message-item 'system-message'}`}>
                      <div className="message-content">
                        <div className="message-avatar">
                          <Avatar src={systemContact.userAvatar} className="system-avatar" />
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
              <div ref={messagesEndRef} />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;

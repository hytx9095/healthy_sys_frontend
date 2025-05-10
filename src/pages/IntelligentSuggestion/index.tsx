import { Card, Tabs, Tag, List, Button, Empty, Divider, Typography, message, Pagination } from 'antd';
import {
  BulbOutlined,
  HistoryOutlined,
  CheckOutlined
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  generateSuggestionUsingPost,
  getSuggestionsUsingPost, updateSuggestionUsingPost,
} from "@/services/healthy_sys/suggestionController";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const IntelligentSuggestion: React.FC = () => {

  const [searchParams, setSearchParams] = useState<API.SuggestionQueryDTO>({
    current: 1,
    pageSize: 9,
    sortField: 'create_time',
    sortOrder: 'desc',
  });
  const [currentList, setCurrentList] = useState<API.Suggestion[]>([]);
  const [historyList, setHistoryList] = useState<API.Suggestion[]>([]);
  const [currentTotal, setCurrentTotal] = useState<number>(0);
  const [historyTotal, setHistoryTotal] = useState<number>(0);
  const [activeTab, setActiveTab] = useState('current');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  // 加载当前建议
  const loadCurrentSuggestions = async () => {
    setLoading(true);
    try {
      const res = await getSuggestionsUsingPost({
        ...searchParams,
        isRead: 0
      });
      if (res.code === 0 && res.data) {
        if (res.data.records?.length !== 0){
          setGenerating(false);
        }
        setCurrentList(res.data.records || []);
        setCurrentTotal(res.data.total || 0);
      } else {
        message.error(res.msg || '获取当前建议失败');
      }
    } catch (e: any) {
      message.error('获取当前建议失败: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  // 加载历史建议
  const loadHistorySuggestions = async () => {
    setLoading(true);
    try {
      const res = await getSuggestionsUsingPost({
        ...searchParams,
        isRead: 1
      });
      if (res.code === 0 && res.data) {
        setHistoryList(res.data.records || []);
        setHistoryTotal(res.data.total || 0);
      } else {
        message.error(res.msg || '获取历史建议失败');
      }
    } catch (e: any) {
      message.error('获取历史建议失败: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  // 生成建议
  const generateSuggestions = async () => {
    if (generating){
      return;
    }
    setLoading(true);
    try {
      const res = await generateSuggestionUsingPost();
      if (res.code === 0) {
        setGenerating(true);
        if (activeTab === 'current') {
          loadCurrentSuggestions();
        } else {
          loadHistorySuggestions();
        }
      } else {
        message.error(res.msg || '生成建议失败');
      }
    } catch (error) {
      message.error('生成建议失败');
    } finally {
      setLoading(false);
    }
  };

  // 标记建议为已读
  const markAsRead = async (id: number) => {
    try {
      const res = await updateSuggestionUsingPost({
        id: id,
        isRead: 1
      });
      if (res.code === 0) {
        loadCurrentSuggestions();
        loadHistorySuggestions();
      } else {
        message.error(res.msg || '标记失败');
      }
    } catch (error) {
      message.error('标记失败');
    }
  };

  // 分页变化处理
  const handlePageChange = (page: number, pageSize?: number) => {
    setSearchParams({
      ...searchParams,
      current: page,
      pageSize: pageSize || searchParams.pageSize
    });
  };

  // 切换标签页时加载对应数据
  useEffect(() => {
    if (activeTab === 'current') {
      loadCurrentSuggestions();
    } else {
      loadHistorySuggestions();
    }
  }, [activeTab, searchParams.current, searchParams.pageSize]);

  // 渲染当前建议
  const renderCurrentSuggestions = () => {
    if (loading) {
      return <Card loading={true} />;
    }

    if (currentList.length === 0) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无当前建议"
        />
      );
    }

    return (
      <>
        <List
          itemLayout="vertical"
          dataSource={currentList}
          renderItem={item => (
            <Card
              key={item.id}
              style={{ marginBottom: 16 }}
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text strong style={{ marginLeft: 8 }}>{item.title}</Text>
                </div>
              }
              extra={
                <Text type="secondary">
                  {moment(item.createTime).format('YYYY-MM-DD HH:mm')}
                </Text>
              }
            >
              <Text style={{ marginBottom: 16 }}>{item.content}</Text>
              <Divider style={{ margin: '12px 0' }} />
              <div>
                <Button
                  type="primary"
                  size="small"
                  style={{ float: 'right'}}
                  onClick={() => markAsRead(item.id as number)}
                  loading={loading}
                >
                  <CheckOutlined />
                </Button>
              </div>
            </Card>
          )}
        />
        <div style={{ textAlign: 'right', marginTop: 16 }}>
          <Pagination
            current={searchParams.current}
            pageSize={searchParams.pageSize}
            total={currentTotal}
            onChange={handlePageChange}
            showSizeChanger
            showQuickJumper
            showTotal={total => `共 ${total} 条建议`}
          />
        </div>
      </>
    );
  };

  // 渲染历史建议
  const renderHistorySuggestions = () => {
    if (loading) {
      return <Card loading={true} />;
    }

    if (historyList.length === 0) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无历史建议记录"
        />
      );
    }

    return (
      <>
        <List
          itemLayout="vertical"
          dataSource={historyList}
          renderItem={item => (
            <Card
              key={item.id}
              style={{ marginBottom: 16 }}
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text strong style={{ marginLeft: 8 }}>{item.title}</Text>
                </div>
              }
              extra={
                <Text type="secondary">
                  {moment(item.createTime).format('YYYY-MM-DD HH:mm')}
                </Text>
              }
            >
              <Text>{item.content}</Text>
              <div style={{ marginTop: 16 }}>
                <Tag color="green">已读</Tag>
                <Tag color="default" style={{ marginLeft: 8 }}>
                  {moment(item.createTime).fromNow()}
                </Tag>
              </div>
            </Card>
          )}
        />
        <div style={{ textAlign: 'right', marginTop: 16 }}>
          <Pagination
            current={searchParams.current}
            pageSize={searchParams.pageSize}
            total={historyTotal}
            onChange={handlePageChange}
            showSizeChanger
            showQuickJumper
            showTotal={total => `共 ${total} 条记录`}
          />
        </div>
      </>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <Title level={4} style={{ marginBottom: 24 }}>
        <BulbOutlined /> 智能健康建议
      </Title>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        tabBarExtraContent={
          <Button
            type="primary"
            icon={<BulbOutlined />}
            onClick={generateSuggestions}
            loading={loading}
          >
            {generating ? '正在生成建议......' : '生成建议'}
          </Button>
        }
      >
        <TabPane
          tab={
            <span>
              <BulbOutlined style={{marginRight: 8}} />
              当前建议
            </span>
          }
          key="current"
        >
          {renderCurrentSuggestions()}
        </TabPane>
        <TabPane
          tab={
            <span>
              <HistoryOutlined style={{marginRight: 8}} />
              历史建议
            </span>
          }
          key="history"
        >
          {renderHistorySuggestions()}
        </TabPane>
      </Tabs>

      <Divider style={{ margin: '24px 0' }} />

      <Text type="secondary">
        提示: 系统会根据您的健康数据(如运动、饮食、睡眠等)自动生成个性化建议
      </Text>
    </div>
  );
};

export default IntelligentSuggestion;

import { getHomeHealthyKnowledgeVoPageUsingPost } from '@/services/healthy_sys/healthyKnowledgeController';
import { getHealthyNewsVoPageUsingPost } from '@/services/healthy_sys/healthyNewsController';
import { Card, Carousel, Col, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const contentStyle: React.CSSProperties = {
    height: '180px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'gray',
    backgroundImage: 'url(/images/homeBackground.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const [knowledgeList, setKnowledgeList] = useState<API.HealthyKnowledgeVO[]>([]);
  const [newsList, setNewsList] = useState<API.HealthyNewsVO[]>([]);
  const [loading, setLoading] = useState(false);

  // 获取健康知识
  const fetchKnowledge = async () => {
    try {
      const res = await getHomeHealthyKnowledgeVoPageUsingPost({
        current: 1,
        pageSize: 5,
        sortField: 'create_time',
        sortOrder: 'desc',
      });
      if (res.data) {
        setKnowledgeList(res.data ?? []);
      }
    } catch (error) {
      console.error('获取健康知识失败:', error);
    }
  };

  // 获取健康资讯
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await getHealthyNewsVoPageUsingPost({
        current: 1,
        pageSize: 5,
        sortField: 'create_time',
        sortOrder: 'desc',
        isHome: 1,
      });
      if (res.data) {
        setNewsList(res.data.records ?? []);
      }
    } catch (error) {
      console.error('获取健康资讯失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKnowledge();
    fetchNews();
  }, []);

  return (
    <div className="home-page">
      {/* 轮播图 */}
      <Carousel autoplay effect="fade" autoplaySpeed={3000}>
        {[
          {
            title: '您的健康数据管家',
            subtitle: '全面记录身高、体重、BMI等健康指标，随时掌握身体状况',
            bgColor: '#1890ff',
          },
          {
            title: '智能健康建议',
            subtitle: '基于您的健康数据，提供个性化运动和饮食方案',
            bgColor: '#52c41a',
          },
          {
            title: '健康风险预警',
            subtitle: '分析历史数据，预测潜在健康风险，防患于未然',
            bgColor: '#fa8c16',
          },
          {
            title: '健康知识社区',
            subtitle: '分享交流健康知识，提升全民健康意识',
            bgColor: '#722ed1',
          },
        ].map((item, index) => (
          <div key={index}>
            <div
              style={{
                ...contentStyle,
                background: `linear-gradient(135deg, ${item.bgColor} 0%, #001529 100%)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px',
              }}
            >
              <h2
                style={{
                  color: '#fff',
                  fontSize: '32px',
                  marginBottom: '16px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                {item.title}
              </h2>
              <p
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '18px',
                  maxWidth: '60%',
                  textAlign: 'center',
                  lineHeight: 1.6,
                }}
              >
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </Carousel>

      {/* 主要内容区 */}
      <Row gutter={24} style={{ marginTop: 24 }}>
        {/* 健康知识区 */}
        <Col span={12}>
          <Card title="健康知识分享" bordered={false}>
            <Carousel autoplay autoplaySpeed={5000} dots={false}>
              {knowledgeList.map((item) => (
                <div key={item.id}>
                  <Card>
                    <div style={{ minHeight: 100 }}>{item.content?.substring(0, 150)}</div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 16,
                      }}
                    >
                      {/* 标签 - 左下角 */}
                      <div>
                        {item.tags
                          ?.replace(/[[\]"]/g, '')
                          .split(',')
                          .map((tag, index) => (
                            <Tag key={index} color="blue" style={{ marginRight: 8 }}>
                              {tag.trim()}
                            </Tag>
                          ))}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </Carousel>
          </Card>
        </Col>

        {/* 健康资讯区 */}
        <Col span={12}>
          <Card title="健康资讯" bordered={false} loading={loading}>
            <Carousel autoplay autoplaySpeed={6000} dots={false}>
              {newsList.map((item) => (
                <div key={item.id}>
                  <Card>
                    <div style={{ minHeight: 100 }}>{item.content}</div>
                  </Card>
                </div>
              ))}
            </Carousel>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

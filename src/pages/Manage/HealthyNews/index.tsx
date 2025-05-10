import {Avatar, Button, Card, Form, List, message, Modal} from 'antd';
import Search from 'antd/es/input/Search';
import React, {useEffect, useState} from 'react';
import {ProFormText} from "@ant-design/pro-components";
import TextArea from "antd/es/input/TextArea";
import {
  addHealthyNewsUsingPost,
  getHealthyNewsVoPageUsingPost,
  updateHealthyNewsUsingPost
} from "@/services/healthy_sys/healthyNewsController";
import ReactMarkdown from "react-markdown";

/**
 * 健康资讯页面
 * @constructor
 */
const HealthyNews: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 9,
    sortField: 'create_time',
    sortOrder: 'desc',
  };

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchParams, setSearchParams] = useState<API.HealthyNewsQueryDTO>({...initSearchParams});
  const [healthyNewsList, setHealthyNewsList] = useState<API.HealthyNewsVO[]>();
  const [total, setTotal] = useState<number>(0);
  const [currentHealthyNews, setCurrentHealthyNews] = useState<API.HealthyNewsVO>();
  const [loading, setLoading] = useState<boolean>(true);
  const [addModel, setAddModel] = useState(false);
  const [editModel, setEditModel] = useState(false);


  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getHealthyNewsVoPageUsingPost(searchParams);
      if (res.data) {
        setHealthyNewsList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取健康资讯失败');
      }
    } catch (e: any) {
      message.error('获取健康资讯失败，' + e.message);
    }
    setLoading(false);
  };

  const openAddModal = () => {
    setAddModel(true);
  }

  const closeAddModal = () => {
    setAddModel(false);
    addForm.resetFields()
  }

  const addHealthyNews = async () => {
    try {
      const res = await addHealthyNewsUsingPost({
        content: addForm.getFieldValue('content'),
      });
      if (res.code === 0) {
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    } catch (error) {
      message.error('添加失败');
    }
    closeAddModal()
    loadData();
  };

  const openEditModal = (healthyNews: API.HealthyKnowledgeVO) => {
    setCurrentHealthyNews(healthyNews)
    setEditModel(true);
  }

  const closeEditModal = () => {
    setEditModel(false);
    editForm.resetFields()
  }

  const editHealthyNews = async () => {
    try {
      const res = await updateHealthyNewsUsingPost({
        id: currentHealthyNews?.id,
        content: editForm.getFieldValue('content'),
      });
      if (res.code === 0) {
        message.success('编辑成功');
      } else {
        message.error('编辑失败');
      }
    } catch (error) {
      message.error('编辑失败');
    }
    closeEditModal();
    loadData();
  };

  const updateIsHome = async (isHome: number, healthyNewsId: number) => {
    try {
      const res = await updateHealthyNewsUsingPost({
        id: healthyNewsId,
        isHome: isHome,
      });
      if (res.code === 0) {
        loadData();
      } else {
        message.error('更新失败');
      }
    } catch (error) {
      message.error('更新失败');
    }
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  // 添加useEffect监听
  useEffect(() => {
    if (editModel && currentHealthyNews) {
      editForm.setFieldsValue({
        content: currentHealthyNews.content,
      });
    }
  }, [currentHealthyNews, editModel, editForm]);

  return (
    <div className="my-chart-page">
      <div>
        <Search
          placeholder="请输入资讯内容"
          enterButton
          loading={loading}
          onSearch={(value) => {
            setSearchParams({
              ...initSearchParams,
              content: value,
            });
          }}
          style={{width: '30%', float: 'right'}}
        />
      </div>
      <div style={{marginTop: 50, marginBottom: 20}}>
        <Button type={"primary"} style={{marginRight: 20}} onClick={openAddModal}>添加健康资讯</Button>
      </div>
      <div className="margin-16"/>
      <List
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            });
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        loading={loading}
        dataSource={healthyNewsList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              style={{
                width: '100%',
                position: 'relative',
                marginBottom: 16,
                overflow: 'visible'
              }}
              bodyStyle={{ padding: '16px' }}
            >
              {/* 推荐标签 */}
              {item.isHome === 1 && (
                <div style={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  backgroundColor: '#ff4d4f',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '2px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  zIndex: 1,
                  fontSize: 12,
                  fontWeight: 'bold',
                  transform: 'rotate(5deg)'
                }}>
                  今日资讯
                </div>
              )}

              {/* 头像和标题在同一行 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 16
              }}>
                <Avatar
                  src={item.userAvatar}
                  style={{
                    marginRight: 12,
                    width: 40,
                    height: 40
                  }}
                />
                <h3 style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 500
                }}>{item.username}</h3>
              </div>

              {/* 内容区域 */}
              <div style={{
                margin: '16px 0',
                paddingTop: item.isHome === 1 ? '8px' : '0'
              }}>
                <ReactMarkdown>{item.content}</ReactMarkdown>
              </div>

              {/* 操作按钮 */}
              <div style={{
                textAlign: 'right',
                marginTop: 16
              }}>
                {item.isHome === 0 ? (
                  <Button
                    type="primary"
                    onClick={() => updateIsHome(1, item.id as number)}
                    style={{ marginRight: 8 }}
                  >
                    首页展示
                  </Button>
                ) : (
                  <Button
                    onClick={() => updateIsHome(0, item.id as number)}
                    style={{ marginRight: 8 }}
                  >
                    取消首页展示
                  </Button>
                )}
                <Button type={"primary"} style={{marginRight: 8}} onClick={()=>{openEditModal(item)}}>编辑</Button>
                <Button danger>删除</Button>
              </div>
            </Card>
          </List.Item>

        )}
      />

      <Modal
        title="添加健康资讯"
        open={addModel}
        onOk={addHealthyNews}
        onCancel={closeAddModal}
        width={800}
      >
        <Card>
          <Form form={addForm}>
            <ProFormText
              name={'content'}
              label={'资讯内容'}
            >
              <TextArea
                placeholder="请输入资讯内容"
                autoSize={{ minRows: 6 }}
                style={{ width: '100%' }}
              />
            </ProFormText>
          </Form>
        </Card>
      </Modal>

      <Modal
        title="添加健康资讯"
        open={editModel}
        onOk={editHealthyNews}
        onCancel={closeEditModal}
        width={800}
      >
        <Card>
          <Form form={editForm}>
            <ProFormText
              name={'content'}
              label={'资讯内容'}
            >
              <TextArea
                placeholder="请输入资讯内容"
                autoSize={{ minRows: 6 }}
                style={{ width: '100%' }}
              />
            </ProFormText>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default HealthyNews;

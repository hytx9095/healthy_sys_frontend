import {useModel} from '@@/exports';
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
 * 我的图表页面
 * @constructor
 */
const QuestionBank: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 9,
    sortField: 'create_time',
    sortOrder: 'desc',
  };

  const [addForm] = Form.useForm();
  const [healthyNewsId, setHealthyNewsId] = useState<number>();
  const [searchParams, setSearchParams] = useState<API.HealthyNewsQueryDTO>({...initSearchParams});
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState ?? {};
  const [healthyNewsList, setHealthyNewsList] = useState<API.HealthyNewsVO[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // 新增状态来控制模态框的显示
  const [addModel, setAddModel] = useState(false);


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

  const test = () => {
    message.success(healthyNewsId)
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
    setAddModel(false);
    addForm.resetFields()
    loadData();
  };

  const updateIsHome = async (isHome: number, healthyNewsId: number) => {
    try {
      const res = await updateHealthyNewsUsingPost({
        id: healthyNewsId,
        isHome: isHome,
      });
      if (res.code === 0) {
        message.success('更新成功');
        loadData();
      } else {
        message.error('更新失败');
      }
    } catch (error) {
      message.error('更新失败');
    }
  };

  // 当组件挂载时加载数据
  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div className="my-chart-page">
      <div>
        <Search
          placeholder="请输入作者、标签、内容"
          enterButton
          loading={loading}
          onSearch={(value) => {
            // 设置搜索条件
            setSearchParams({
              ...initSearchParams,
              name: value,
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
          <Card
            style={{
              width: '100%',
              position: 'relative',
              marginBottom: 16,
              overflow: 'visible' // 确保标签不被裁剪
            }}
            bodyStyle={{ padding: '16px' }}
          >
            {/* 推荐标签 - 右上角醒目但不遮挡 */}
            {item.isHome === 1 && (
              <div style={{
                position: 'absolute',
                top: -10, // 向上偏移露出完整标签
                right: -10, // 向右偏移
                backgroundColor: '#ff4d4f',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '2px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 1,
                fontSize: 12,
                fontWeight: 'bold',
                transform: 'rotate(5deg)' // 轻微倾斜增加设计感
              }}>
                今日资讯
              </div>
            )}

            {/* 卡片内容 */}
            <List.Item.Meta
              avatar={<Avatar src={item.userAvatar} />}
              title={item.username}
              description={item.createTime}
            />

            {/* 内容区域 */}
            <div style={{
              margin: '16px 0',
              paddingTop: item.isHome === 1 ? '8px' : '0' // 推荐时有额外间距
            }}>
              <ReactMarkdown>{item.content}</ReactMarkdown>
            </div>

            {/* 操作按钮 */}
            <div style={{ textAlign: 'right' }}>
              {item.isHome === 0 ? (
                <Button type="primary" onClick={() => updateIsHome(1, item.id)}>
                  首页展示
                </Button>
              ) : (
                <Button onClick={() => updateIsHome(0, item.id)}>
                  取消首页展示
                </Button>
              )}
              <Button danger style={{ marginLeft: 16 }} onClick={() => test(item.id)}>
                删除
              </Button>
            </div>
          </Card>
        )}
      />

      <Modal
        title="添加健康资讯"
        open={addModel}
        onOk={addHealthyNews}
        onCancel={closeAddModal}
      >
        <Card>
          <Form
            form={addForm}>
            <ProFormText
              name={'content'}
              label={'资讯内容'}
            >
              <TextArea placeholder={"请输入资讯内容"}></TextArea>
            </ProFormText>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};
export default QuestionBank;

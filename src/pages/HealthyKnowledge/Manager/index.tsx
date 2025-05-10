import {useModel} from '@@/exports';
import {Avatar, Button, Card, Dropdown, Form, List, Menu, message, Modal, Radio} from 'antd';
import Search from 'antd/es/input/Search';
import React, {useEffect, useState} from 'react';
import {
  addHealthyKnowledgeUsingPost, deleteHealthyKnowledgeUsingDelete, examineHealthyKnowledgeUsingPost,
  getHealthyKnowledgeVoPageUsingPost, shareHealthyKnowledgeUsingPost
} from "@/services/healthy_sys/healthyKnowledgeController";
import {EllipsisOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import {ProFormText} from "@ant-design/pro-components";
import moment from "moment"
import TextArea from "antd/es/input/TextArea";

/**
 * 管理员健康知识库页面
 * @constructor
 */
const HealthyKnowledge: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 9,
    sortField: 'create_time',
    sortOrder: 'desc',
  };

  const [addForm] = Form.useForm();
  const [examineForm] = Form.useForm();
  const [shareForm] = Form.useForm();
  const [healthyKnowledgeId, setHealthyKnowledgeId] = useState<number>();
  const [searchParams, setSearchParams] = useState<API.HealthyKnowledgeQueryDTO>({...initSearchParams});
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState ?? {};
  const [currentHealthyKnowledge, setCurrentHealthyKnowledge] = useState<API.HealthyKnowledge>();
  const [healthyKnowledgeList, setHealthyKnowledgeList] = useState<API.HealthyKnowledgeVO[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // 新增状态来控制模态框的显示
  const [addKnowledgeModel, setAddKnowledgeModel] = useState(false);
  const [examineModel, setExamineModel] = useState(false);
  const [shareModel, setShareModel] = useState(false);
  let [dataChange] = useState(0);


  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getHealthyKnowledgeVoPageUsingPost(searchParams);
      if (res.data) {
        setHealthyKnowledgeList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取健康知识失败');
      }
    } catch (e: any) {
      message.error('获取健康知识失败，' + e.message);
    }
    setLoading(false);
  };

  const getHealthyKnowledgePage = async (status: number) => {
    try {
      if (status !== 2) {
        setSearchParams({
          ...searchParams,
          status: status,
        })
      } else {
        setSearchParams({
          ...initSearchParams,
        })
      }
    } catch (error) {
      message.error('系统错误');
    }
  };

  const openExamineModal = (healthyKnowledge: API.HealthyKnowledge) => {
    setCurrentHealthyKnowledge({
      ...healthyKnowledge,
    })
    setExamineModel(true);
  }

  const closeExamineModal = () => {
    setExamineModel(false);
    examineForm.resetFields();
  }
  const passHealthyKnowledge = async () => {
    try {
      const res = await examineHealthyKnowledgeUsingPost({
        healthyKnowledgeId: currentHealthyKnowledge?.id,
        result: 'pass',
        description: examineForm.getFieldValue('description'),
      });
      if (res.code === 0) {
        message.success('审核成功');
      } else {
        message.error('审核失败');
      }
    } catch (error) {
      message.error('审核失败');
    }
    setExamineModel(false);
    examineForm.resetFields()
  };

  const rejectHealthyKnowledge = async () => {
    try {
      const res = await examineHealthyKnowledgeUsingPost({
        healthyKnowledgeId: currentHealthyKnowledge?.id,
        result: "not pass",
        description: examineForm.getFieldValue('description'),
      });
      if (res.code === 0) {
        message.success('驳回成功');
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error('驳回失败');
    }
    setExamineModel(false);
    examineForm.resetFields()
  };
  const addHealthyKnowledge = async () => {
    try {
      const res = await addHealthyKnowledgeUsingPost({
        type: addForm.getFieldValue('type'),
        content: addForm.getFieldValue('content'),
        //集合
        tags: ["跑步"],
      });
      if (res.code === 0) {
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    } catch (error) {
      message.error('添加失败');
    }
    setAddKnowledgeModel(false);
    addForm.resetFields()
    loadData();
  };

  const openAddKnowledgeModal = () => {
    setAddKnowledgeModel(true);
  }

  const closeAddKnowledgeModal = () => {
    setAddKnowledgeModel(false);
    addForm.resetFields()
  }

  const openShareModal = () => {
    setShareModel(true);
  }

  const closeShareModal = () => {
    setShareModel(false);
    shareForm.resetFields()
  }

  const test = () => {
    message.success(healthyKnowledgeId)
  }

  const shareHealthyKnowledge = async () => {
    try {
      const res = await shareHealthyKnowledgeUsingPost({
        type: shareForm.getFieldValue('type'),
        content: shareForm.getFieldValue('content'),
        //集合
        tags: ["跑步"],
      });
      if (res.code === 0) {
        message.success('分享成功');
      } else {
        message.error('分享失败');
      }
    } catch (error) {
      message.error('分享失败');
    }
    setShareModel(false);
    shareForm.resetFields()
    loadData();
  };

  const handleMenuClick = (key: string, record: API.HealthyKnowledgeVO) => {
    switch (key) {
      case 'examine':
        openExamineModal(record);
        break;
      case 'delete':
        Modal.confirm({
          title: '确认删除',
          content: `确定要删除这条健康知识吗？`,
          onOk: () => {
            // 这里添加实际删除逻辑
            deleteHealthyKnowledge(record?.id as number)
          },
        });
        break;
      case 'share':
        setCurrentHealthyKnowledge(record);
        openShareModal();
        break;
    }
  };

  // 渲染三点菜单
  const renderCardMenu = (record: API.HealthyKnowledgeVO) => {
    return (
      <Menu onClick={({key}) => handleMenuClick(key, record)}>
        {record.status === 0 && <Menu.Item key="examine">审核</Menu.Item>}
        <Menu.Item key="share">分享</Menu.Item>
        <Menu.Item key="delete" danger>删除</Menu.Item>
      </Menu>
    );
  };

  const deleteHealthyKnowledge = async (id: number) => {
    try {
      const res = await deleteHealthyKnowledgeUsingDelete({
        id: id,
      });
      if (res.code === 0) {
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
    } catch (error) {
      message.error('删除失败');
    }
    loadData();
  };

  // 当组件挂载时加载数据
  useEffect(() => {
    loadData();
  }, [searchParams, dataChange]);

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
        <Button type={"primary"} style={{marginRight: 20}} onClick={openShareModal}>分享知识</Button>
        <Button type={"primary"} style={{marginRight: 20}} onClick={openAddKnowledgeModal}>添加知识</Button>
        <Radio.Group defaultValue={"all"} style={{float: 'right'}}>
          <Radio value="all" onClick={() => {
            getHealthyKnowledgePage(2)
          }}>全部</Radio>
          <Radio value="examine" onClick={() => {
            getHealthyKnowledgePage(1)
          }}>已审核</Radio>
          <Radio value="notExamine" onClick={() => {
            getHealthyKnowledgePage(0)
          }}>待审核</Radio>
        </Radio.Group>
      </div>
      <div style={{marginTop: 20}}>

      </div>
      <div className="margin-16"/>
      <List
        // grid={{
        //   gutter: 16,
        //   xs: 1,
        //   sm: 1,
        //   md: 1,
        //   lg: 2,
        //   xl: 2,
        //   xxl: 2,
        // }}
        split={false}
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
        dataSource={healthyKnowledgeList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card style={{width: '100%', position: 'relative'}}>
              <Dropdown
                overlay={renderCardMenu(item)}
                placement="bottomRight"
                trigger={['click']}
              >
                <Button
                  type="text"
                  icon={<EllipsisOutlined/>}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 1
                  }}
                />
              </Dropdown>
              <List.Item.Meta
                avatar={<Avatar src={item.userAvatar}
                />}
                title={item.username}
                description={item.tags ? item.tags : undefined}
              />
              <>
                {item.status === 0 && (
                  <>
                    <div style={{marginBottom: 16}}/>
                    <p>{'内容：' + item.content}</p>
                    <div style={{float: 'right'}}>
                      {/*<LikeOutlined/>*/}
                      {/*<LikeFilled/>*/}
                      <Button type={"primary"} htmlType="submit" onClick={() => {
                        openExamineModal(item)
                      }}>
                        审核
                      </Button>
                      <Modal
                        title="审核健康知识"
                        open={examineModel}
                        onOk={passHealthyKnowledge}
                        onCancel={closeExamineModal}
                        footer={[
                          <Button key="back" onClick={closeExamineModal}>
                            取消
                          </Button>,
                          <Button key="submit" type="primary" onClick={rejectHealthyKnowledge}>
                            驳回
                          </Button>,
                          <Button key="submit" type="primary" onClick={passHealthyKnowledge}>
                            通过
                          </Button>,
                        ]}>
                        <Card>
                          <Form form={examineForm}>
                            <ProFormText label={'用户id'}>{currentHealthyKnowledge?.userId}</ProFormText>
                            <ProFormText name={'healthyKnowledgeId'} label={'健康知识id'}
                            >{currentHealthyKnowledge?.id}</ProFormText>
                            <ProFormText name={'result'}
                                         label={'健康知识标签'}>{currentHealthyKnowledge?.tags}</ProFormText>
                            <ProFormText name={'content'}
                                         label={'健康知识内容'}>{currentHealthyKnowledge?.content}</ProFormText>
                            <ProFormText name={'createTime'}
                                         label={"申请时间"}>{moment(String(currentHealthyKnowledge?.operationTime)).format('YYYY-MM-DD HH:mm:ss')}</ProFormText>
                            <ProFormText name={'description'}>
                              <TextArea placeholder="请输入审核说明"></TextArea>
                            </ProFormText>
                          </Form>
                        </Card>
                      </Modal>
                    </div>
                  </>
                )}
                {item.status === 1 && (
                  <>
                    <div style={{marginBottom: 16}}/>
                    <p>{'内容：' + item.content}</p>
                    <div style={{float: 'right'}}>
                      {/*<LikeOutlined/>*/}
                      {/*<LikeFilled/>*/}
                    </div>
                  </>
                )}
              </>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="添加健康知识"
        open={addKnowledgeModel}
        onOk={addHealthyKnowledge}
        onCancel={closeAddKnowledgeModal}
      >
        <Card>
          <Form
            form={addForm}>
            <ProFormText
              name={'type'}
              label={'类型'}
              placeholder={"请输入知识类型"}
            ></ProFormText>
            <ProFormText
              name={'tags'}
              label={'标签'}
              placeholder="请输入知识标签"
            ></ProFormText>
            <ProFormText
              name={'content'}
              label={'内容'}
              placeholder={"请输入知识类型"}
            ></ProFormText>
          </Form>
        </Card>
      </Modal>

      <Modal
        title="分享健康知识"
        open={shareModel}
        onOk={shareHealthyKnowledge}
        onCancel={closeShareModal}
      >
        <Card>
          <Form
            form={shareForm}>
            <ProFormText
              name={'type'}
              label={'类型'}
              placeholder={"请输入知识类型"}
            ></ProFormText>
            <ProFormText
              name={'tags'}
              label={'标签'}
              placeholder="请输入知识标签"
            ></ProFormText>
            <ProFormText
              name={'content'}
              label={'内容'}
              placeholder={"请输入知识类型"}
            ></ProFormText>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};
export default HealthyKnowledge;

import {Avatar, Button, Card, Dropdown, Form, List, Menu, message, Modal, Radio, Tag} from 'antd';
import Search from 'antd/es/input/Search';
import React, {useEffect, useState} from 'react';
import {
  addHealthyKnowledgeUsingPost, deleteHealthyKnowledgeUsingDelete, examineHealthyKnowledgeUsingPost,
  getHealthyKnowledgeVoPageUsingPost, updateHealthyKnowledgeUsingPost
} from "@/services/healthy_sys/healthyKnowledgeController";
import {EllipsisOutlined} from "@ant-design/icons";
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
  const [editForm] = Form.useForm();
  const [searchParams, setSearchParams] = useState<API.HealthyKnowledgeQueryDTO>({...initSearchParams});
  const [currentHealthyKnowledge, setCurrentHealthyKnowledge] = useState<API.HealthyKnowledge>();
  const [healthyKnowledgeList, setHealthyKnowledgeList] = useState<API.HealthyKnowledgeVO[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // 新增状态来控制模态框的显示
  const [addKnowledgeModel, setAddKnowledgeModel] = useState(false);
  const [examineModel, setExamineModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
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

  const getHealthyKnowledgePage = async (searchCondition: string) => {
    try {
      setSearchParams({
        ...searchParams,
        searchCondition: searchCondition,
      })
    } catch (error) {
      message.error('系统错误');
    }
  };

  const openExamineModal = (healthyKnowledge: API.HealthyKnowledgeVO) => {
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
    loadData();
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
    loadData();
  };

  const openAddKnowledgeModal = () => {
    setAddKnowledgeModel(true);
  }

  const closeAddKnowledgeModal = () => {
    setAddKnowledgeModel(false);
    addForm.resetFields()
  }

  const addHealthyKnowledge = async () => {
    try {
      const res = await addHealthyKnowledgeUsingPost({
        content: addForm.getFieldValue('content'),
        tags: addForm.getFieldValue('tags'),
      });
      if (res.code === 0) {
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    } catch (error) {
      message.error('添加失败');
    }
    closeAddKnowledgeModal();
    loadData();
  };

  const openEditModal = (healthyKnowledge: API.HealthyKnowledgeVO) => {
    setCurrentHealthyKnowledge(healthyKnowledge);
    setEditModel(true);
  }

  const closeEditModal = () => {
    setEditModel(false);
    editForm.resetFields()
  }

  const editHealthyKnowledge = async () => {
    try {
      const res = await updateHealthyKnowledgeUsingPost({
        healthyKnowledgeId: currentHealthyKnowledge?.id,
        content: editForm.getFieldValue('content'),
        tags: editForm.getFieldValue('tags'),
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

  const handleMenuClick = (key: string, record: API.HealthyKnowledgeVO) => {
    switch (key) {
      case 'edit':
        openEditModal(record)
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
    }
  };

  // 渲染三点菜单
  const renderCardMenu = (record: API.HealthyKnowledgeVO) => {
    return (
      <Menu onClick={({key}) => handleMenuClick(key, record)}>
        {record.status === 1 && <Menu.Item key="edit">编辑</Menu.Item>}
        <Menu.Item key="delete" danger>删除</Menu.Item>
      </Menu>
    );
  };

  // 当组件挂载时加载数据
  useEffect(() => {
    loadData();
  }, [searchParams, dataChange]);

  // 添加useEffect监听
  useEffect(() => {
    if (editModel && currentHealthyKnowledge) {
      editForm.setFieldsValue({
        tags: currentHealthyKnowledge.tags,
        content: currentHealthyKnowledge.content,
      });
    }
  }, [currentHealthyKnowledge, editModel, editForm]);

  return (
    <div className="my-chart-page">
      <div>
        <Search
          placeholder="请输入健康知识内容"
          enterButton
          loading={loading}
          onSearch={(value) => {
            // 设置搜索条件
            setSearchParams({
              ...initSearchParams,
              content: value,
            });
          }}
          style={{width: '30%', float: 'right'}}
        />
      </div>
      <div style={{marginTop: 50, marginBottom: 20}}>
        <Button type={"primary"} style={{marginRight: 20}} onClick={openAddKnowledgeModal}>添加知识</Button>
        <Radio.Group defaultValue={"all"} style={{float: 'right'}}>
          <Radio value="all" onClick={() => {
            getHealthyKnowledgePage("all")
          }}>全部</Radio>
          <Radio value="examine" onClick={() => {
            getHealthyKnowledgePage("exam")
          }}>已审核</Radio>
          <Radio value="notExamine" onClick={() => {
            getHealthyKnowledgePage("notExam")
          }}>待审核</Radio>
        </Radio.Group>
      </div>
      <div style={{marginTop: 20}}>

      </div>
      <div className="margin-16"/>
      <List
        split={false}
        pagination={{

          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            });
          },
          showSizeChanger: true,
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
              />
              <>
                {item.status === 0 && (
                  <>
                    <div style={{marginBottom: 16}}/>
                    <p>{'内容：' + item.content}</p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 16
                    }}>
                      <div>
                        {item.tags?.replace(/[[\]"]/g, '').split(',').map((tag, index) => (
                          <Tag key={index} color="blue" style={{ marginRight: 8 }}>
                            {tag.trim()}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    <div style={{float: 'right'}}>
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
                            {/*<ProFormText name={'result'}*/}
                            {/*             label={'健康知识标签'}>{currentHealthyKnowledge?.tags}</ProFormText>*/}
                            <ProFormText name={'content'}
                                         label={'健康知识内容'}>{currentHealthyKnowledge?.content}</ProFormText>
                            <ProFormText name={'createTime'}
                                         label={"申请时间"}>{moment(String(currentHealthyKnowledge?.createTime)).format('YYYY-MM-DD HH:mm:ss')}</ProFormText>
                            <ProFormText name={'description'}>
                              <TextArea placeholder="请输入审核说明"></TextArea>
                            </ProFormText>
                          </Form>
                        </Card>
                      </Modal>
                    </div>
                  </>
                )}
                {item.status !== 0 && (
                  <>
                    <div style={{marginBottom: 16}}/>
                    <p style={{marginBottom: 30}}>{'内容：' + item.content}</p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 16
                    }}>
                      <div>
                        {item.tags?.replace(/[[\]"]/g, '').split(',').map((tag, index) => (
                          <Tag key={index} color="blue" style={{ marginRight: 8 }}>
                            {tag.trim()}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    <div style={{position: 'absolute', bottom: 16, right: 16, marginTop: 16}}>
                      {item.status === 1 && (
                        <Tag color="green" onClick={()=>{message.success("success")}}>审核通过</Tag>
                      )}
                      {item.status === 2 && (
                        <Tag color="red" onClick={()=>{message.error("error")}}>审核未通过</Tag>
                      )}
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
            {/*<ProFormText*/}
            {/*  name={'type'}*/}
            {/*  label={'类型'}*/}
            {/*  placeholder={"请输入知识类型"}*/}
            {/*></ProFormText>*/}
            <ProFormText
              name={'tags'}
              label={'标签'}
              placeholder="请输入知识标签"
            ></ProFormText>
            <ProFormText
              name={'content'}
              label={'内容'}
              placeholder={"请输入知识内容"}
            ></ProFormText>
          </Form>
        </Card>
      </Modal>

      <Modal
        title="编辑健康知识"
        open={editModel}
        onOk={editHealthyKnowledge}
        onCancel={closeEditModal}
      >
        <Card>
          <Form form={editForm}>
            <ProFormText
              name={'tags'}
              label={'标签'}
              placeholder="请输入知识标签"
            ></ProFormText>
            <ProFormText
              name={'content'}
              label={'内容'}
              placeholder={"请输入知识内容"}
            ></ProFormText>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};
export default HealthyKnowledge;

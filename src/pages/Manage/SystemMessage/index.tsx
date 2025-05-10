import { Button, Card, DatePicker, Dropdown, Form, List, Menu, message, Modal, Radio, Select, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import { EllipsisOutlined } from "@ant-design/icons";
import { ProFormTextArea } from "@ant-design/pro-components";
import moment from 'moment';
import {
  addSystemMessageUsingPost,
  deleteMessageUsingDelete,
  getMessagePageByStatusUsingPost,
  getMessagePageUsingPost, updateSystemMessageUsingPost
} from "@/services/healthy_sys/messageController";
// @ts-ignore
import {getUserListUsingPost} from "@/services/healthy_sys/userController";

const { Option } = Select;

const SystemMessage: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 9,
    sortField: 'create_time',
    sortOrder: 'desc',
  };

  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useState<API.MessageQueryDTO>({...initSearchParams});
  const [currentMessage, setCurrentMessage] = useState<API.MessageVO>();
  const [messageList, setMessageList] = useState<API.MessageVO[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [userList, setUserList] = useState<API.UserVO[]>([]);

  // 加载消息列表
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getMessagePageUsingPost(searchParams);
      if (res.code === 0 && res.data) {
        setMessageList(res.data.records || []);
        setTotal(res.data.total || 0);
      } else {
        message.error(res.msg || '获取消息失败');
      }
    } catch (e: any) {
      message.error('获取消息失败: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserList = async (searchParam: string) => {
    try {
      const res = await getUserListUsingPost({
        username: searchParam,
      })
      if (res.code !== 0){
        message.error("获取用户列表失败")
      }
      // @ts-ignore
      setUserList(res.data)
    } catch (error) {
      message.error('系统错误');
    }
  };

  // 打开模态框
  const openModal = (type: 'add' | 'edit', record?: API.MessageVO) => {
    setModalType(type);
    if (type === 'edit' && record) {
      setCurrentMessage(record);
      form.setFieldsValue({
        ...record,
        publishTime: record.publishTime ? moment(record.publishTime) : undefined
      });
    } else {
      form.resetFields();
    }
    setModalVisible(true);
  };


  const getSystemMessagePage = async (searchCondition: string) => {
    try {
      const res = await getMessagePageByStatusUsingPost({
        ...searchParams,
        searchCondition: searchCondition,
      })
      if (res.code !== 0){
        message.error("获取系统消息失败")
      }
      setMessageList(res.data?.records || []);
    } catch (error) {
      message.error('系统错误');
    }
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const params = {
        ...values,
        publishTime: values.publishTime ? values.publishTime.format('YYYY-MM-DD HH:mm:ss') : undefined,
        id: modalType === 'edit' ? currentMessage?.id : undefined
      };

      const res = modalType === 'add'
        ? await addSystemMessageUsingPost(params)
        : await updateSystemMessageUsingPost(params);

      if (res.code === 0) {
        message.success(`${modalType === 'add' ? '添加' : '更新'}成功`);
        loadData();
        setModalVisible(false);
      } else {
        message.error(res.msg || '操作失败');
      }
    } catch (error) {
      console.error('提交失败:', error);
    }
  };

  // 发布消息
  const handlePublish = async (id: number, messageType: string) => {
    try {
      const res = await updateSystemMessageUsingPost({
        id: id,
        messageType: messageType,
        status: 1
      });
      if (res.code === 0) {
        message.success('发布成功');
        loadData();
      } else {
        message.error(res.msg || '发布失败');
      }
    } catch (error) {
      message.error('发布失败');
    }
  };

  // 删除消息
  const handleDelete = async (id: number, messageType: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条系统消息吗？',
      onOk: async () => {
        try {
          const res = await deleteMessageUsingDelete({
            id: id,
            messageType: messageType
          });
          if (res.code === 0) {
            message.success('删除成功');
            loadData();
          } else {
            message.error(res.msg || '删除失败');
          }
        } catch (error) {
          message.error('删除失败');
        }
      }
    });
  };

  // 初始化加载
  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div style={{ padding: 24 }}>
      <div style={{marginBottom: 50}}>
        <Search
          placeholder="搜索系统消息"
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
        <Button type="primary" onClick={() => openModal('add')}>
          发布系统消息
        </Button>

        <div>
          <Radio.Group
            defaultValue="all"
            style={{ marginLeft: 16 }}
          >
            <Radio value="all" onClick={loadData}>全部</Radio>
            <Radio value="draft" onClick={() => {getSystemMessagePage('draft')}}>草稿</Radio>
            <Radio value="published" onClick={() => {getSystemMessagePage('published')}}>已发布</Radio>
            <Radio value="scheduled" onClick={() => {getSystemMessagePage('scheduled')}}>定时发布</Radio>
          </Radio.Group>
        </div>
      </div>

      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 1 }}
        pagination={{
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize
            });
          },
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`
        }}
        loading={loading}
        dataSource={messageList}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>
                    {item.messageType === 'all' ? '全体用户' : `用户ID: ${item.userId}`}
                  </span>
                  <Tag color={
                    item.status === 1 ? 'green' :
                      item.status === 2 ? 'orange' : 'gray'
                  }>
                    {item.status === 1 ? '已发布' :
                      item.status === 2 ? '定时发布' : '草稿'}
                  </Tag>
                </div>
              }
              extra={
                <Dropdown
                  overlay={
                    <Menu>
                      {item.status !== 1 && (
                        <Menu.Item key="edit" onClick={() => openModal('edit', item)}>
                          编辑
                        </Menu.Item>
                      )}
                      {item.status !== 1 && (
                        <Menu.Item key="publish" onClick={() => handlePublish(item.id as number, item.messageType as string)}>
                          发布
                        </Menu.Item>
                      )}
                      <Menu.Item key="delete" danger onClick={() => handleDelete(item.id as number, item.messageType as string)}>
                        删除
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                >
                  <Button type="text" icon={<EllipsisOutlined />} />
                </Dropdown>
              }
            >
              <div style={{ marginBottom: 12 }}>
                <p style={{ whiteSpace: 'pre-wrap' }}>{item.content}</p>
              </div>

              <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
                <div>创建时间: {moment(item.createTime).format('YYYY-MM-DD HH:mm')}</div>
                {item.publishTime && (
                  <div>
                    {item.status === 2 ? '计划发布时间' : '发布时间'}:
                    {moment(item.publishTime).format('YYYY-MM-DD HH:mm')}
                  </div>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />

      {/* 添加/编辑模态框 */}
      <Modal
        title={`${modalType === 'add' ? '添加' : '编辑'}系统消息`}
        width={600}
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="messageType"
            label="消息类型"
            rules={[{ required: true, message: '请选择消息类型' }]}
          >
            <Select>
              <Option value="all">全体用户</Option>
              <Option value="one">指定用户</Option>
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.messageType !== currentValues.messageType
            }
          >
            {({ getFieldValue }) =>
              getFieldValue('messageType') === 'one' ? (  // 注意这里改为'one'以匹配上面的value
                <Form.Item
                  name="userId"
                  label="选择用户"
                  rules={[{ required: true, message: '请选择用户' }]}
                >
                  <Select
                    showSearch
                    placeholder="搜索并选择用户"
                    onSearch={(value) => getUserList(value)}  // 添加搜索时调用方法
                    optionFilterProp="children"
                  >
                    {userList.map(user => (
                      <Option key={user.id} value={user.id}>
                        {user.username}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : null
            }
          </Form.Item>


          <Form.Item
            name="content"
            label="消息内容"
            rules={[{ required: true, message: '请输入消息内容' }]}
          >
            <ProFormTextArea
              placeholder="请输入系统消息内容"
              fieldProps={{
                autoSize: { minRows: 5 }
              }}
            />
          </Form.Item>

          <Form.Item
            name="publishTime"
            label="发布时间"
            extra="不选择则保存为草稿，选择未来时间则为定时发布"
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={(current) => current && current < moment().startOf('day')}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SystemMessage;

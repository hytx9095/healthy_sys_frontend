import {Avatar, Button, Card, Dropdown, Form, List, Menu, message, Modal, Radio} from 'antd';
import Search from 'antd/es/input/Search';
import React, {useEffect, useState} from 'react';
import {ProFormText} from "@ant-design/pro-components";
import {
  deleteUserUsingDelete,
  getUserPageUsingPost,
  updateUserRoleUsingPost
} from "@/services/healthy_sys/userController";
import dayjs from "dayjs";
import {ProFormSelect} from "@ant-design/pro-form/lib";
import {EllipsisOutlined} from "@ant-design/icons";
import {shareHealthyKnowledgeUsingPost} from "@/services/healthy_sys/healthyKnowledgeController";

/**
 * 我的图表页面
 * @constructor
 */
const UserManage: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 9,
    sortField: 'create_time',
    sortOrder: 'desc',
  };

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchParams, setSearchParams] = useState<API.UserQueryDTO>({...initSearchParams});
  const [userList, setUserList] = useState<API.User[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<API.User>();
  // 新增状态来控制模态框的显示
  const [addModel, setAddModel] = useState(false);
  const [editModel, setEditModel] = useState(false);


  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getUserPageUsingPost(searchParams);
      if (res.data) {
        setUserList(res.data.records ?? []);
      } else {
        message.error('获取用户失败');
      }
    } catch (e: any) {
      message.error('获取用户失败，' + e.message);
    }
    setLoading(false);
  };

  const getUserPage = async (searchCondition: string) => {
    try {
      if (searchCondition === "all") {
        setSearchParams({
          ...initSearchParams,
        })
      } else if (searchCondition === "ban") {
        setSearchParams({
          ...initSearchParams,
          role: 'ban'
        })
      } else {
        setSearchParams({
          ...initSearchParams,
          role: 'notBan'
        })
      }
    } catch (error) {
      message.error('获取数据失败');
    }
  };

  const openAddModal = () => {
    setAddModel(true);
  }

  const closeAddModal = () => {
    setAddModel(false);
    addForm.resetFields()
  }

  const addUser = async () => {
    try {
      const res = await shareHealthyKnowledgeUsingPost({});
      if (res.code === 0) {
        message.success('分享成功');
      } else {
        message.error('分享失败');
      }
    } catch (error) {
      message.error('分享失败');
    }
    closeAddModal();
    loadData();
  };

  const openEditModal = (user: API.UserVO) => {
    setCurrentUser(user);
    setEditModel(true);
  }

  const closeEditModal = () => {
    setEditModel(false);
    editForm.resetFields()
  }

  const editUser = async () => {
    try {
      const res = await shareHealthyKnowledgeUsingPost({});
      if (res.code === 0) {
        message.success('分享成功');
      } else {
        message.error('分享失败');
      }
    } catch (error) {
      message.error('分享失败');
    }
    closeEditModal();
    loadData();
  };

  const deleteUser = async (userId: number) => {
    try {
      const res = await deleteUserUsingDelete({
        id: userId,
      });
      if (res.code !== 0) {
        message.error('删除失败');
      }
    } catch (error) {
      message.error('删除失败');
    }
    loadData();
  };

  const updateUserStatus = async (userId: number, role: string) => {
    try {
      const res = await updateUserRoleUsingPost({
        userId: userId,
        role: role,
      });
      if (res.code !== 0) {
        message.success('修改失败');
      }
    } catch (error) {
      message.error('删除失败');
    }
    loadData();
  };


  const handleMenuClick = (key: string, record: API.UserVO) => {
    switch (key) {
      case 'edit':
        openEditModal(record);
        break;
      case 'delete':
        Modal.confirm({
          title: '确认删除用户?',
          content: `确定要删除用户 ${record.username} 吗？`,
          onOk: () => {
            message.success('删除成功');
            // 这里添加删除逻辑
            deleteUser(record.id as number);
          },
        });
        break;
    }
  };

  const renderMenu = (record: API.UserVO) => (
    <Menu onClick={({key}) => handleMenuClick(key, record)}>
      <Menu.Item key="edit">编辑用户</Menu.Item>
      <Menu.Item key="delete" danger>删除用户</Menu.Item>
    </Menu>
  );
  const getRoleText = (type: string) => {
    const roleTypeMap = {
      "admin": '管理员',
      "user": '普通用户',
      "doctor": '医生',
      "ban": '封禁用户',
    };
    // @ts-ignore
    return roleTypeMap[type] || '未知类型';
  };

  // 当组件挂载时加载数据
  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div className="my-chart-page">
      <div>
        <Search
          placeholder="请输入用户"
          enterButton
          loading={loading}
          onSearch={(value) => {
            // 设置搜索条件
            setSearchParams({
              ...initSearchParams,
              username: value,
            });
          }}
          style={{width: '30%', float: 'right'}}
        />
      </div>
      <div style={{marginTop: 50, marginBottom: 20}}>
        <Button type={"primary"} style={{marginRight: 20}} onClick={openAddModal}>新增用户</Button>
        <Radio.Group defaultValue={"all"} style={{float: 'right'}}>
          <Radio value="all" onClick={() => {
            getUserPage("all")
          }}>全部</Radio>
          <Radio value="normal" onClick={() => {
            getUserPage("normal")
          }}>正常</Radio>
          <Radio value="ban" onClick={() => {
            getUserPage("ban")
          }}>封禁</Radio>
        </Radio.Group>
      </div>
      <List
        split={false}
        dataSource={userList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              style={{
                width: '100%',
                position: 'relative' // 关键：让绝对定位的菜单按钮相对卡片定位
              }}
            >
              {/* 右上角菜单按钮 */}
              <Dropdown
                overlay={renderMenu(item)}
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

              {/* 卡片内容 */}
              <List.Item.Meta
                avatar={<Avatar src={item.userAvatar}/>}
                title={item.username || '未命名'}
                style={{marginBottom: 8}}
              />
              <p>{'身份：' + getRoleText(item.role as string)}</p>
              <ProFormText>
                {'注册时间：' + dayjs(String(item.createTime)).format('YYYY-MM-DD HH:mm:ss')}
              </ProFormText>

              {/* 原有操作按钮可以保留或移除 */}
              <div style={{float: 'right'}}>
                {item.role === 'ban' ? (
                  <Button onClick={() => updateUserStatus(item.id as number, "user")}>
                    解封
                  </Button>
                ) : (
                  <Button danger onClick={() => updateUserStatus(item.id as number, "ban")}>
                    封禁
                  </Button>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="新增用户"
        open={addModel}
        onOk={addUser}
        onCancel={closeAddModal}
      >
        <Form
          form={addForm}>
          <ProFormText
            name="userAccount"
            label="账户名"
            placeholder="请输入用户名"
            rules={[{required: true, message: '请输入用户名'}]}
          />
          <ProFormText
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            rules={[{required: true, message: '请输入用户名'}]}
          />
          <ProFormText
            name="password"
            label="密码"
            placeholder="请输入密码"
            rules={[{required: true, message: '请输入密码'}]}
          />
          <ProFormSelect
            name="role"
            label="角色"
            placeholder="请选择角色"
            rules={[{required: true, message: '请选择角色'}]}
            options={[
              {value: 'admin', label: '管理员'},
              {value: 'user', label: '普通用户'},
              {value: 'doctor', label: '医生'},
            ]}
          />
        </Form>
      </Modal>

      <Modal
        title="编辑用户"
        open={editModel}
        onOk={editUser}
        onCancel={closeEditModal}
      >
        <Form
          form={editForm}
          initialValues={
            {
              ...currentUser,
            }
          }>
          <ProFormText
            name="userAccount"
            label="账户名"
            placeholder="请输入用户名"
            rules={[{required: true, message: '请输入用户名'}]}
          />
          <ProFormText
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            rules={[{required: true, message: '请输入用户名'}]}
          />
          <ProFormText
            name="password"
            label="密码"
            placeholder="请输入密码"
            rules={[{required: true, message: '请输入密码'}]}
          />
          <ProFormSelect
            name="role"
            label="角色"
            placeholder="请选择角色"
            rules={[{required: true, message: '请选择角色'}]}
            options={[
              {value: 'admin', label: '管理员'},
              {value: 'user', label: '普通用户'},
              {value: 'doctor', label: '医生'},
            ]}
          />
        </Form>
      </Modal>
    </div>
  );
};
export default UserManage;

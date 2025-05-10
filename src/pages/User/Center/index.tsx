import { useModel } from '@@/exports';
import { ProFormText } from '@ant-design/pro-components';
import { Avatar, Button, Card, Form, message, Modal, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react';
import {
  changeUserAvatarUsingPost,
  changeUserPasswordUsingPost,
  updateUserUsingPost,
} from "../../../services/healthy_sys/userController";
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadChangeParam } from 'antd/es/upload';

/**
 * 个人中心页面
 * @constructor
 */
const UserCenter: React.FC = () => {
  const [changePasswordForm] = Form.useForm();
  const [form] = useForm();
  const { initialState, refresh } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [changePasswordModel, setChangePasswordModel] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    if (submitting) return;
    setSubmitting(true);

    const params = {
      ...values,
      id: currentUser?.id,
    };

    if (values?.userPassword > 0) {
      if (values?.userPassword < 8) {
        message.error('密码长度不能小于8位！');
        return;
      }
      if (values?.userPassword > 16){
        message.error('密码长度不能大于16位！');
        return;
      }
    }

    try {
      const res = await updateUserUsingPost(params, {});
      if (res.code === 40101) {
        message.error('账号封禁!');
      }
      if (!res?.data) {
        message.error('修改失败！');
      } else {
        message.success('修改成功！');
        window.location.reload();
        form.resetFields();
      }
    } catch (e: any) {
      message.error('修改失败！' + e.message);
    }
    setSubmitting(false);
  };

  const geRoleTypeText = (role: string) => {
    const mealTypeMap = {
      'admin': '管理员',
      'user': '普通用户',
      'doctor': '医生',
    };
    // @ts-ignore
    return mealTypeMap[role] || '未知类型';
  };

  const closeChangePasswordModal = () => {
    setChangePasswordModel(false);
  };

  const changePassword = async () => {
    try {
      const values = await changePasswordForm.validateFields();
      const res = await changeUserPasswordUsingPost({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      })
      if (!res?.data) {
        message.error('修改失败！');
      }
      if (res.code === 40101) {
        message.error('账号封禁!');
      }
      message.success('修改成功！');
      closeChangePasswordModal();
    } catch (errorInfo) {
      message.error('修改失败！')
    }
  };

  /**
   * 上传头像
   */
  const handleAvatarChange: UploadProps['onChange'] = async (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setAvatarLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      try {
        // 创建FormData并添加文件
        const formData = new FormData();
        formData.append('image', info.file.originFileObj as RcFile);

        // 调用上传接口
        const res = await changeUserAvatarUsingPost(formData);
        if (res.data) {
          message.success('头像上传成功');
          refresh(); // 刷新用户数据
        } else {
          message.error(res.msg || '头像上传失败');
        }
      } catch (e: any) {
        message.error('上传失败: ' + (e.message || '服务器错误'));
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  /**
   * 上传前校验
   */
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片!');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  /**
   * 自定义上传请求
   */
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await changeUserAvatarUsingPost(formData);
      if (res.data) {
        onSuccess(res, file);
      } else {
        onError(new Error(res.msg || '上传失败'));
      }
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div className="add-chart-async">
      <Card title="个人中心" style={{ width: '100%' }}>
        <Card bordered={false}>
          <Upload
            name="image" // 必须与后端@RequestParam名称一致
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleAvatarChange}
            customRequest={customRequest}
            accept="image/jpeg,image/png"
          >
            <Avatar
              size={64}
              src={currentUser?.userAvatar}
              style={{ cursor: 'pointer' }}
            >
              {avatarLoading ? '上传中...' : currentUser?.username?.charAt(0)}
            </Avatar>
          </Upload>
          <Form.Item>id：{currentUser?.id}</Form.Item>
          <ProFormText label={"身份"}>{geRoleTypeText(currentUser?.role ?? '未知')}</ProFormText>
        </Card>

        <Card style={{ marginTop: 20 }} bordered={false}>
          <Form
            form={form}
            name="addChart"
            labelAlign="left"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 10 }}
            onFinish={onFinish}
            initialValues={{}}
          >
            <ProFormText
              name={'username'}
              label={'昵称'}
              placeholder={currentUser?.username}
            />
            <ProFormText
              name={'email'}
              label={'邮箱'}
              placeholder={currentUser?.email || '暂无邮箱'}
            />
            <ProFormText
              name={'telephone'}
              label={'电话号码'}
              placeholder={currentUser?.telephone || '暂无电话号码'}
            />
            <Button type={'primary'} htmlType={'submit'} style={{ float: 'left', marginRight: 20 }}>
              修改
            </Button>
            <Button type={'primary'} onClick={() => setChangePasswordModel(true)}>
              修改密码
            </Button>
          </Form>
        </Card>
      </Card>

      <Modal
        title="修改密码"
        open={changePasswordModel}
        onOk={changePassword}
        onCancel={closeChangePasswordModal}
      >
        <Card>
          <Form form={changePasswordForm}>
            <ProFormText.Password
              name="oldPassword"
              label="旧密码"
              placeholder="请输入旧密码"
              rules={[{ required: true, message: '请输入旧密码' }]}
            />
            <ProFormText.Password
              name="newPassword"
              label="新密码"
              placeholder="请输入新密码"
              rules={[{ required: true, message: '请输入新密码' }]}
            />
            <ProFormText.Password
              name="confirmPassword"
              label="确认密码"
              placeholder="请再次输入新密码"
              rules={[
                { required: true, message: '请再次输入新密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致！'));
                  },
                }),
              ]}
            />
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default UserCenter;

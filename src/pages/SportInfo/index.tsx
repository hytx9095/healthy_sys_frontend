import {useModel} from '@@/exports';
import {
  Avatar,
  Button,
  Card, Dropdown,
  Form,
  List, Menu,
  message,
  Modal,
} from 'antd';
import Search from 'antd/es/input/Search';
import React, {useEffect, useState} from 'react';
import {ProFormText} from "@ant-design/pro-components";
import dayjs from "dayjs";
import {ProFormDatePicker, ProFormTimePicker} from "@ant-design/pro-form/lib";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  addSportInfoUsingPost,
  deleteSportInfoUsingDelete,
  getSportInfoPageUsingPost, updateSportInfoUsingPost
} from "@/services/healthy_sys/sportInfoController";
import {EllipsisOutlined} from "@ant-design/icons";

/**
 * 我的图表页面
 * @constructor
 */
const SportInfo: React.FC = () => {


  dayjs.extend(customParseFormat);

  const initSearchParams = {
    current: 1,
    pageSize: 9,
    sortField: 'create_time',
    sortOrder: 'desc',
  };

  const [sportInfoForm] = Form.useForm();
  const [editSportInfoForm] = Form.useForm();
  const [searchParams, setSearchParams] = useState<API.SportInfoQueryDTO>({...initSearchParams});
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState ?? {};
  const [currentSportInfo, setCurrentSportInfo] = useState<API.SportInfo>();
  const [sportInfoList, setSportInfoList] = useState<API.SportInfo[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // 新增状态来控制模态框的显示
  const [addSportInfoModel, setAddSportInfoModel] = useState(false);
  const [editSportInfoModel, setEditSportInfoModel] = useState(false);



  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getSportInfoPageUsingPost(searchParams);
      if (res.data) {
        setSportInfoList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取运动信息失败');
      }
    } catch (e: any) {
      message.error('获取运动信息失败，' + e.message);
    }
    setLoading(false);
  };

  const openSportInfoModal = () => {
    setAddSportInfoModel(true);
  }

  const closeSportInfoModal = () => {
    setAddSportInfoModel(false);
    sportInfoForm.resetFields()
  }

  const addSportInfo = async () => {
    try {
      const values = await sportInfoForm.validateFields();
      const occurrenceTime = dayjs(values.date)
        .hour(dayjs(values.time).hour())
        .minute(dayjs(values.time).minute())
        .format('YYYY-MM-DD HH:mm:ss');
      const res = await addSportInfoUsingPost({
        content: values.content,
        occurrenceTime,
      });
      if (res.code === 0) {
        message.success('添加成功');
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error('添加失败');
    }
    closeSportInfoModal()
    loadData();
  };

  const openEditSportInfoModal = (sportInfo: API.SportInfo) => {
    setCurrentSportInfo(sportInfo);
    setEditSportInfoModel(true);
  }

  const closeEditSportInfoModal = () => {
    setEditSportInfoModel(false);
    setCurrentSportInfo({})
    editSportInfoForm.resetFields()
  }

  const editSportInfo = async () => {
    try {
      const values = await editSportInfoForm.validateFields();
      const occurrenceTime = dayjs(values.date)
        .hour(dayjs(values.time).hour())
        .minute(dayjs(values.time).minute())
        .format('YYYY-MM-DD HH:mm:ss');
      const res = await updateSportInfoUsingPost({
        content: values.content,
        occurrenceTime,
        sportInfoId: currentSportInfo?.id
      });
      if (res.code === 0) {
        message.success('编辑成功');
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error('编辑失败');
    }
    closeEditSportInfoModal()
    loadData();
  };


  const deleteSportInfo = async (sportInfoId: number) => {
    try {
      const res = await deleteSportInfoUsingDelete({
        id: sportInfoId,
      });
      if (res.code === 0) {
        message.success('删除成功');
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error('删除失败');
    }
    loadData();
  };


  const handleMenuClick = (key: string, record: API.SportInfo) => {
    switch (key) {
      case 'edit':
        openEditSportInfoModal(record);
        break;
      case 'delete':
        Modal.confirm({
          title: '确认删除',
          content: `确定要删除这条健康知识吗？`,
          onOk: () => {
            // 这里添加实际删除逻辑
            deleteSportInfo(record?.id as number)
          },
        });
        break;
    }
  };

  // 渲染三点菜单
  const renderCardMenu = (record: API.SportInfo) => {
    return (
      <Menu onClick={({key}) => handleMenuClick(key, record)}>
        <Menu.Item key="edit">编辑</Menu.Item>
        <Menu.Item key="delete" danger>删除</Menu.Item>
      </Menu>
    );
  };
  // 当组件挂载时加载数据
  useEffect(() => {
    loadData();
  }, [searchParams]);

  // 添加useEffect监听
  useEffect(() => {
    if (editSportInfoModel && currentSportInfo) {
      editSportInfoForm.setFieldsValue({
        date: currentSportInfo.occurrenceTime ? dayjs(currentSportInfo.occurrenceTime) : undefined,
        time: currentSportInfo.occurrenceTime ? dayjs(currentSportInfo.occurrenceTime) : undefined,
        content: currentSportInfo.content,
      });
    }
  }, [currentSportInfo, editSportInfoModel, editSportInfoForm]);

  return (
    <div className="my-chart-page">
      <div>
        <Search
          placeholder="请输入运动信息"
          enterButton
          loading={loading}
          onSearch={(value) => {
            // 设置搜索条件
            setSearchParams({
              ...initSearchParams,
              content: value
            });
          }}
          style={{width: '30%', float: 'right'}}
        />
      </div>
      <div style={{marginTop: 50, marginBottom: 20}}>
        <Button type={"primary"} style={{marginRight: 20}} onClick={openSportInfoModal}>新增运动信息</Button>
      </div>
      <div style={{marginTop: 20}}>

      </div>
      <div className="margin-16"/>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
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
        dataSource={sportInfoList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card style={{width: '100%'}}>
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
                avatar={<Avatar src={currentUser && currentUser.userAvatar}
                />}
                title={currentUser && currentUser.username}
              />
              <div style={{ marginBottom: 16 }} />
              <p>{'运动内容：' + item.content}</p>
              <ProFormText>{'运动时间：' + dayjs(String(item.occurrenceTime)).format('YYYY-MM-DD HH:mm:ss')}</ProFormText>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="新增运动信息"
        open={addSportInfoModel}
        onOk={addSportInfo}
        onCancel={closeSportInfoModal}
      >
        <Card>
          <Form
            form={sportInfoForm}
          >
            <ProFormDatePicker
              name="date"
              label="日期"
              placeholder="选择日期"
              rules={[{ required: true, message: '请选择日期' }]}
            />
            <ProFormTimePicker
              name="time"
              label="时间"
              placeholder="选择时间"
              fieldProps={{
                defaultOpenValue: dayjs('00:00:00', 'HH:mm:ss')
              }}
              rules={[{ required: true, message: '请选择时间' }]}
            />
            <ProFormText
              name={'content'}
              label={'内容'}
              placeholder={"请输入运动内容"}
              rules={[{ required: true, message: '请填写运动内容' }]}
            ></ProFormText>
          </Form>
        </Card>
      </Modal>

      <Modal
        title="编辑运动信息"
        open={editSportInfoModel}
        onOk={editSportInfo}
        onCancel={closeEditSportInfoModal}
      >
        <Card>
          <Form
            form={editSportInfoForm}
          >
            <ProFormDatePicker
              name="date"
              label="日期"
              placeholder="选择日期"
              rules={[{ required: true, message: '请选择日期' }]}
            />
            <ProFormTimePicker
              name="time"
              label="时间"
              placeholder="选择时间"
              fieldProps={{
                defaultOpenValue: dayjs('00:00:00', 'HH:mm:ss')
              }}
              rules={[{ required: true, message: '请选择时间' }]}
            />
            <ProFormText
              name={'content'}
              label={'内容'}
              placeholder={"请输入运动内容"}
              rules={[{ required: true, message: '请填写运动内容' }]}
            ></ProFormText>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};
export default SportInfo;

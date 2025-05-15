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
  addDiseaseInfoUsingPost,
  deleteDiseaseInfoUsingDelete,
  getDiseaseInfoPageUsingPost, updateDiseaseInfoUsingPost
} from "@/services/healthy_sys/diseaseInfoController";
import {EllipsisOutlined} from "@ant-design/icons";

/**
 * 疾病信息页面
 * @constructor
 */
const DiseaseInfo: React.FC = () => {


  dayjs.extend(customParseFormat);

  const initSearchParams = {
    current: 1,
    pageSize: 9,
    sortField: 'create_time',
    sortOrder: 'desc',
  };

  const [diseaseInfoForm] = Form.useForm();
  const [editDiseaseInfoForm] = Form.useForm();
  const [searchParams, setSearchParams] = useState<API.DiseaseInfoQueryDTO>({...initSearchParams});
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState ?? {};
  const [currentDiseaseInfo, setCurrentDiseaseInfo] = useState<API.DiseaseInfo>();
  const [diseaseInfoList, setDiseaseInfoList] = useState<API.DiseaseInfo[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // 新增状态来控制模态框的显示
  const [addDiseaseInfoModel, setAddDiseaseInfoModel] = useState(false);
  const [editDiseaseInfoModel, setEditDiseaseInfoModel] = useState(false);



  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getDiseaseInfoPageUsingPost(searchParams);
      if (res.data) {
        setDiseaseInfoList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取疾病信息失败');
      }
    } catch (e: any) {
      message.error('获取疾病信息失败，' + e.message);
    }
    setLoading(false);
  };

  const openDiseaseInfoModal = () => {
    setAddDiseaseInfoModel(true);
  }

  const closeDiseaseInfoModal = () => {
    setAddDiseaseInfoModel(false);
    diseaseInfoForm.resetFields()
  }

  const addDiseaseInfo = async () => {
    try {
      const values = await diseaseInfoForm.validateFields();
      const happenTime = dayjs(values.date)
        .hour(dayjs(values.time).hour())
        .minute(dayjs(values.time).minute())
        .format('YYYY-MM-DD HH:mm:ss');
      const res = await addDiseaseInfoUsingPost({
        type: values.type,
        diseaseName: values.diseaseName,
        description: values.description,
        happenTime,
      });
      if (res.code === 0) {
        message.success('添加成功');
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error('添加失败');
    }
    closeDiseaseInfoModal()
    loadData();
  };

  const openEditDiseaseInfoModal = (currentDiseaseInfo: API.DiseaseInfo) => {
    setCurrentDiseaseInfo(currentDiseaseInfo);
    setEditDiseaseInfoModel(true);
  }

  const closeEditDiseaseInfoModal = () => {
    setCurrentDiseaseInfo({});
    setEditDiseaseInfoModel(false);
    editDiseaseInfoForm.resetFields()
  }

  const editDiseaseInfo = async () => {
    try {
      const values = await editDiseaseInfoForm.validateFields();
      const happenTime = dayjs(values.date)
        .hour(dayjs(values.time).hour())
        .minute(dayjs(values.time).minute())
        .format('YYYY-MM-DD HH:mm:ss');
      const res = await updateDiseaseInfoUsingPost({
        diseaseInfoId: currentDiseaseInfo?.id,
        type: values.type,
        diseaseName: values.diseaseName,
        description: values.description,
        happenTime,
      });
      if (res.code === 0) {
        message.success('编辑成功');
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error('编辑失败');
    }
    closeEditDiseaseInfoModal()
    loadData();
  };
  const deleteSportInfo = async (deseaseInfoId: number) => {
    try {
      const res = await deleteDiseaseInfoUsingDelete({
        id: deseaseInfoId,
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

  const handleMenuClick = (key: string, record: API.DiseaseInfo) => {
    switch (key) {
      case 'edit':
        openEditDiseaseInfoModal(record);
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
  const renderCardMenu = (record: API.DiseaseInfo) => {
    return (
      <Menu onClick={({key}) => handleMenuClick(key, record)}>
        <Menu.Item key="edit">编辑</Menu.Item>
        <Menu.Item key="delete" danger>删除</Menu.Item>
      </Menu>
    );
  };

  // const getDiseaseText = (type: number) => {
  //   const diseaseTypeMap = {
  //     1: '感染性疾病',
  //   };
  //   return diseaseTypeMap[type as 1] || '未知类型';
  // };

  // 当组件挂载时加载数据
  useEffect(() => {
    loadData();
  }, [searchParams]);

  // 添加useEffect监听
  useEffect(() => {
    if (editDiseaseInfoModel && currentDiseaseInfo) {
      editDiseaseInfoForm.setFieldsValue({
        date: currentDiseaseInfo.happenTime ? dayjs(currentDiseaseInfo.happenTime) : undefined,
        time: currentDiseaseInfo.happenTime ? dayjs(currentDiseaseInfo.happenTime) : undefined,
        type: currentDiseaseInfo.type?.toString(),
        diseaseName: currentDiseaseInfo.diseaseName,
        description: currentDiseaseInfo.description,
      });
    }
  }, [currentDiseaseInfo, editDiseaseInfoModel, editDiseaseInfoForm]);

  return (
    <div className="my-chart-page">
      <div>
        <Search
          placeholder="请输入疾病信息"
          enterButton
          loading={loading}
          onSearch={(value) => {
            // 设置搜索条件
            setSearchParams({
              ...initSearchParams,
              diseaseName: value
            });
          }}
          style={{width: '30%', float: 'right'}}
        />
      </div>
      <div style={{marginTop: 50, marginBottom: 20}}>
        <Button type={"primary"} style={{marginRight: 20}} onClick={openDiseaseInfoModal}>新增疾病信息</Button>
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
        dataSource={diseaseInfoList}
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
              {/*<p>{'疾病类型：' + getDiseaseText(item.type as number)}</p>*/}
              <p>{'疾病名称：' + item.diseaseName}</p>
              <p>{'疾病描述：' + item.description}</p>
              <ProFormText>{'生病时间：' + dayjs(String(item.happenTime)).format('YYYY-MM-DD HH:mm:ss')}</ProFormText>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="新增疾病信息"
        open={addDiseaseInfoModel}
        onOk={addDiseaseInfo}
        onCancel={closeDiseaseInfoModal}
      >
        <Card>
          <Form
            form={diseaseInfoForm}
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
            {/*<ProFormSelect*/}
            {/*  name={'type'}*/}
            {/*  label={'类型'}*/}
            {/*  placeholder={"请选择疾病类型"}*/}
            {/*  rules={[{ required: true, message: '请选择疾病类型' }]}*/}
            {/*  options={[*/}
            {/*    {*/}
            {/*      value: '1',*/}
            {/*      label: '疾病1',*/}
            {/*    },*/}
            {/*    {*/}
            {/*      value: '2',*/}
            {/*      label: '疾病2',*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*></ProFormSelect>*/}
            <ProFormText
              name={'diseaseName'}
              label={'名称'}
              placeholder={"请输入疾病名称"}
              rules={[{ required: true, message: '请填写疾病名称' }]}
            ></ProFormText>
            <ProFormText
              name={'description'}
              label={'描述'}
              placeholder={"请输入疾病详细"}
              rules={[{ required: true, message: '请填写疾病详细' }]}
            ></ProFormText>
          </Form>
        </Card>
      </Modal>

      <Modal
        title="编辑疾病信息"
        open={editDiseaseInfoModel}
        onOk={editDiseaseInfo}
        onCancel={closeEditDiseaseInfoModal}
      >
        <Card>
          <Form
            form={editDiseaseInfoForm}
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
            {/*<ProFormSelect*/}
            {/*  name={'type'}*/}
            {/*  label={'类型'}*/}
            {/*  placeholder={"请选择疾病类型"}*/}
            {/*  rules={[{ required: true, message: '请选择疾病类型' }]}*/}
            {/*  options={[*/}
            {/*    {*/}
            {/*      value: '1',*/}
            {/*      label: '疾病1',*/}
            {/*    },*/}
            {/*    {*/}
            {/*      value: '2',*/}
            {/*      label: '疾病2',*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*></ProFormSelect>*/}
            <ProFormText
              name={'diseaseName'}
              label={'名称'}
              placeholder={"请输入疾病名称"}
              rules={[{ required: true, message: '请填写疾病名称' }]}
            ></ProFormText>
            <ProFormText
              name={'description'}
              label={'描述'}
              placeholder={"请输入疾病详细"}
              rules={[{ required: true, message: '请填写疾病详细' }]}
            ></ProFormText>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};
export default DiseaseInfo;

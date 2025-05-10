import {useModel} from '@@/exports';
import {
  Avatar,
  Button,
  Card, Dropdown,
  Form,
  List, Menu,
  message,
  Modal,
  Radio,
} from 'antd';
import Search from 'antd/es/input/Search';
import React, {useEffect, useState} from 'react';
import {ProFormText} from "@ant-design/pro-components";
import dayjs from "dayjs";
import {
  addDietInfoUsingPost,
  deleteDietInfoUsingDelete,
  getDietInfoPageUsingPost, updateDietInfoUsingPost
} from "@/services/healthy_sys/dietInfoController";
import {ProFormDatePicker, ProFormSelect, ProFormTimePicker} from "@ant-design/pro-form/lib";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {EllipsisOutlined} from "@ant-design/icons";

/**
 * 饮食信息页面
 * @constructor
 */
const DietInfo: React.FC = () => {


  dayjs.extend(customParseFormat);

  const initSearchParams = {
    current: 1,
    pageSize: 9,
    sortField: 'create_time',
    sortOrder: 'desc',
  };

  const [dietInfoForm] = Form.useForm();
  const [editDietInfoForm] = Form.useForm();
  const [searchParams, setSearchParams] = useState<API.DietInfoQueryDTO>({...initSearchParams});
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState ?? {};
  const [currentDietInfo, setCurrentDietInfo] = useState<API.DietInfo>();
  const [dietInfoList, setDietInfoList] = useState<API.DietInfo[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // 新增状态来控制模态框的显示
  const [addDietInfoModel, setAddDietInfoModel] = useState(false);
  const [editDietInfoModel, setEditDietInfoModel] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<string>('all');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getDietInfoPageUsingPost({
        ...searchParams,
        type: selectedMealType === 'all' ? undefined : Number(selectedMealType)
      });
      if (res.data) {
        setDietInfoList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取饮食信息失败');
      }
    } catch (e: any) {
      message.error('获取饮食信息失败，' + e.message);
    }
    setLoading(false);
  };

  const openDietInfoModal = () => {
    setAddDietInfoModel(true);
  }

  const closeDietInfoModal = () => {
    setAddDietInfoModel(false);
    dietInfoForm.resetFields()
  }

  const addDietInfo = async () => {
    try {
      const values = await dietInfoForm.validateFields();
      const happenTime = dayjs(values.date)
        .hour(dayjs(values.time).hour())
        .minute(dayjs(values.time).minute())
        .format('YYYY-MM-DD HH:mm:ss');
      const res = await addDietInfoUsingPost({
        type: values.type,
        food: values.food,
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
    closeDietInfoModal();
    loadData();
  };

  const openEditDietInfoModal = (ditInfo: API.DietInfo) => {
    setCurrentDietInfo(ditInfo)
    setEditDietInfoModel(true);
  }

  const closeEditDietInfoModal = () => {
    setEditDietInfoModel(false);
    setCurrentDietInfo({});
    editDietInfoForm.resetFields()
  }

  const editDietInfo = async () => {
    try {
      const values = await editDietInfoForm.validateFields();
      const happenTime = dayjs(values.date)
        .hour(dayjs(values.time).hour())
        .minute(dayjs(values.time).minute())
        .format('YYYY-MM-DD HH:mm:ss');
      const res = await updateDietInfoUsingPost({
        dietId: currentDietInfo?.id,
        type: values.type,
        food: values.food,
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
    closeEditDietInfoModal();
    loadData();
  };
  const deleteDietInfo = async (dietInfoId: number) => {
    try {
      const res = await deleteDietInfoUsingDelete({
        id: dietInfoId,
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

  const handleMenuClick = (key: string, record: API.DietInfo) => {
    switch (key) {
      case 'edit':
        openEditDietInfoModal(record);
        break;
      case 'delete':
        Modal.confirm({
          title: '确认删除',
          content: `确定要删除这条健康知识吗？`,
          onOk: () => {
            // 这里添加实际删除逻辑
            deleteDietInfo(record?.id as number)
          },
        });
        break;
    }
  };

  // 渲染三点菜单
  const renderCardMenu = (record: API.DietInfo) => {
    return (
      <Menu onClick={({key}) => handleMenuClick(key, record)}>
        <Menu.Item key="edit">编辑</Menu.Item>
        <Menu.Item key="delete" danger>删除</Menu.Item>
      </Menu>
    );
  };

  // 数字转餐次文字
  const getMealTypeText = (type: number) => {
    const mealTypeMap = {
      1: '早餐',
      2: '午餐',
      3: '晚餐',
      4: '夜宵',
      5: '其他'
    };

    return mealTypeMap[type as 1 | 2 | 3 | 4 | 5] || '未知类型';
  };

  // 当组件挂载时加载数据
  useEffect(() => {
    loadData();
  }, [searchParams, selectedMealType]);

  // 添加useEffect监听
  useEffect(() => {
    if (editDietInfoModel && currentDietInfo) {
      editDietInfoForm.setFieldsValue({
        date: currentDietInfo.happenTime ? dayjs(currentDietInfo.happenTime) : undefined,
        time: currentDietInfo.happenTime ? dayjs(currentDietInfo.happenTime) : undefined,
        type: currentDietInfo.type?.toString(),
        food: currentDietInfo.food
      });
    }
  }, [currentDietInfo, editDietInfoModel, editDietInfoForm]);

  return (
    <div className="my-chart-page">
      <div>
        <Search
          placeholder="搜索饮食信息"
          enterButton
          loading={loading}
          onSearch={(value) => {
            // 设置搜索条件
            setSearchParams({
              ...initSearchParams,
              food: value,
            });
          }}
          style={{width: '30%', float: 'right'}}
        />
      </div>
      <div style={{marginTop: 50, marginBottom: 20}}>
        <Button type={"primary"} style={{marginRight: 20}} onClick={openDietInfoModal}>新增饮食信息</Button>
        <Radio.Group
          value={selectedMealType}
          onChange={(e) => setSelectedMealType(e.target.value)}
          style={{float: 'right'}}
        >
          <Radio value="all">全部</Radio>
          <Radio value="1">早餐</Radio>
          <Radio value="2">午餐</Radio>
          <Radio value="3">晚餐</Radio>
          <Radio value="4">夜宵</Radio>
          <Radio value="5">其他</Radio>
        </Radio.Group>
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
        dataSource={dietInfoList}
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
              <div style={{marginBottom: 16}}/>

              <p>{'类型：' + getMealTypeText(item.type as number)}</p>
              <p>{'食物：' + item.food}</p>
              <ProFormText>{'时间：' + dayjs(String(item.happenTime)).format('YYYY-MM-DD HH:mm:ss')}</ProFormText>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="新增饮食信息"
        open={addDietInfoModel}
        onOk={addDietInfo}
        onCancel={closeDietInfoModal}
      >
        <Card>
          <Form
            form={dietInfoForm}
          >
            <ProFormDatePicker
              name="date"
              label="日期"
              placeholder="选择日期"
              rules={[{required: true, message: '请选择日期'}]}
            />
            <ProFormTimePicker
              name="time"
              label="时间"
              placeholder="选择时间"
              fieldProps={{
                defaultOpenValue: dayjs('00:00:00', 'HH:mm:ss')
              }}
              rules={[{required: true, message: '请选择时间'}]}
            />
            <ProFormSelect
              name="type"
              label="类型"
              options={[
                {value: '1', label: '早餐'},
                {value: '2', label: '午餐'},
                {value: '3', label: '晚餐'},
                {value: '4', label: '夜宵'},
                {value: '5', label: '其他'},
              ]}
              rules={[{required: true, message: '请选择类型'}]}
            />
            <ProFormText
              name={'food'}
              label={'食物'}
              placeholder={"请输入食物"}
              rules={[{required: true, message: '请填写食物'}]}
            ></ProFormText>
          </Form>
        </Card>
      </Modal>

      <Modal
        title="编辑饮食信息"
        open={editDietInfoModel}
        onOk={editDietInfo}
        onCancel={closeEditDietInfoModal}
      >
        <Card>
          <Form
            form={editDietInfoForm}
          >
            <ProFormDatePicker
              name="date"
              label="日期"
              rules={[{required: true, message: '请选择日期'}]}
            />
            <ProFormTimePicker
              name="time"
              label="时间"
              placeholder="选择时间"
              fieldProps={{
                defaultOpenValue: dayjs('00:00:00', 'HH:mm:ss')
              }}
              rules={[{required: true, message: '请选择时间'}]}
            />
            <ProFormSelect
              name="type"
              label="类型"
              options={[
                {value: '1', label: '早餐'},
                {value: '2', label: '午餐'},
                {value: '3', label: '晚餐'},
                {value: '4', label: '夜宵'},
                {value: '5', label: '其他'},
              ]}
              rules={[{required: true, message: '请选择类型'}]}
            />
            <ProFormText
              name={'food'}
              label={'食物'}
              placeholder={"请填写食物"}
              rules={[{required: true, message: '请填写食物'}]}
            ></ProFormText>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};
export default DietInfo;

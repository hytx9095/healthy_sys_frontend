import {Avatar, Button, Card, Dropdown, Form, List, Menu, message, Modal, Radio, Tag} from 'antd';
import Search from 'antd/es/input/Search';
import React, {useEffect, useState} from 'react';
import {
  deleteDoctorInfoUsingDelete, doctorExamineUsingPost
} from "@/services/healthy_sys/doctorInfoController";
import {EllipsisOutlined} from "@ant-design/icons";
import moment from "moment"
import TextArea from "antd/es/input/TextArea";
import {getDoctorInfoPageByManageUsingPost} from "@/services/healthy_sys/doctorInfoController";

/**
 * 管理员医生审核页面
 * @constructor
 */
const DoctorInfo: React.FC = () => {

  const initSearchParams = {
    current: 1,
    pageSize: 9,
    sortField: 'create_time',
    sortOrder: 'desc',
  };

  const [examineForm] = Form.useForm();
  const [searchParams, setSearchParams] = useState<API.DoctorInfoQueryDTO>({...initSearchParams});
  const [currentDoctorInfo, setCurrentDoctorInfo] = useState<API.DoctorInfoVO>();
  const [doctorInfoList, setDoctorInfoList] = useState<API.DoctorInfoVO[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // 新增状态来控制模态框的显示
  const [examineModel, setExamineModel] = useState(false);
  let [dataChange] = useState(0);


  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getDoctorInfoPageByManageUsingPost(searchParams);
      if (res.data) {
        setDoctorInfoList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取医生信息失败');
      }
    } catch (e: any) {
      message.error('获取医生信息失败，' + e.message);
    }
    setLoading(false);
  };

  const getDoctorInfoPage = async (searchCondition: string) => {
    try {
      setSearchParams({
        ...searchParams,
        searchCondition: searchCondition,
      })
    } catch (error) {
      message.error('系统错误');
    }
  };

  const openExamineModal = (doctorInfo: API.DoctorInfoVO) => {
    setCurrentDoctorInfo({
      ...doctorInfo,
    })
    setExamineModel(true);
  }

  const closeExamineModal = () => {
    setExamineModel(false);
    examineForm.resetFields();
  }
  const passDoctorInfo = async () => {
    try {
      const res = await doctorExamineUsingPost({
        userId: currentDoctorInfo?.userId,
        doctorInfoId: currentDoctorInfo?.id,
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

  const rejectDoctorInfo = async () => {
    try {
      const res = await doctorExamineUsingPost({
        userId: currentDoctorInfo?.userId,
        doctorInfoId: currentDoctorInfo?.id,
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

  const deleteDoctorInfo = async (id: number) => {
    try {
      const res = await deleteDoctorInfoUsingDelete({
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

  const handleMenuClick = (key: string, record: API.DoctorInfoVO) => {
    switch (key) {
      case 'delete':
        Modal.confirm({
          title: '确认删除',
          content: `确定要删除这条健康知识吗？`,
          onOk: () => {
            // 这里添加实际删除逻辑
            deleteDoctorInfo(record?.id as number)
          },
        });
        break;
    }
  };

  // 渲染三点菜单
  const renderCardMenu = (record: API.DoctorInfoVO) => {
    return (
      <Menu onClick={({key}) => handleMenuClick(key, record)}>
        <Menu.Item key="delete" danger>删除</Menu.Item>
      </Menu>
    );
  };

  const getDoctorTypeText = (type: string): string => {
    const doctorTypeMap: Record<string, string> = {
      // 内科系统
      'cardiology': '心血管内科',
      'respiratory': '呼吸内科',
      'gastroenterology': '消化内科',
      'endocrinology': '内分泌科',
      'neurology': '神经内科',

      // 外科系统
      'general_surgery': '普通外科',
      'orthopedics': '骨科',
      'neurosurgery': '神经外科',
      'urology': '泌尿外科',

      // 其他科室
      'pediatrics': '儿科',
      'obstetrics': '产科',
      'gynecology': '妇科',
      'ophthalmology': '眼科',
      'ent': '耳鼻喉科',

      // 特殊类型
      'traditional_chinese': '中医',
      'emergency': '急诊科',
      'anesthesiology': '麻醉科',
      'pathology': '病理科'
    };

    return doctorTypeMap[type] || '未知科室类型';
  };

  // 当组件挂载时加载数据
  useEffect(() => {
    loadData();
  }, [searchParams, dataChange]);

  return (
    <div className="my-chart-page" style={{ padding: 24 }}>
      {/* 搜索框 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <Radio.Group defaultValue={"all"}>
          <Radio value="all" onClick={() => getDoctorInfoPage("all")}>全部</Radio>
          <Radio value="examine" onClick={() => getDoctorInfoPage("exam")}>已审核</Radio>
          <Radio value="notExamine" onClick={() => getDoctorInfoPage("notExam")}>待审核</Radio>
        </Radio.Group>

        <Search
          placeholder="输入医生审核信息"
          enterButton
          loading={loading}
          onSearch={(value) => {
            setSearchParams({
              ...initSearchParams,
              doctorName: value,
            });
          }}
          style={{ width: '30%' }}
        />
      </div>

      {/* 医生列表 */}
      <List
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
        dataSource={doctorInfoList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              style={{ width: '100%', position: 'relative' }}
              bodyStyle={{ padding: 16 }}
            >
              <Dropdown
                overlay={renderCardMenu(item)}
                placement="bottomRight"
                trigger={['click']}
              >
                <Button
                  type="text"
                  icon={<EllipsisOutlined />}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 1
                  }}
                />
              </Dropdown>

              <List.Item.Meta
                avatar={<Avatar src={item.userAvatar} size="large" />}
                title={<span style={{ fontWeight: 'bold' }}>{item.username}</span>}
                description={
                  <div style={{ marginTop: 8 }}>
                    <p style={{ marginBottom: 4 }}>状态: {item.status === 0 ? '待审核' : '已审核'}</p>
                    <p style={{ marginBottom: 4 }}>申请时间: {moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                  </div>
                }
              />

              <div style={{ margin: '16px 0' }}>
                <p style={{ marginBottom: 8 }}><strong>职位:</strong></p>
                <div style={{
                  background: '#f5f5f5',
                  padding: 12,
                  borderRadius: 4,
                  maxHeight: 120,
                  overflow: 'auto'
                }}>
                  {getDoctorTypeText(item.type as string)}
                </div>
              </div>

              <div style={{ margin: '16px 0' }}>
                <p style={{ marginBottom: 8 }}><strong>描述:</strong></p>
                <div style={{
                  background: '#f5f5f5',
                  padding: 12,
                  borderRadius: 4,
                  maxHeight: 120,
                  overflow: 'auto'
                }}>
                  {item.description}
                </div>
              </div>

              <div style={{ margin: '16px 0' }}>
                <p style={{ marginBottom: 8 }}><strong>证明信息:</strong></p>
                <div style={{
                  background: '#f5f5f5',
                  padding: 12,
                  borderRadius: 4,
                  maxHeight: 120,
                  overflow: 'auto'
                }}>
                  {item.evidence}
                </div>
              </div>

              {item.status === 0 ? (
                <div style={{ textAlign: 'right', marginTop: 16 }}>
                  <Button
                    type="primary"
                    onClick={() => openExamineModal(item)}
                    style={{ marginRight: 8 }}
                  >
                    审核
                  </Button>
                </div>
              ) : (
                <div style={{ textAlign: 'right', marginTop: 16 }}>
                  {item.status === 1 && (
                    <Tag color="green" onClick={()=>{message.success("success")}}>审核通过</Tag>
                  )}
                  {item.status === 2 && (
                    <Tag color="red" onClick={()=>{message.error("error")}}>审核未通过</Tag>
                  )}
                </div>
              )}
            </Card>
          </List.Item>
        )}
      />

      {/* 审核模态框 */}
      <Modal
        title="医生申请审核"
        open={examineModel}
        onCancel={closeExamineModal}
        width={600}
        footer={[
          <Button key="back" onClick={closeExamineModal}>
            取消
          </Button>,
          <Button key="reject" type="default" danger onClick={rejectDoctorInfo}>
            驳回
          </Button>,
          <Button key="approve" type="primary" onClick={passDoctorInfo}>
            通过
          </Button>,
        ]}
      >
        <Card bordered={false}>
          <Form form={examineForm} layout="vertical">
            <Form.Item
              label="审核意见"
              name="description"
              rules={[{ required: true, message: '请输入审核意见' }]}
            >
              <TextArea
                rows={4}
                placeholder="请输入审核说明"
                style={{ marginTop: 8 }}
              />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};
export default DoctorInfo;

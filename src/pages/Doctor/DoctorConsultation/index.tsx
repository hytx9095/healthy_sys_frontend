import {useModel} from '@@/exports';
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  List,
  message,
  Modal, Row,
} from 'antd';
import Search from 'antd/es/input/Search';
import React, {useEffect, useState} from 'react';
import {ProFormText} from "@ant-design/pro-components";
import dayjs from "dayjs";
import {history} from '@umijs/max';
import { ProFormSelect, ProFormTextArea} from "@ant-design/pro-form/lib";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {UserOutlined} from "@ant-design/icons";
import {
  addDoctorInfoUsingPost,
  getDoctorInfoByUserIdUsingPost,
  getDoctorInfoPageByUserUsingPost, updateDoctorInfoUsingPost
} from "@/services/healthy_sys/doctorInfoController";

/**
 * 医生咨询页面
 * @constructor
 */
const DockerConsultation: React.FC = () => {


  dayjs.extend(customParseFormat);

  const initSearchParams = {
    current: 1,
    pageSize: 9,
    sortField: 'create_time',
    sortOrder: 'desc',
  };

  const [doctorInfoForm] = Form.useForm();
  const [searchParams, setSearchParams] = useState<API.DoctorInfoQueryDTO>({...initSearchParams});
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState ?? {};
  const [currentDoctorInfo, setCurrentDoctorInfo] = useState<API.DoctorInfo>();
  const [doctorInfoList, setDoctorInfoList] = useState<API.DoctorInfoVO[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // 新增状态来控制模态框的显示
  const [addDoctorInfoModel, setAddDoctorInfoModel] = useState(false);
  const [editDoctorInfoModel, setEditDoctorInfoModel] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getDoctorInfoPageByUserUsingPost({
        ...searchParams,
      });
      if (res.data) {
        setDoctorInfoList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取医生信息失败');
      }

      if (currentUser?.role === 'doctor'){
        const getRes = await getDoctorInfoByUserIdUsingPost({
          userId: currentUser?.id
        })
        if (getRes.code === 0){
          setCurrentDoctorInfo(getRes.data)
        }
      }
    } catch (e: any) {
      message.error('获取医生信息失败，' + e.message);
    }
    setLoading(false);
  };

  const openDoctorInfoModal = () => {
    setAddDoctorInfoModel(true);
  }

  const closeDoctorInfoModal = () => {
    setAddDoctorInfoModel(false);
    doctorInfoForm.resetFields()
  }

  const closeEditDoctorInfoModal = () => {
    setEditDoctorInfoModel(false);
    doctorInfoForm.resetFields()
  }

  const applyForDoctor = async () => {
    try {
      const values = await doctorInfoForm.validateFields();
      const res = await addDoctorInfoUsingPost({
        type: values.type,
        evidence: values.evidence,
        description: values.description,

      });
      if (res.code === 0) {
        message.success('申请成功');
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error('申请失败');
    }
    setAddDoctorInfoModel(false);
    doctorInfoForm.resetFields()
    loadData();
  };

  const updateDoctorInfo = async () => {
    try {
      const values = await doctorInfoForm.validateFields();
      const res = await updateDoctorInfoUsingPost({
        doctorId: currentDoctorInfo?.id,
        type: values.type,
        evidence: values.evidence,
        description: values.description,
      });
      if (res.code === 0) {
        message.success('更新成功');
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error('更新失败');
    }
    closeEditDoctorInfoModal();
    loadData();
  };

  const toDoctorDialogue = (doctorId: number) => {
    // window.localStorage.setItem('doctorId', String(doctorId))
    window.localStorage.setItem('doctorId', String(doctorId))
    //跳转到
    history.push('/doctor/dialogue');
  }
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
  }, [searchParams]);

  // 添加useEffect监听
  useEffect(() => {
    if (editDoctorInfoModel && currentDoctorInfo) {
      doctorInfoForm.setFieldsValue({
        type: currentDoctorInfo.type,
        evidence: currentDoctorInfo.evidence,
        description: currentDoctorInfo.description,
      });
    }
  }, [currentDoctorInfo, editDoctorInfoModel, doctorInfoForm]);

  return (
    <div className="my-chart-page">
      <div>
        <Search
          enterButton
          loading={loading}
          placeholder="输入医生信息"
          onSearch={(value) => {
            // 设置搜索条件
            setSearchParams({
              ...initSearchParams,
              doctorName: value,
            });
          }}
          style={{width: '30%', float: 'right'}}
        />
      </div>
      <div style={{marginTop: 50, marginBottom: 20}}>
        {currentUser?.role === 'doctor' ? (
          <Card
            style={{
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              marginBottom: 24
            }}
            bodyStyle={{padding: 24}}
          >
            <Row gutter={16} align="middle">
              {/* 左侧头像和信息区域 */}
              <Col flex="none">
                <Avatar
                  size={64}
                  src={currentUser?.userAvatar}
                  icon={<UserOutlined/>}
                  style={{marginRight: 16}}
                />
              </Col>

              {/* 中间医生信息区域 */}
              <Col flex="auto">
                <ProFormText style={{marginBottom: 4}}>
                  您好，{currentUser?.username}医生
                </ProFormText>
              </Col>

              {/* 右侧操作按钮区域 */}
              <Col flex="none">
                <Button
                  type="primary"
                  // href="/message/center"
                  style={{marginRight: 12}}
                  onClick={() => {
                    history.push('/doctor/message/center')
                  }}
                >
                  消息中心
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setEditDoctorInfoModel(true)
                  }}
                >
                  编辑资料
                </Button>
              </Col>
            </Row>
          </Card>
        ) : (
          <div>
            <Button type={"primary"} style={{marginRight: 20}} onClick={openDoctorInfoModal}>申请成为医生</Button>
            <Button type={"primary"} style={{marginRight: 20}}
                    onClick={() => {
                      history.push('/doctor/consult/center')
                    }}>咨询中心</Button>
          </div>
        )}
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
        dataSource={doctorInfoList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card style={{width: '100%'}}>
              <List.Item.Meta
                avatar={<Avatar src={item.userAvatar}
                />}
                title={item.username}
              />
              <div style={{marginBottom: 16}}/>
              <p>{'类型：' + getDoctorTypeText(item.type as string)}</p>
              <p>{'描述：' + item.description}</p>
              <div style={{float: 'right'}}>
                {currentUser?.role === 'doctor' ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      setEditDoctorInfoModel(true)
                    }}
                  >
                    编辑
                  </Button>
                ) : (
                  <Button
                    type="link"
                    onClick={() => {
                      toDoctorDialogue(item.userId as number)
                    }}
                  >
                    咨询
                  </Button>
                )}

              </div>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="申请成为医生"
        open={addDoctorInfoModel}
        onOk={applyForDoctor}
        onCancel={closeDoctorInfoModal}
      >
        <Card>
          <Form
            form={doctorInfoForm}
          >
            <ProFormSelect
              name="type"
              label="医生专业"
              options={[
                {
                  label: '内科系统',
                  options: [
                    {value: 'cardiology', label: '心血管内科'},
                    {value: 'respiratory', label: '呼吸内科'},
                    {value: 'gastroenterology', label: '消化内科'},
                    {value: 'endocrinology', label: '内分泌科'},
                    {value: 'neurology', label: '神经内科'},
                  ],
                },
                {
                  label: '外科系统',
                  options: [
                    {value: 'general_surgery', label: '普通外科'},
                    {value: 'orthopedics', label: '骨科'},
                    {value: 'neurosurgery', label: '神经外科'},
                    {value: 'urology', label: '泌尿外科'},
                  ],
                },
                {
                  label: '其他科室',
                  options: [
                    {value: 'pediatrics', label: '儿科'},
                    {value: 'obstetrics', label: '产科'},
                    {value: 'gynecology', label: '妇科'},
                    {value: 'ophthalmology', label: '眼科'},
                    {value: 'ent', label: '耳鼻喉科'},
                  ],
                },
                {
                  label: '特殊类型',
                  options: [
                    {value: 'traditional_chinese', label: '中医'},
                    {value: 'emergency', label: '急诊科'},
                    {value: 'anesthesiology', label: '麻醉科'},
                    {value: 'pathology', label: '病理科'},
                  ],
                },
              ]}
              rules={[{required: true, message: '请选择医生专业'}]}
              placeholder="请选择具体的医生专业"
              fieldProps={{
                showSearch: true,
                optionFilterProp: "label",
                filterOption: (input, option) => {
                  if (option?.options) {
                    // 分组选项不参与筛选
                    return false;
                  }
                  // @ts-ignore
                  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }
              }}
            />
            <ProFormTextArea
              name="evidence"
              label="证明信息"
              placeholder="请输入所在省份、医师姓名、所在医疗机构"
              rules={[{required: true, message: '请输入所在省份、医师姓名、所在医疗机构'}]}
              fieldProps={{
                autoSize: {minRows: 6, maxRows: 12},
                showCount: true,
                maxLength: 200,
                allowClear: true
              }}
            />
            <ProFormTextArea
              name="description"
              label="医生简介"
              placeholder="请输入医生简介"
              rules={[{required: true, message: '请输入医生简介'}]}
              fieldProps={{
                autoSize: {minRows: 6, maxRows: 12},
                showCount: true,
                maxLength: 500,
                allowClear: true,
              }}
            />
          </Form>
        </Card>
      </Modal>

      <Modal
        title="医生信息编辑"
        open={editDoctorInfoModel}
        onOk={updateDoctorInfo}
        onCancel={closeEditDoctorInfoModal}
      >
        <Card>
          <Form
            form={doctorInfoForm}
          >
            <ProFormSelect
              name="type"
              label="医生专业"
              options={[
                {
                  label: '内科系统',
                  options: [
                    {value: 'cardiology', label: '心血管内科'},
                    {value: 'respiratory', label: '呼吸内科'},
                    {value: 'gastroenterology', label: '消化内科'},
                    {value: 'endocrinology', label: '内分泌科'},
                    {value: 'neurology', label: '神经内科'},
                  ],
                },
                {
                  label: '外科系统',
                  options: [
                    {value: 'general_surgery', label: '普通外科'},
                    {value: 'orthopedics', label: '骨科'},
                    {value: 'neurosurgery', label: '神经外科'},
                    {value: 'urology', label: '泌尿外科'},
                  ],
                },
                {
                  label: '其他科室',
                  options: [
                    {value: 'pediatrics', label: '儿科'},
                    {value: 'obstetrics', label: '产科'},
                    {value: 'gynecology', label: '妇科'},
                    {value: 'ophthalmology', label: '眼科'},
                    {value: 'ent', label: '耳鼻喉科'},
                  ],
                },
                {
                  label: '特殊类型',
                  options: [
                    {value: 'traditional_chinese', label: '中医'},
                    {value: 'emergency', label: '急诊科'},
                    {value: 'anesthesiology', label: '麻醉科'},
                    {value: 'pathology', label: '病理科'},
                  ],
                },
              ]}
              rules={[{required: true, message: '请选择医生专业'}]}
              placeholder="请选择具体的医生专业"
              fieldProps={{
                showSearch: true,
                optionFilterProp: "label",
                filterOption: (input, option) => {
                  if (option?.options) {
                    // 分组选项不参与筛选
                    return false;
                  }
                  // @ts-ignore
                  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }
              }}
            />
            <ProFormTextArea
              name="evidence"
              label="证明信息"
              placeholder="请输入所在省份、医师姓名、所在医疗机构"
              rules={[{required: true, message: '请输入所在省份、医师姓名、所在医疗机构'}]}
              fieldProps={{
                autoSize: {minRows: 6, maxRows: 12},
                showCount: true,
                maxLength: 200,
                allowClear: true
              }}
            />
            <ProFormTextArea
              name="description"
              label="医生简介"
              placeholder="请输入医生简介"
              rules={[{required: true, message: '请输入医生简介'}]}
              fieldProps={{
                autoSize: {minRows: 6, maxRows: 12},
                showCount: true,
                maxLength: 2000,
                allowClear: true,
              }}
            />
          </Form>
        </Card>
      </Modal>
    </div>
  );
};
export default DockerConsultation;

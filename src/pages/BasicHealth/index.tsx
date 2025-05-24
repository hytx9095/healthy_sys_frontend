import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Space,
  Typography,
  Alert,
  Progress,
  Avatar,
  Badge,
  Grid, message
} from 'antd';
import {
  UserOutlined,
  ManOutlined,
  WomanOutlined,
  EyeOutlined,
  HeartOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import {ProFormText, ProFormSelect, ProFormDigit} from '@ant-design/pro-components';
import React, {useEffect} from 'react';
import {
  addBasicHealthInfoUsingPost,
  getBasicHealthInfoUsingGet, updateBasicHealthInfoUsingPost
} from "../../services/healthy_sys/basicHealthInfoController";

const {Title, Text} = Typography;
const {useBreakpoint} = Grid;

/**
 * 基本健康信息页面
 */
const BasicHealth: React.FC = () => {
  const [form] = Form.useForm();
  const [bmiValue, setBmiValue] = React.useState<number | null>(null);
  const screens = useBreakpoint();
  const [basicHealthyExit, setBasicHealthyExit] = React.useState(true);
  const loadData = async () => {
    try {
      const res = await getBasicHealthInfoUsingGet();
      if (res.code === 40400){
        setBasicHealthyExit(false)
        return;
      }
      if (res.data) {
        form.setFieldsValue(res.data);
      } else {
        message.error('添加基本健康信息失败');
      }
    } catch (e: any) {
      message.error('添加基本健康信息失败，' + e.message);
    }
  };
  // 计算BMI
  const calculateBMI = () => {
    const height = form.getFieldValue('height');
    const weight = form.getFieldValue('weight');

    if (height && weight) {
      const heightInMeters = Number(height) / 100;
      const bmi = Number(weight) / (heightInMeters * heightInMeters);
      setBmiValue(parseFloat(bmi.toFixed(1)));
      form.setFieldsValue({bmi: parseFloat(bmi.toFixed(1))});
    }
  };

  // BMI状态
  const getBmiStatus = (bmi: number | null) => {
    if (!bmi) return {status: '未计算', color: 'default'};
    if (bmi < 18.5) return {status: '偏瘦', color: 'blue'};
    if (bmi < 24) return {status: '正常', color: 'green'};
    if (bmi < 28) return {status: '超重', color: 'orange'};
    return {status: '肥胖', color: 'red'};
  };

  const bmiStatus = getBmiStatus(bmiValue);

  // 响应式布局配置
  const formItemLayout = screens.xs ?
    {labelCol: {span: 24}, wrapperCol: {span: 24}} :
    {labelCol: {span: 8}, wrapperCol: {span: 16}};

  const cardStyle = {
    marginBottom: 16,
    borderRadius: 8,
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)'
  };

  const saveBasicHealthInfo = async () => {
    try {
      if (basicHealthyExit){
        const res = await updateBasicHealthInfoUsingPost({
          ...form.getFieldsValue(),
        });
        if (res.code !== 0){
          message.error('修改基本健康信息失败');
        }
        message.success('修改基本健康信息成功')
      }else{
        const res = await addBasicHealthInfoUsingPost({
          ...form.getFieldsValue(),
        });
        if (res.code !== 0){
          message.error('修改基本健康信息失败');
        }
        message.success('修改基本健康信息成功')
      }

    } catch (e: any) {
      message.error('添加基本健康信息失败，' + e.message);
    }
  };

  // 当组件挂载时加载数据
  useEffect(() => {
    loadData();
  }, );

  return (
    <div style={{
      padding: screens.xs ? '12px' : '24px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    }}>
      <Title
        level={3}
        style={{
          marginBottom: '24px',
          color: '#1890ff',
          fontSize: screens.xs ? '20px' : '24px'
        }}
      >
        <DashboardOutlined/> 基本健康信息
      </Title>

      <Alert
        message="请填写您的真实健康数据，系统将为您提供个性化健康建议"
        type="info"
        showIcon
        style={{marginBottom: '24px'}}
      />

      <Card
        bordered={false}
        headStyle={{border: 'none', padding: screens.xs ? '12px 16px' : '16px 24px'}}
        bodyStyle={{padding: screens.xs ? '12px 16px' : '16px 24px'}}
        style={cardStyle}
        title={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Avatar
              size={screens.xs ? 'default' : 'large'}
              style={{backgroundColor: '#1890ff', marginRight: '12px'}}
              icon={<UserOutlined/>}
            />
            <Text strong style={{fontSize: screens.xs ? '14px' : '16px'}}>个人信息</Text>
          </div>
        }
      >
        <Form
          form={form}
          name="basicHealth"
          labelAlign="left"
          {...formItemLayout}
          layout={screens.xs ? 'vertical' : 'horizontal'}
        >
          <Row gutter={screens.xs ? 0 : 24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <ProFormDigit
                name="age"
                label="年龄"
                placeholder="请输入年龄"
                fieldProps={{
                  addonAfter: '岁',
                  min: 1,
                  max: 120
                }}
                rules={[{required: true, message: '请输入年龄'}]}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <ProFormSelect
                name="gender"
                label="性别"
                options={[
                  {value: 'male', label: <span><ManOutlined/> 男</span>},
                  {value: 'female', label: <span><WomanOutlined/> 女</span>},
                ]}
                rules={[{required: true, message: '请选择性别'}]}
              />
            </Col>
          </Row>
        </Form>
      </Card>

      <Divider style={{margin: screens.xs ? '12px 0' : '16px 0'}}/>

      <Card
        bordered={false}
        headStyle={{border: 'none', padding: screens.xs ? '12px 16px' : '16px 24px'}}
        bodyStyle={{padding: screens.xs ? '12px 16px' : '16px 24px'}}
        style={cardStyle}
        title={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Avatar
              size={screens.xs ? 'default' : 'large'}
              style={{backgroundColor: '#52c41a', marginRight: '12px'}}
              icon={<DashboardOutlined/>}
            />
            <Text strong style={{fontSize: screens.xs ? '14px' : '16px'}}>身体指标</Text>
          </div>
        }
      >
        <Form
          form={form}
          name="bodyMetrics"
          labelAlign="left"
          {...formItemLayout}
          layout={screens.xs ? 'vertical' : 'horizontal'}
        >
          <Row gutter={screens.xs ? 0 : 24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <ProFormDigit
                name="height"
                label="身高"
                placeholder="请输入身高"
                fieldProps={{
                  addonAfter: 'cm',
                  min: 100,
                  max: 250,
                  onChange: calculateBMI
                }}
                rules={[{required: true, message: '请输入身高'}]}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <ProFormDigit
                name="weight"
                label="体重"
                placeholder="请输入体重"
                fieldProps={{
                  addonAfter: 'kg',
                  min: 20,
                  max: 200,
                  onChange: calculateBMI
                }}
                rules={[{required: true, message: '请输入体重'}]}
              />
            </Col>
          </Row>

          <Row gutter={screens.xs ? 0 : 24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="BMI指数" style={{marginBottom: screens.xs ? 12 : 24}}>
                <div style={{
                  display: 'flex',
                  flexDirection: screens.xs ? 'column' : 'row',
                  alignItems: screens.xs ? 'flex-start' : 'center',
                  gap: screens.xs ? 8 : 16
                }}>
                  {
                    form.getFieldValue('bmi') ? (
                      <ProFormDigit
                        name="bmi"
                        placeholder={form.getFieldValue('bmi')}
                        disabled
                        fieldProps={{
                          style: {
                            width: screens.xs ? '100%' : '120px',
                            marginBottom: screens.xs ? 8 : 0
                          }
                        }}
                      />
                    ) : (
                      <ProFormDigit
                        name="bmi"
                        placeholder="自动计算"
                        disabled
                        fieldProps={{
                          style: {
                            width: screens.xs ? '100%' : '120px',
                            marginBottom: screens.xs ? 8 : 0
                          }
                        }}
                      />
                    )
                  }

                  {bmiValue && (
                    <>
                      <Badge
                        status="default"
                        color={bmiStatus.color}
                        text={bmiStatus.status}
                      />
                      {!screens.xs && (
                        <Progress
                          percent={Math.min(100, (bmiValue / 40) * 100)}
                          strokeColor={bmiStatus.color}
                          showInfo={false}
                          style={{width: '100px'}}
                        />
                      )}
                    </>
                  )}
                </div>
                {bmiValue && screens.xs && (
                  <Progress
                    percent={Math.min(100, (bmiValue / 40) * 100)}
                    strokeColor={bmiStatus.color}
                    showInfo={false}
                    style={{width: '100%', marginTop: 8}}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Divider style={{margin: screens.xs ? '12px 0' : '16px 0'}}/>

      <Card
        bordered={false}
        headStyle={{border: 'none', padding: screens.xs ? '12px 16px' : '16px 24px'}}
        bodyStyle={{padding: screens.xs ? '12px 16px' : '16px 24px'}}
        style={cardStyle}
        title={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Avatar
              size={screens.xs ? 'default' : 'large'}
              style={{backgroundColor: '#faad14', marginRight: '12px'}}
              icon={<EyeOutlined/>}
            />
            <Text strong style={{fontSize: screens.xs ? '14px' : '16px'}}>视力信息</Text>
          </div>
        }
      >
        <Form
          form={form}
          name="visionInfo"
          labelAlign="left"
          {...formItemLayout}
          layout={screens.xs ? 'vertical' : 'horizontal'}
        >
          <Row gutter={screens.xs ? 0 : 24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <ProFormDigit
                name="leftEyeVision"
                label="左眼视力"
                placeholder="请输入左眼视力"
                fieldProps={{
                  min: 0.1,
                  max: 6.0,
                  step: 0.1
                }}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <ProFormDigit
                name="rightEyeVision"
                label="右眼视力"
                placeholder="请输入右眼视力"
                fieldProps={{
                  min: 0.1,
                  max: 6.0,
                  step: 0.1
                }}
              />
            </Col>
          </Row>
        </Form>
      </Card>

      <Divider style={{margin: screens.xs ? '12px 0' : '16px 0'}}/>

      <Card
        bordered={false}
        headStyle={{border: 'none', padding: screens.xs ? '12px 16px' : '16px 24px'}}
        bodyStyle={{padding: screens.xs ? '12px 16px' : '16px 24px'}}
        style={cardStyle}
        title={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Avatar
              size={screens.xs ? 'default' : 'large'}
              style={{backgroundColor: '#f5222d', marginRight: '12px'}}
              icon={<HeartOutlined/>}
            />
            <Text strong style={{fontSize: screens.xs ? '14px' : '16px'}}>其他</Text>
          </div>
        }
      >
        <Form
          form={form}
          name="vitalSigns"
          labelAlign="left"
          {...formItemLayout}
          layout={screens.xs ? 'vertical' : 'horizontal'}
        >
          <Row gutter={screens.xs ? 0 : 24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <ProFormText
                name="bloodPressure"
                label="血压"
                placeholder="例如: 120/80"
                rules={[
                  {
                    pattern: /^\d{2,3}\/\d{2,3}$/,
                    message: '请输入正确的血压格式(如120/80)'
                  }
                ]}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <ProFormDigit
                name="bodyTemperature"
                label="体温"
                placeholder="请输入体温"
                fieldProps={{
                  addonAfter: '°C',
                  min: 35,
                  max: 42,
                  step: 0.1
                }}
              />
            </Col>
          </Row>

          <Row gutter={screens.xs ? 0 : 24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <ProFormDigit
                name="heartRate"
                label="心率"
                placeholder="请输入心率"
                fieldProps={{
                  addonAfter: '次/分钟',
                  min: 40,
                  max: 200
                }}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <ProFormDigit
                name="vitalCapacity"
                label="肺活量"
                placeholder="请输入肺活量"
                fieldProps={{
                  addonAfter: 'ml',
                  min: 1000,
                  max: 7000
                }}
              />
            </Col>
          </Row>
        </Form>
      </Card>

      <Divider style={{margin: screens.xs ? '12px 0' : '16px 0'}}/>

      <Form.Item
        wrapperCol={screens.xs ? {span: 24} : {span: 16, offset: 8}}
        style={{marginTop: '24px', textAlign: screens.xs ? 'center' : 'left'}}
      >
        <Space size={screens.xs ? 'small' : 'large'} direction={screens.xs ? 'vertical' : 'horizontal'}>
          <Button
            type="primary"
            htmlType="submit"
            size={screens.xs ? 'middle' : 'large'}
            style={{width: screens.xs ? '100%' : '120px'}}
            onClick={() => {
              saveBasicHealthInfo()
            }}
          >
            提交信息
          </Button>
          <Button
            htmlType="reset"
            size={screens.xs ? 'middle' : 'large'}
            style={{width: screens.xs ? '100%' : '120px'}}
            onClick={() => {
              form.resetFields();
              setBmiValue(null);
            }}
          >
            重置表单
          </Button>
        </Space>
      </Form.Item>
    </div>
  );
};

export default BasicHealth;

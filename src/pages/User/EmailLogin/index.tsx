// import Footer from '@/components/Footer';
// import { listChartByPageUsingPOST } from '@/services/healthy_sys/chartController';
// import { API } from '@/services/healthy_sys/typings';
// import {
//   getLoginUserUsingGET,
//   userEmailLoginUsingPOST,
//   userSendEmailUsingPOST,
// } from '@/services/healthy_sys/userController';
// import { Link } from '@@/exports';
// import { LoginForm, ProFormText } from '@ant-design/pro-components';
// import { ProFormCaptcha } from '@ant-design/pro-form';
// import { useEmotionCss } from '@ant-design/use-emotion-css';
// import { Helmet, history, useModel } from '@umijs/max';
// import { Form, message, Tabs } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { flushSync } from 'react-dom';
// import Settings from '../../../../config/defaultSettings';
//
// const EmailLogin: React.FC = () => {
//   const [type, setType] = useState<string>('email');
//   const { setInitialState } = useModel('@@initialState');
//   const [form] = Form.useForm();
//   const containerClassName = useEmotionCss(() => {
//     return {
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100vh',
//       overflow: 'auto',
//       backgroundImage:
//         "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
//       backgroundSize: '100% 100%',
//     };
//   });
//
//   useEffect(() => {
//     listChartByPageUsingPOST({}).then((res) => {
//       console.error('res', res);
//     });
//   });
//
//   /**
//    * 登陆成功后，获取用户信息
//    */
//   const fetchUserInfo = async () => {
//     const userInfo = await getLoginUserUsingGET();
//     if (userInfo) {
//       flushSync(() => {
//         setInitialState((s) => ({
//           ...s,
//           currentUser: userInfo,
//         }));
//       });
//     }
//   };
//
//   const sendEmail = async (values: API.UserSendEmailRequest) => {
//     if (!values.email) {
//       message.error('请输入邮箱');
//       return;
//     }
//     const res = await userSendEmailUsingPOST(values);
//     if (res.code !== 0) {
//       message.error(res.message);
//       return;
//     }
//     message.success("获取验证码成功");
//     return;
//   };
//
//   const handleSubmit = async (values: API.UserEmailLoginRequest) => {
//     try {
//       // 登录
//       const res = await userEmailLoginUsingPOST(values);
//       if (res.code === 0) {
//         localStorage.setItem('token', res.data?.token || '');
//         const defaultLoginSuccessMessage = '登录成功！';
//         message.success(defaultLoginSuccessMessage);
//         await fetchUserInfo();
//         const urlParams = new URL(window.location.href).searchParams;
//         history.push(urlParams.get('redirect') || '/');
//         return;
//       } else {
//         message.error(res.message);
//       }
//     } catch (error) {
//       const defaultLoginFailureMessage = '登录失败，请重试！';
//       console.log(error);
//       message.error(defaultLoginFailureMessage);
//     }
//   };
//
//   return (
//     <div className={containerClassName}>
//       <Helmet>
//         <title>
//           {'登录'}- {Settings.title}
//         </title>
//       </Helmet>
//       <div
//         style={{
//           flex: '1',
//           padding: '32px 0',
//         }}
//       >
//         <LoginForm
//           contentStyle={{
//             minWidth: 280,
//             maxWidth: '75vw',
//           }}
//           form={form}
//           logo={<img alt="logo" src="/logo.svg" />}
//           title="个人健康信息管理与智能建议系统"
//           onFinish={async (values) => {
//             await handleSubmit(values as API.UserEmailLoginRequest);
//           }}
//         >
//           <Tabs
//             activeKey={type}
//             onChange={setType}
//             centered
//             items={[
//               {
//                 key: 'email',
//                 label: '邮箱登录',
//               },
//             ]}
//           />
//           {type === 'email' && (
//             <>
//               <ProFormText
//                 name="email"
//                 fieldProps={{
//                   size: 'large',
//                 }}
//                 placeholder={'请输入邮箱'}
//                 rules={[
//                   {
//                     required: true,
//                     message: '邮箱是必填项！',
//                   },
//                 ]}
//               />
//               <ProFormCaptcha
//                 fieldProps={{
//                   size: 'large',
//                 }}
//                 captchaProps={{
//                   size: 'large',
//                 }}
//                 placeholder={'请输入验证码'}
//                 captchaTextRender={(timing, count) => {
//                   if (timing) {
//                     return `${count} ${'获取验证码'}`;
//                   }
//                   return '获取验证码';
//                 }}
//                 name="validateCode"
//                 rules={[
//                   {
//                     required: true,
//                     message: '请输入验证码！',
//                   },
//                 ]}
//                 onGetCaptcha={async () => {
//                   if (!form.getFieldValue('email')){
//                     message.error('请输入邮箱');
//                     return;
//                   }
//                   sendEmail({ email: form.getFieldValue('email') });
//                 }}
//               />
//             </>
//           )}
//
//           <div
//             style={{
//               marginBottom: 24,
//               marginTop: 23,
//             }}
//           >
//             <Link to="/user/register">注册</Link>
//             <Link to="/user/login" style={{ float: 'right' }}>
//               密码登录
//             </Link>
//           </div>
//         </LoginForm>
//       </div>
//       <Footer />
//     </div>
//   );
// };
// export default EmailLogin;

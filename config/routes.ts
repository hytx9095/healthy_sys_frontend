export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {path: '/user/login', component: './User/Login'},
      {path: '/user/emailLogin', component: './User/EmailLogin'},
      {path: '/user/register', component: './User/Register'},
    ],
  },
  {path: '/', redirect: '/home'},
  {
    path: '/home',
    name: '首页',
    icon: 'home',
    component: './Home'},
  {
    path: '/basic_health',
    name: '基本健康信息',
    icon: 'barChart',
    component: './BasicHealth',
  },
  {
    path: '/diet_info',
    name: '饮食信息',
    icon: 'comment',
    component: './DietInfo',
  },
  {
    path: '/sport_info',
    name: '运动信息',
    icon: 'comment',
    component: './SportInfo',
  },
  {
    path: '/disease_info',
    name: '疾病信息',
    icon: 'comment',
    component: './DiseaseInfo',
  },
  {
    path: '/healthy_knowledge/user',
    name: '健康知识库',
    icon: 'read',
    component: './HealthyKnowledge',
  },
  {
    path: '/assistant_dialogue',
    name: '健康助手对话',
    icon: 'comment',
    component: './AssistantDialogue',
  },
  {
    path: '/healthy_test',
    name: '健康小测验',
    icon: 'barChart',
    layout: false,
    component: './KnowledgeTest',
  },
  {
    path: '/intelligent_suggestion',
    name: '智能建议',
    icon: 'pieChart',
    component: './IntelligentSuggestion'},
  {
    path: '/risk_analysis',
    name: '风险分析',
    icon: 'calendar',
    component: './RiskPrediction'},
  {
    path: '/doctor/info',
    name: '医生信息',
    icon: 'comment',
    component: './Doctor/DoctorConsultation'},
  {
    path: '/doctor/dialogue',
    name: '医生咨询',
    layout: false,
    component: './Doctor/DoctorDialogue'},
  {
    path: '/user_center',
    name: '个人中心',
    icon: 'user',
    component: './User/Center'},
  {
    path: '/message/center',
    name: '系统消息',
    layout: false,
    component: './MessageCenter'},
  {
    path: '/doctor/message/center',
    name: '医生消息中心',
    layout: false,
    component: './Doctor/MessageCenter'},
  {
    path: '/doctor/consult/center',
    name: '用户消息中心',
    layout: false,
    component: './Doctor/ConsultCenter'},
  {
    path: '/system',
    name: '系统管理',
    icon: 'appstore',
    access: 'canAdmin',
    routes: [
      {
        path: '/system/user_manage',
        name: '用户管理',
        icon: 'user',
        component: './Manage/UserManage',
      },
      {
        path: '/system/healthy_news',
        name: '健康资讯管理',
        icon: 'read',
        component: './Manage/HealthyNews',
      },
      {
        path: '/system/healthy_knowledge',
        name: '健康知识管理',
        icon: 'read',
        component: './Manage/HealthyKnowledge',
      },
      {
        path: '/system/doctor/exam',
        name: '医生管理',
        icon: 'read',
        component: './Manage/DoctorManage',
      },
      {
        path: '/system/message',
        name: '系统消息管理',
        icon: 'read',
        component: './Manage/SystemMessage',
      },
      // {
      //   path: '/system/question/bank',
      //   name: '题库管理',
      //   icon: 'read',
      //   component: './Manage/QuestionBank',
      // },
    ]
  },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {path: '/admin/user', name: '管理页面', redirect: '/admin/sub-page'},
      {path: '/admin/sub-page', name: '管理页面2', component: './Admin'},
    ],
  },
  {path: '/', redirect: '/welcome'},
  {path: '*', layout: false, component: './404'},
];

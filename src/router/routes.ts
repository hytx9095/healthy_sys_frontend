import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ACCESS_NUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserFindPasswordView from "@/views/user/UserFindPasswordView.vue";
import UserCenterView from "@/views/user/UserCenterView.vue";
import DietInfoView from "@/views/DietInfoView.vue";
import SportInfoView from "@/views/SportInfoView.vue";
import SysMessageView from "@/views/message/SysMessageView.vue";
import MessageSettingView from "@/views/message/MessageSettingView.vue";
import BasicHealthInfoView from "@/views/BasicHealthInfoView.vue";
import AdminUserManageView from "@/views/admin/AdminUserManageView.vue";
import AdminSendMessageView from "@/views/admin/AdminSendMessageView.vue";
import Admin from "@/views/admin/Admin.vue";
import AdminTool from "@/views/admin/AdminTool.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/user/login",
  },
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    redirect: "/user/login",
    meta: {
      hideInMenu: true,
      requiredAuth: false,
    },
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
        meta: {
          requiredAuth: false,
        },
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
        meta: {
          requiredAuth: false,
        },
      },
      {
        path: "/user/findPassword",
        name: "找回密码",
        component: UserFindPasswordView,
        meta: {
          requiredAuth: false,
        },
      },
    ],
  },
  {
    path: "/home",
    name: "首页",
    component: HomeView,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/center",
    name: "个人中心",
    component: UserCenterView,
    meta: {
      hideInMenu: true,
      requiredAuth: true,
    },
  },
  {
    path: "/basic/health/info",
    name: "基本健康信息",
    component: BasicHealthInfoView,
    meta: {
      hideInMenu: false,
      requiredAuth: true,
    },
  },
  {
    path: "/diet_info",
    name: "饮食信息",
    component: DietInfoView,
    meta: {
      hideInMenu: false,
      requiredAuth: true,
    },
  },
  {
    path: "/sport_info",
    name: "运动信息",
    component: SportInfoView,
    meta: {
      hideInMenu: false,
      requiredAuth: true,
    },
  },
  {
    path: "/message",
    name: "消息中心",
    meta: {
      hideInMenu: true,
      requiredAuth: true,
    },
    redirect: "/message/sys_message",
    children: [
      {
        path: "/message/sys_message",
        name: "系统消息",
        component: SysMessageView,
      },
      {
        path: "/message/setting",
        name: "消息设置",
        component: MessageSettingView,
      },
    ],
  },

  {
    path: "/admin",
    name: "管理员界面",
    component: AdminTool,
    meta: {
      access: ACCESS_NUM.ADMIN,
      hideInMenu: true,
      requiredAuth: true,
    },
  },

  {
    path: "/about",
    name: "关于我的",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      hideInMenu: false,
      requiredAuth: false,
    },
  },
];

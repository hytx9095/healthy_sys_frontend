<template>
  <a-layout-sider breakpoint="xl">
    <a-card style="">
      <icon-message />
      管理员界面
    </a-card>
    <a-menu
      :default-selected-keys="[selectKey]"
      :selected-keys="selectKey"
      :style="{ width: '100%' }"
      @menu-item-click="onClickMenuItem"
    >
      <a-menu-item key="user_manage">
        <IconCalendar></IconCalendar>
        用户管理
      </a-menu-item>
      <a-menu-item key="send_message">
        <icon-settings />
        发布消息
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const selectKey = ref("user_manage");

const onClickMenuItem = (key: string) => {
  router.push({
    path: "/admin/" + key,
  });
  selectKey.value = key;
};
const toAdminUserManage = async () => {
  selectKey.value = "user_manage";
  await router.push({
    path: "/admin/user_manage",
  });
};

const toAdminSendMessage = async () => {
  selectKey.value = "send_message";
  await router.push({
    path: "/admin/send_message",
  });
};
</script>
<style scoped></style>

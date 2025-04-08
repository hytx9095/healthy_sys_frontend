<template>
  <a-layout-sider breakpoint="xl">
    <a-card style="">
      <icon-message />
      消息中心
    </a-card>
    <a-menu :default-selected-keys="['sys_message']" :style="{ width: '100%' }">
      <a-menu-item key="sys_message" @click="toSysMessage">
        <IconCalendar></IconCalendar>
        系统通知
      </a-menu-item>
      <a-menu-item key="setting" @click="toMessageSetting">
        <icon-settings />
        消息设置
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const toSysMessage = async () => {
  await router.push({
    path: "/message/sys_message",
  });
};

const toMessageSetting = async () => {
  await router.push({
    path: "/message/setting",
  });
};
</script>
<style></style>

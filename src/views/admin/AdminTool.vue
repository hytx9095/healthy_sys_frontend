<template>
  <a-layout class="layout-admin">
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
    <AdminSendMessageView v-if="selectKey === 'send_message'" />
    <AdminUserManageView v-if="selectKey === 'user_manage'" />
  </a-layout>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import AdminViewSide from "@/components/AdminViewSide.vue";
import AdminSendMessageView from "@/views/admin/component/AdminSendMessageView.vue";
import AdminUserManageView from "@/views/admin/component/AdminUserManageView.vue";

const router = useRouter();
const selectKey = ref("user_manage");

const onClickMenuItem = (key: string) => {
  selectKey.value = key;
};
</script>
<style scoped>
.layout-admin {
  //width: 1200px; height: 620px; background: var(--color-fill-2); border: 1px solid var(--color-border);
}

.layout-admin :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}

.layout-admin :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}

.layout-admin :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout-admin :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}

.layout-admin :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}

.layout-admin :deep(.arco-layout-footer),
.layout-admin :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>

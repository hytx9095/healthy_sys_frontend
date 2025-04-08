<template>
  <a-layout>
    <a-layout-header style="padding-left: 20px"> 用户管理</a-layout-header>
    <a-card style="height: fit-content">
      <a-layout style="padding: 0 24px">
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-card>
  </a-layout>
</template>
<script>
import { defineComponent, ref } from "vue";
import MessageSide from "@/components/MessageSide.vue";
import { useRouter } from "vue-router";
import AdminViewSide from "@/components/AdminViewSide.vue";

const router = useRouter();

export default defineComponent({
  name: "SysMessageView",
});
</script>

<style scoped>
.layout-admin {
  height: 620px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
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

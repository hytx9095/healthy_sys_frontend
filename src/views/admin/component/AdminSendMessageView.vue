<template>
  <a-layout>
    <a-layout-header style="padding-left: 20px"> 发布消息</a-layout-header>
    <a-card style="height: fit-content">
      <a-form
        label-align="left"
        auto-label-width
        style="max-width: 480px; margin: 0 auto"
        :model="messageForm"
        @submit="handleSubmit"
      >
        <a-form-item label="消息内容:">
          <a-input
            v-model="messageForm.content"
            placeholder="填写发布内容"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">发送</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </a-layout>
</template>
<script setup lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import AdminViewSide from "@/components/AdminViewSide.vue";
import message from "@arco-design/web-vue/es/message";
import { MessageDTO } from "../../../../generated";
import { MessageAllControllerService } from "../../../../generated";

const router = useRouter();
const messageForm = reactive({
  userId: undefined,
  content: undefined,
} as MessageDTO);

const handleSubmit = async () => {
  const res = await MessageAllControllerService.sendMessageUsingPost(
    messageForm
  );
  if (res.code === 0) {
    message.success("发送成功");
  } else {
    message.error("发送失败，" + res.msg);
  }
};
</script>

<style scoped>
.layout-admin {
  //width: 1200px;
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

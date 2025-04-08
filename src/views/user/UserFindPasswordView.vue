<template>
  <div class="user-login">
    <h2>找回密码</h2>
    <a-form
      label-align="left"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="email" label="邮箱">
        <a-input v-model="form.email" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px"
          >发送邮件
        </a-button>
        <router-link to="/user/login" style="margin-left: 270px"
          >登录
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import {
  UserControllerService,
  LoginFormDTO,
  FindPasswordDTO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  email: "",
} as FindPasswordDTO);

const router = useRouter();

const store = useStore();
const handleSubmit = async () => {
  const res = await UserControllerService.findPasswordUsingPost(form);
  //登录成功，跳转到主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/home",
      replace: true,
    });
    window.localStorage.setItem("Authorization", res.data.token);
  } else {
    message.error("登录失败" + res.message);
  }
};
</script>

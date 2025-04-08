<template>
  <div class="user-login">
    <h2>用户登录</h2>
    <a-form
      label-align="left"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="password" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px"
          >登录
        </a-button>
        <router-link to="/user/findPassword" style="margin-left: 200px"
          >忘记密码
        </router-link>
        <router-link to="/user/register" style="margin-left: 10px"
          >注册
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, LoginFormDTO } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  userAccount: "",
  userPassword: "",
} as LoginFormDTO);

const router = useRouter();

const store = useStore();
const handleSubmit = async () => {
  const res = await UserControllerService.loginUsingPost(form);
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

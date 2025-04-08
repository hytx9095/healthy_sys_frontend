<template>
  <div class="user-login">
    <h2>用户注册</h2>
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
      <a-form-item field="password" tooltip="密码不少于8位" label="密码验证">
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px"
          >注册
        </a-button>
        <router-link to="/user/login" style="margin-left: 240px"
          >登录
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterDTO } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterDTO);

const router = useRouter();

const store = useStore();
const handleSubmit = async () => {
  const res = await UserControllerService.registerUsingPost(form);
  //登录成功，跳转到登录页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败" + res.message);
  }
};
</script>

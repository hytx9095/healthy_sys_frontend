<template>
  <a-card
    title="个人中心"
    style="width: 60%; margin-left: 20%; margin-top: 20px"
  >
    <a-form
      label-align="left"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item label="用户名:">
        <a-input
          v-model="form.username"
          :placeholder="store.state.user.loginUser.username"
        ></a-input>
      </a-form-item>
      <a-form-item label="头像:">
        <a-avatar>
          <img alt="avatar" :src="store.state.user.loginUser.userAvatar" />
        </a-avatar>
      </a-form-item>
      <a-row>
        <a-col :span="16">
          <a-form-item label="密码:">
            <a-input-item>*********</a-input-item>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item>
            <a-button type="text" @click="changePasswordDialog = true"
              >更改密码
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="邮箱:">
        <a-input
          v-model="form.email"
          :placeholder="store.state.user.loginUser.email"
        ></a-input>
      </a-form-item>
      <a-form-item label="电话号码:">
        <a-input
          v-model="form.telephone"
          :placeholder="store.state.user.loginUser.telephone"
        ></a-input>
      </a-form-item>
      <a-form-item label="角色:">
        {{ store.state.user.loginUser.role }}
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">修改</a-button>
      </a-form-item>
    </a-form>
  </a-card>

  <a-modal
    v-model:visible="changePasswordDialog"
    title="更改密码"
    @ok="changePassword"
    @cancel="changePasswordDialog = false"
  >
    <a-form :model="passwordForm">
      <a-form-item field="oldUserPassword" label="旧密码">
        <a-input
          v-model="passwordForm.oldUserPassword"
          placeholder="请输入旧密码"
        />
      </a-form-item>
      <a-form-item field="newUserPassword" label="新密码">
        <a-input
          v-model="passwordForm.newUserPassword"
          placeholder="请输入新密码"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {
  ChangeUserPasswordDTO,
  UserControllerService,
  UserUpdateDTO,
} from "../../../generated";
import { useStore } from "vuex";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import GlobalHeader from "@/components/GlobalHeader.vue";
import BasicLayout from "@/App.vue";

const router = useRouter();
const store = useStore();
const user = store.state.user.loginUser;
const changePasswordDialog = ref(false);

const form = reactive({
  username: undefined,
  email: undefined,
  telephone: undefined,
  userAvatar: undefined,
} as UserUpdateDTO);

const passwordForm = reactive({
  oldUserPassword: "",
  newUserPassword: "",
} as ChangeUserPasswordDTO);
const handleSubmit = async () => {
  const res = await UserControllerService.updateUserUsingPost(form);
  if (res.code === 0) {
    message.success("更新成功");
  } else {
    message.error("更新失败，" + res.msg);
  }
};

const changePassword = async () => {
  const res = await UserControllerService.changeUserPasswordUsingPost(
    passwordForm
  );
  if (res.code === 0) {
    message.success("更改密码成功");
  } else {
    message.error("更改密码失败，" + res.msg);
  }
  changePasswordDialog.value = false;
};
</script>

<style scoped></style>

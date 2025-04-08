<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/yuxi.png" />
            <div class="title">个人健康信息管理与智能建议系统</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="40px">
      <icon-message stroke-width="2" size="25px" @click="toMessage" />
    </a-col>
    <a-col flex="130px">
      <div>
        <a-dropdown>
          <a-avatar>
            <img alt="avatar" :src="store.state.user.loginUser.userAvatar" />
          </a-avatar>
          <template #content>
            <a-doption @click="toUserCenter">
              <icon-user />
              个人中心
            </a-doption>
            <a-doption @click="toAdmin">
              <icon-idcard />
              管理中心
            </a-doption>
            <a-doption @click="showLogoutDialog = true">
              <icon-export />
              退出登录
            </a-doption>
          </template>
        </a-dropdown>
        {{ store.state.user.loginUser?.username ?? "未登录" }}
      </div>
    </a-col>
  </a-row>

  <a-modal
    v-model:visible="showLogoutDialog"
    title="确认退出登录？"
    @ok="logout"
    @cancel="showLogoutDialog = false"
  >
    <p>您确定要退出登录吗？</p>
  </a-modal>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";

const router = useRouter();
const store = useStore();
const loginUser = store.state.user.loginUser;

// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    //根据权限过滤菜单
    if (!checkAccess(store.state.user.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

//默认显示首页
const selectedKeys = ref(["/home"]);
console.log(selectedKeys);

router.afterEach((to, from, failure) => {
  console.log(to);
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

const logout = async () => {
  window.localStorage.setItem("Authorization", "");
  await router.push({
    path: "/user/login",
  });
  showLogoutDialog.value = false;
};

const toUserCenter = async () => {
  await router.push({
    path: "/center",
  });
};

const toAdmin = async () => {
  await router.push({
    path: "/admin",
  });
};

const toMessage = async () => {
  await router.push({
    path: "/message/sys_message",
  });
};
let showLogoutDialog = ref(false);
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 48px;
}

.title {
  color: #444;
  margin-left: 16px;
}
</style>

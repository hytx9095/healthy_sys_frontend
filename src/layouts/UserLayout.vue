<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh; min-width: 100vw">
      <a-layout-header class="header">
        <!--        <GlobalHeader />-->
        <a-space>
          <img class="logo" src="../assets/yuxi.png" />
          <div>个人健康信息管理与智能建议系统</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <!--      <a-layout-footer class="footer">-->
      <!--        <a>程序员红a</a>-->
      <!--      </a-layout-footer>-->
    </a-layout>
  </div>
</template>

<style scoped>
.logo {
  height: 48px;
}

#userLayout {
  text-align: center;
}

#userLayout .header {
  box-shadow: #eee 1px 1px 5px;
  margin-bottom: 16px;
}

#userLayout .content {
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png");
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

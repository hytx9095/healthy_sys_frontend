<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh; min-width: 100vw">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <!--      <a-layout-footer class="footer">-->
      <!--        <a>程序员wr</a>-->
      <!--      </a-layout-footer>-->
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  box-shadow: #eee 1px 1px 5px;
  margin-bottom: 16px;
}

#basicLayout .content {
  background: url("../assets/background.png");
  //margin-top: 16px;
  //margin-bottom: 16px;
  padding: 20px 160px;
}

#basicLayout .footer {
  background: #efefef;
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

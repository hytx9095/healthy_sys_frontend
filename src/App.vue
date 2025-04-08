<template>
  <div id="app">
    <template v-if="router.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>
<style>
#app {
}
</style>

<script setup lang="ts">
import BasicLayout from "./layouts/BasicLayout.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRoute();
const doInit = () => {
  console.log("oh, no~");
};
onMounted(() => {
  doInit();
});
</script>

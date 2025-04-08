import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import router from "./router";
import store from "./store";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/dist/arco.css";
import "@/plufins/axios";
import "@/access/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App)
  .use(ElementPlus)
  .use(ArcoVue)
  .use(store)
  .use(router)
  .use(ArcoVueIcon)
  .mount("#app");

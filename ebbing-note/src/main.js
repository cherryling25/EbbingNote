import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

Vue.config.productionTip = false;

new Vue({
  router, //使用路由配置
  store,//使用 Vuex 进行状态管理
  render: h => h(App)
}).$mount("#app");

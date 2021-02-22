import {
  createApp
} from "vue";
// import Vue from 'vue';
import App from "./App.vue";
// import "./index.css";
import router from "./router";
import Axios from "axios";
import vueAxios from "vue-axios";

Axios.defaults.withCredentials = true;
Axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
Axios.defaults.timeout = 60000;
const app = createApp(App);

app.config.globalProperties.$axios = Axios;
// Vue.prototype.$axios  = axios;
// console.log(app)
// createApp(App)
  app.use(router,)
  app.use(vueAxios,Axios)
  // .mount("#app");
app.mount('#app');
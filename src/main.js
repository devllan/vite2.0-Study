import {
  createApp
} from "vue";
// import Vue from 'vue';
import App from "./App.vue";
// import "./index.css";
import router from "./router";
import Axios from "axios";
import vueAxios from "vue-axios";
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';


// var CryptoJS = require('crypto-js')
function encode(message, key) {
    var cipher = CryptoJS.AES.encrypt(message, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    //console.log(cipher.ciphertext.toString(CryptoJS.enc.Base64));    
    // return ciphertext.toString();//密码对象的Base64字符串
    //alert(cipher);
    return cipher.ciphertext.toString(CryptoJS.enc.Base64);
}

function decode(ciphertext, key, iv) {
    var decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    //console.log(cipher.ciphertext.toString(CryptoJS.enc.Base64));
    return decrypted.toString(CryptoJS.enc.Utf8);//WordArray对象转utf8字符串
}
var key = CryptoJS.enc.Utf8.parse('$jswf-kpt-1101%^');
var ciphertext = encode("你好", key);
var det = decode(ciphertext, key);
// Add a request interceptor   http request 拦截器
Axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config.url)
  if (config.url == '/DataManageCtrl/importDayData') {
    return config;
  } else {
    var data = config.data;
    if (data) {
      //data.push({token: Cookies.get('biwork_token')});
      data['token'] = Cookies.get('biwork_token');
    } else {
      data = {
        token: Cookies.get('biwork_token')
      };
    }
    config.data = data;
    //alert(JSON.stringify(config.data));
    var params = encode(JSON.stringify(config.data), key);
    config.data = {
      params: params,
      sign: '',
      timeStamp: new Date().getTime()
    };
    return config;
  }
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor  响应拦截器
Axios.interceptors.response.use(function (response) {
  // Do something with response data
  // 判断哪些接口不加密
  if (response.config.url == '/DataManageCtrl/importDayData') {
    return response;
  } else {
    if (response.config.responseType != "blob") {
      response.data = JSON.parse(decode(response.data.result, key));
    }
    return response;
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
// 确认登录状态
// router.beforeEach((to, from, next) => {
//   var biwork_token = Cookies.get('biwork_token');
//   let serUrl = location.href;
//   if (biwork_token) {
//     axios({
//       method: "post",
//       url: "",
//       data: {
//         token: biwork_token
//       }
//     }).then(res => {
//       if (res.data.state == '0') {
//         if (to.path == "/login") {
//           router.push({
//             path: "/home"
//           });
//         }
//       } else {
//         router.push({
//           path: "/login"
//         });
//       }
//     }).catch(error => {
//       if (to.path !== "/login") {
//         router.push({
//           path: "/login"
//         });
//       }
//     });
//   } else {
//     if (to.path != "/login") {
//       router.push({
//         path: "/login"
//       });
//     }
//   }
//   next();
// });

Axios.defaults.withCredentials = true;
Axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
Axios.defaults.timeout = 60000;
const app = createApp(App);

app.config.globalProperties.$axios = Axios;
app.config.globalProperties.$Cookies = Cookies;
// console.log(app)
// createApp(App)
app.use(router, )
app.use(vueAxios, Axios)
// .mount("#app");
app.mount('#app');
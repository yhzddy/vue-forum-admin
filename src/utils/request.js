import axios from "axios";
import { Message } from "element-ui";

//loading的实例
// let loadingInstance = Loading.service({
//   lock: true,
//   text: "Loading",
//   spinner: "el-icon-loading",
//   background: "rgba(0, 0, 0, 0.7)"
// });

//axios的基础配置
const BASEURL = process.env.VUE_APP_URL;

const service = axios.create({
  baseURL: BASEURL,
  timeout: 3000
});

/*请求接口前做些数据处理 */
//请求拦截器
service.interceptors.request.use(
  config => {
    // loadingInstance;
    //后台需要的相关参数
    //发送请求之前判断有无token
    //
    // if()
    config.headers.Authorization = window.localStorage.token;
    return config;
  },
  error => {
    //对请求错误做些什么
    Message({
      duration: 2000,
      showClose: true,
      message: "请求失败",
      type: "error"
    });
    return Promise.reject(error);
  }
);

//响应拦截器
// service.interceptors.response.use(
//   response => {
//     if (response.status === 200) {
//       let data = response.data;
//       return data;
//     }
//     if (response.status === 401) {
//       Message({
//         duration: 2000,
//         showClose: true,
//         type: "error",
//         message: "token过期"
//       });
//     }
//   },
//   error => {
//     return Promise.rejecet(error);
//   }
// );

export default service;

import axios from "axios";
import { Message, Loading } from "element-ui";

let loadingInstance = Loading.service({
  lock: true,
  text: "Loading",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.7)"
});

const service = axios.create({
  baseUrl: process.env.VUE_APP_URL,
  timeout: 3000
});

service.interceptors.request.use(
  config => {
    loadingInstance;
    //发送请求之前判断有无token
    // if()
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

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      let data = response.data;
      return data;
    }
    if (response.status === 401) {
    }
  },
  error => {
    return Promise.rejecet(error);
  }
);

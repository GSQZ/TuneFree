import { checkPlatform } from "@/utils/helper";
import { getCookie, isLogin } from "@/utils/auth";
import axios from "axios";

// 全局地址
if (checkPlatform.electron()) {
  axios.defaults.baseURL = "/api";
} else {
  axios.defaults.baseURL = import.meta.env["RENDERER_VITE_SERVER_URL"];
}

// 基础配置
axios.defaults.timeout = 15000;
axios.defaults.withCredentials = true;

// 请求拦截
axios.interceptors.request.use(
  (request) => {
    // 当请求的接口为特定地址时不附加cookie参数和realIP
    if (!request.url.startsWith('https://api.tunefree.fun/ncm/song/')) {
      if (!request.params) request.params = {};
      // 附加 cookie
      if (!request.noCookie && (isLogin() || getCookie("MUSIC_U") !== null)) {
        request.params.cookie = `MUSIC_U=${getCookie("MUSIC_U")}`;
        // 对于非 auth.sayqz.com 的请求，添加分号
        if (!request.url.startsWith('https://auth.sayqz.com')) {
          request.params.cookie += ';';
        }
      }
      // 附加 realIP
      if (!checkPlatform.electron()) request.params.realIP = "116.25.146.177";
    } else {
      // 对特定地址的请求，去除 cookie 和 realIP
      if (request.params && request.params.cookie) {
        delete request.params.cookie;
      }
      if (request.params && request.params.realIP) {
        delete request.params.realIP;
      }
    }
    
    // 去除 cookie
    if (request.noCookie) {
      request.params.noCookie = true;
    }
    
    // 发送请求
    return request;
  },
  (error) => {
    console.error("请求失败，请稍后重试");
    return Promise.reject(error);
  },
);

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    // 从错误对象中获取响应信息
    const response = error.response;
    // 断网处理
    if (!response) $canNotConnect(error);
    // 状态码处理
    switch (response?.status) {
      case 400:
        console.error("客户端错误：", response.status, response.statusText);
        // 执行客户端错误的处理逻辑
        break;
      case 401:
        console.error("未授权：", response.status, response.statusText);
        // 执行未授权的处理逻辑
        break;
      case 403:
        console.error("禁止访问：", response.status, response.statusText);
        // 执行禁止访问的处理逻辑
        break;
      case 404:
        console.error("未找到资源：", response.status, response.statusText);
        // 执行未找到资源的处理逻辑
        break;
      case 500:
        console.error("服务器错误：", response.status, response.statusText);
        // 执行服务器错误的处理逻辑
        break;
      default:
        // 处理其他状态码或错误条件
        console.error("未处理的错误：", error.message);
    }
    // 继续传递错误
    return Promise.reject(error);
  },
);

export default axios;

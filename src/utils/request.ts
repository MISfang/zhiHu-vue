// 先把axios库导进来
import axios from "axios";
import store from "../store";

const request = axios.create({
  // 请求基础路径
  baseURL: "http://apis.imooc.com/api",
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // 打开lodaing
  if (config.data instanceof FormData) {
    store.commit("setIsLoading", false);
  } else {
    store.commit("setIsLoading", true);
  }

  const token = store.state.token;

  // 把token加到请求头信息中
  if (token !== "") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 添加icode
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode: "90EB404D909C2DB2" };
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append("icode", "90EB404D909C2DB2");
  } else {
    // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: "90EB404D909C2DB2" };
  }

  store.commit("setError", { status: false, message: "" });

  // 对请求放行
  return config;
});

request.interceptors.response.use(
  (config) => {
    // 做些什么
    // 延时关闭loading
    setTimeout(() => {
      store.commit("setIsLoading", false);
    }, 500);
    // 对响应放行
    return config;
  },
  (e) => {
    const message = e.response.data.error;
    console.log(message);
    store.commit("setError", { status: true, message });
    store.commit("setIsLoading", false);
    return Promise.reject(message);
  }
);

// 导出基本方法
export default request;

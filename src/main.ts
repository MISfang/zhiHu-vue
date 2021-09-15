import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "axios";

axios.defaults.baseURL = "http://apis.imooc.com/api";
axios.interceptors.request.use((config) => {
  store.commit("setLoading", true);
  store.commit("setError", { status: false, message: "" });

  config.params = { ...config.params, icode: "E71FE6030F4F99B3" };
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append("icode", "E71FE6030F4F99B3");
  } else {
    // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: "E71FE6030F4F99B3" };
  }

  return config;
});

axios.interceptors.response.use(
  (config) => {
    setTimeout(() => {
      store.commit("setLoading", false);
    }, 1000);
    return config;
  },
  (e) => {
    const { error } = e.response.data;
    store.commit("setError", { status: true, message: error });
    store.commit("setLoading", false);
    return Promise.reject(e.response.data);
  }
);

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");

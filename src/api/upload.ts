// 先导入基础方法
import request from "../utils/request";

// 封装对应api
// 登录的方法
export const upLoad = (formData: FormData) => {
  return request({
    method: "POST",
    url: "/upload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

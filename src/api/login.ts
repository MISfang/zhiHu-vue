// 先导入基础方法
import request from "../utils/request";

// 封装对应api
// 登录的方法
export const Login = (params: Record<string, unknown>) => {
  return request({
    method: "POST",
    url: "/user/login",
    data: params,
  });
};

export const fetchUserData = () => {
  return request({
    method: "GET",
    url: "/user/current",
  });
};

// 注册用户的api
export const NewUser = (params: Record<string, unknown>) => {
  return request({
    method: "POST",
    url: "/users",
    data: params,
  });
};

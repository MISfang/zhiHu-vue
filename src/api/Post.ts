// 先导入基础方法
import request from "../utils/request";

// 封装对应api
// 登录的方法
export const newPostF = (newPost: Record<string, unknown>) => {
  return request({
    method: "POST",
    url: "/posts",
    data: newPost,
  });
};

export const getPostDetail = (ID: string | string[]) => {
  return request({
    method: "GET",
    url: `/posts/${ID}`,
  });
};

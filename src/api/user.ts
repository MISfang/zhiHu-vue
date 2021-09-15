// 先导入基础方法
import request from "../utils/request";

// 封装对应api
// 获取专栏列表的api
export const getColumns = () => {
  return request({
    method: "GET",
    url: "/columns",
  });
};

// 获取id对应单个专栏的api
export const getColumn = (cid: string) => {
  return request({
    method: "GET",
    url: `/columns/${cid}`,
  });
};

// 获取单个文章具体的信息的api
export const getPost = (cid: string) => {
  return request({
    method: "GET",
    url: `/columns/${cid}/posts`,
  });
};

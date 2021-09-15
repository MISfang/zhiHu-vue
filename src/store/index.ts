import { createStore } from "vuex";
import { getColumns, getColumn, getPost } from "../api/user";
import { Login, fetchUserData } from "../api/login";
import { newPostF } from "@/api/Post";
import axios from "axios";

export interface userProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  desciption?: string;
  avatar?: Record<string, unknown>;
}

// 图片类型;
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

// 文字列表单个类型
export interface ColumProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

// 文字详情数据类型
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | userProps;
  isHTML?: boolean;
}

export interface GlobalDataProps {
  token: string;
  isLoading: boolean;
  column: ColumProps[];
  posts: PostProps[];
  user: userProps;
  error: {
    status?: boolean;
    message?: string;
  };
  imgId?: string;
}

export default createStore<GlobalDataProps>({
  state: {
    // 全局的数据
    // 用户令牌、
    token: localStorage.getItem("userToken") || "",
    // 全局的loading是否加载
    isLoading: false,
    column: [],
    posts: [],

    // 登录用户信息
    user: {
      isLogin: false,
    },

    // 全局的出错时候的信息
    error: {
      status: false,
      message: "",
    },

    // 上传的图片信息
    imgId: "",
  },
  getters: {
    resColum: (state) => (currentId: string) => {
      return state.column.find((item) => item._id === currentId);
    },
    resList: (state) => (currentId: string) => {
      return state.posts.filter((item) => item.column === currentId);
    },
  },

  // 同步提交
  mutations: {
    // 设置loading的开关
    setIsLoading(state, status) {
      state.isLoading = status;
    },

    // 第一个登陆的提交
    onLogin(state, res) {
      state.token = res;
    },

    // 获取专栏列表的commit
    fetchColumns(state, resDataList) {
      state.column = resDataList;
    },

    fetchColumn(state, resData) {
      state.column = [resData];
    },
    fetchPost(state, resData) {
      state.posts = resData;
    },

    // 获取当前登录用户的信息
    onfetchUserData(state, resData) {
      state.user = { isLogin: true, ...resData };
    },

    // 设置请求错误信息
    setError(state, res) {
      state.error = res;
    },

    // 退出登录的方法
    logout(state) {
      state.token = "";
      localStorage.clear();
      delete axios.defaults.headers.common.Authorization;
    },
    // 设置图片地址
    setImgUrl(state, imgId) {
      state.imgId = imgId;
    },
  },

  // 异步提交
  actions: {
    async fetchColumns({ commit }) {
      const { data } = await getColumns();
      const resData = data.data.list;
      commit("fetchColumns", resData);
    },

    async fetchColumn({ commit }, cid) {
      const { data } = await getColumn(cid);
      const resData = data.data;
      commit("fetchColumn", resData);
    },
    async fetchPost({ commit }, cid) {
      const { data } = await getPost(cid);
      const resData = data.data.list;
      commit("fetchPost", resData);
    },
    async onLogin({ commit }, payload) {
      const { data } = await Login(payload);
      const res = data.data.token;
      commit("onLogin", res);
      localStorage.setItem("userToken", res);
    },

    // 拿到token以后，获取当前登录用户信息
    async onfetchUserData({ commit }) {
      const { data } = await fetchUserData();
      const resData = data.data;
      commit("onfetchUserData", resData);
      return resData;
    },

    // 把登录，拿到用户信息组合成一个
    async loginAndFetch({ dispatch }, payLoad) {
      await dispatch("onLogin", payLoad);
      await dispatch("onfetchUserData");
      return true;
    },

    // 新建文章的处理方法
    async createPost({ commit }, newPost) {
      const { data } = await newPostF(newPost);
      console.log("新建文章上传", data);
      return data;
    },
  },
  modules: {},
});

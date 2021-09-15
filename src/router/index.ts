import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import axios from "axios";
import createMessage from "@/Fcomponents/creatMessage";

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/home.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue"),
      meta: { redireactAlreadyLogin: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/signUp.vue"),
      meta: { redireactAlreadyLogin: true },
    },
    {
      path: "/column/:id",
      name: "column",
      component: () => import("../views/ColumDetail.vue"),
    },
    {
      path: "/update",
      name: "update",
      component: () => import("../views/CreatePost.vue"),
      meta: { requiredLogin: true },
    },
    {
      path: "/postdetail/:postId",
      name: "postdetail",
      component: () => import("../views/postDetail.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { user, token } = store.state;
  const { requiredLogin, redireactAlreadyLogin } = to.meta;

  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      store
        .dispatch("onfetchUserData")
        .then(() => {
          if (redireactAlreadyLogin) {
            next("/");
          } else {
            next();
          }
        })
        .catch(() => {
          store.commit("logout");
          createMessage(
            `登录失效
          两秒后跳转到登录页面`,
            "warning",
            2000,
            false
          );
          setTimeout(() => {
            next("login");
          }, 2000);
        });
    } else {
      if (requiredLogin) {
        next("/login");
      } else {
        next();
      }
    }
  } else {
    if (redireactAlreadyLogin) {
      next("/");
    } else {
      next();
    }
  }
  // console.log(to.meta);
  // if (to.meta.requiredLogin && !store.state.user.isLogin) {
  //   next({ name: "login" });
  // } else if (to.meta.redireactAlreadyLogin && store.state.user.isLogin) {
  //   next({ name: "home" });
  // } else {
  //   next();
  // }
});

export default router;

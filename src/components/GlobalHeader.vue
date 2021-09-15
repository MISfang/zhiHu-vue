<template>
  <nav class="navbar navbar-dark bg-success my-nav">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="../assets/logo.jpg" class="rounded-circle logo" />
        宇龙专栏
      </router-link>

      <!-- 右边的部分 -->
      <!-- 未登录的话 -->
      <div class="d-flex" v-if="!userData.isLogin">
        <button class="btn btn-outline-light my-btn" type="submit">
          <router-link class="link-text" to="/login">登录</router-link>
        </button>
        <button class="btn btn-outline-light my-btn" type="submit">
          <router-link class="link-text" to="/signup">注册</router-link>
        </button>
      </div>

      <!-- 已经登录的话 -->
      <form class="d-flex" v-else>
        <!-- 下拉菜单组件 -->
        <input
          class="form-control me-3"
          type="search"
          placeholder="搜素文章"
          aria-label="Search"
        />
        <dropdown :title="`你好啊! ${userData.nickName}`">
          <drop-down-item @click="toUpdate">新建文章</drop-down-item>
          <drop-down-item>编辑资料</drop-down-item>
          <drop-down-item @click="signOut">退出登录</drop-down-item>
        </dropdown>
      </form>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Dropdown from "@/use-component/Dropdown.vue";
import DropDownItem from "@/use-component/DropDownItem.vue";
import { GlobalDataProps } from "../store";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import router from "@/router";

export default defineComponent({
  name: "GlobalHeader",
  components: {
    Dropdown,
    DropDownItem,
  },
  props: {},
  setup() {
    const route = useRouter();
    const store = useStore<GlobalDataProps>();

    const userData = computed(() => store.state.user);
    // 新建文章跳转路由的方法
    const toUpdate = () => {
      route.push("/update");
    };
    const signOut = () => {
      localStorage.clear();
      location.reload();
    };

    return {
      toUpdate,
      userData,
      signOut,
    };
  },
});
</script>

<style scoped lang="less">
.logo {
  width: 50px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  margin-right: -10px;
}
.my-nav {
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.6);
  .my-btn {
    padding: 5px 15px;
    width: 150px;
    border-radius: 25px;
    margin: 0 5px;
    letter-spacing: 4px;
    font-size: 24px;
    .link-text {
      color: white;
      text-decoration: none;
    }
  }
  .my-btn:hover {
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.4);
    .link-text {
      color: #198754;
    }
  }
}
.navbar-brand {
  font-size: 36px;
}
</style>

<template>
  <global-header></global-header>
  <div class="placeholder1"></div>
  <div class="container">
    <!-- <error-message
      v-if="error && error.status"
      type="danger"
      :message="error && error.message"
    ></error-message> -->
    <!-- 路由站位符号 -->
    <router-view></router-view>
  </div>
  <!-- 加载loading -->
  <loading>正在处理，请稍等...</loading>
  <!-- 页脚 -->
  <Footer></Footer>
  <!-- 下面的背景 -->
  <div class="bg-container">
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  </div>
  <div class="placeholder"></div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import GlobalHeader from "./components/GlobalHeader.vue";
import Footer from "@/components/footer.vue";
import Loading from "@/components/Loading.vue";
// import errorMessage from "@/components/errorMessage.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "./store";
import creatMessage from "@/Fcomponents/creatMessage";

// 下面是导入的一系列样式
import "./css/bg.css";
import "./css/bg-color.css";
import "./css/stylesheet.css";

// 导入bootstrap样式
import "bootstrap/dist/css/bootstrap.min.css";

export default defineComponent({
  name: "APP",
  components: {
    GlobalHeader,
    Footer,
    Loading,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const current = computed(() => store.state.user);
    const token = computed(() => store.state.token);

    const error = computed(() => store.state.error);
    watch(
      () => error.value.status,
      () => {
        const { message, status } = error.value;
        if (status && message) {
          creatMessage(message, "danger", 2000, true);
        }
      }
    );
    return {
      error,
    };
  },
});
</script>

<style lang="less" scoped>
body {
  font-family: "HYHeiLiZhiTiJ";
}
.placeholder1 {
  width: 100%;
  height: 90px;
}
.bg-container {
  position: fixed;
  bottom: 100px;
  z-index: -1;
}
.placeholder {
  width: 100%;
  height: 102px;
  background-color: white;
  position: fixed;
  bottom: 0;
  z-index: -1;
}
</style>

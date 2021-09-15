<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/update" class="btn btn-success btn-lg my-2 my-btn"
              >开始写文章</router-link
            >
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center my-h4">发现精彩 ↓</h4>
    <!-- 文章列表组件 -->
    <colum-list :dataList="list"></colum-list>

    <button class="btn btn-outline-success more-btn mt-2 mb-5 btn-block w-25">
      加载更多
    </button>
    <div class="ph"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import ColumList from "../components/ColumList.vue";
import { GlobalDataProps } from "../store";
import { useStore } from "vuex";
export default defineComponent({
  name: "Home",
  components: {
    ColumList,
  },
  setup() {
    const store = useStore<GlobalDataProps>();

    // 挂载组件的钩子函数
    onMounted(() => {
      store.dispatch("fetchColumns");
    });

    const list = computed(() => store.state.column);

    return {
      list,
    };
  },
});
</script>

<style lang="less" scoped>
.ph {
  width: 100%;
  height: 40px;
}
.my-btn {
  border-radius: 25px;
  width: 180px;
  height: 50px;
  font-size: 24px;
}
.my-h4 {
  margin-top: -50px;
  font-size: 48px;
}
.more-btn {
  margin-left: 35%;
  margin-top: 100px;
  font-size: 24px;
  letter-spacing: 4px;
}
</style>

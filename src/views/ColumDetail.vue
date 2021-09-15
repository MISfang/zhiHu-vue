<template>
  <div class="column-detail-page w-75 mx-auto list">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center author-card"
      v-if="colum"
    >
      <div class="col-3 text-center">
        <img
          :src="colum.avatar.url"
          :alt="colum.title"
          class="rounded-circle border w-50 my-image-shadow"
        />
      </div>
      <div class="col-9">
        <h4 class="title">{{ colum.title }}</h4>
        <p class="text-muted description">{{ colum.description }}</p>
      </div>
    </div>

    <!-- 下面的文章列表 -->
    <post-list :posts="lists"></post-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import postList from "../components/postList.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store";

export default defineComponent({
  components: { postList },
  name: "Column",
  setup() {
    // 导入route和store两个对象
    const route = useRoute();
    const store = useStore<GlobalDataProps>();

    // 初始化页面
    const currentId = route.params.id;
    onMounted(() => {
      // 获取route中的路径参数
      store.dispatch("fetchColumn", currentId);
      store.dispatch("fetchPost", currentId);
    });

    // 从全局store中加载数据
    const colum = computed(() => store.getters.resColum(currentId));
    const lists = computed(() => store.getters.resList(currentId));

    return {
      colum,
      // 具体数据 是个数组
      lists,
    };
  },
});
</script>

<style scoped lang="less">
.list {
  margin-top: 40px;
  margin-bottom: 100px;
  .author-card {
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(100px);
    border-radius: 50px;
    padding: 20px 0;
  }
  .title {
    font-size: 32px;
    color: black;
  }
  .description {
    font-size: 24px !important;
    color: black !important;
  }
}
</style>

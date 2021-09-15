<template>
  <!-- loading加载 -->
  <div class="loading" v-if="isLoading">
    <AtomSpinner
      :animation-duration="1000"
      :size="200"
      :color="'#ff1d5e'"
      class="loading-icon"
    />
    <h1 class="text"><slot>正在加载中...</slot></h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { AtomSpinner } from "epic-spinners";

export default defineComponent({
  name: "Loading",
  components: {
    AtomSpinner,
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.state.isLoading);

    return { isLoading };
  },
});
</script>

<style scoped lang="less">
// 加载动画
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    color: #ff1d5e;
  }
}
</style>

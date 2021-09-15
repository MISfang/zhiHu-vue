<template>
  <footer class="text-center py-2 text-secondary bg-success mt-6 my-f">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item footer-text">@2021 宇龙专栏</li>
        <li class="list-inline-item footer-text">课程</li>
        <li class="list-inline-item footer-text">文档</li>
        <li class="list-inline-item footer-text">联系</li>
        <li class="list-inline-item footer-text">更多</li>
      </ul>
    </small>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  setup() {
    return {};
  },
});
</script>

<style scoped>
.footer-text {
  font-size: 20px;
  color: white;
  margin: 0 10px;
  letter-spacing: 2px;
}
.my-f {
  position: fixed;
  bottom: -8px;
  left: 0;
  right: 0;
  box-shadow: 0px -10px 10px rgba(75, 75, 75, 0.5);
}
</style>

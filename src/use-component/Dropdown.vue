<template>
  <div class="dropdown" ref="dropdown">
    <button
      class="btn btn-outline-light dropdown-toggle my-drop"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      @click.prevent="taggleOpen"
    >
      {{ title }}
    </button>
    <ul
      class="dropdown-menu bg-success my-ul"
      :style="{ display: 'block' }"
      aria-labelledby="dropdownMenuButton1"
      v-if="isOpen"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import useClickOutSide from "../utils/useClickOutSide";

export default defineComponent({
  name: "DropDown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const taggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    // 处理其他区域点击关闭事件
    // 获取dropdown对应的dom节点
    const dropdown = ref<null | HTMLElement>(null);
    const isClickOutSide = useClickOutSide(dropdown);
    watch(isClickOutSide, () => {
      if (isOpen.value && isClickOutSide.value) {
        isOpen.value = false;
      }
    });

    return {
      isOpen,
      taggleOpen,
      dropdown,
    };
  },
});
</script>

<style scoped lang="less">
.my-drop {
  width: 240px;
  border-radius: 20px;
  font-size: 18px;
}
.my-ul {
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4);
}
.dropdown-menu {
  width: 240px;
  border-radius: 20px;
  color: white;
}
</style>

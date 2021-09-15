<template>
  <li :class="{ disabled: disabled }">
    <a class="dropdown-item">
      <slot></slot>
    </a>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DropDownItem",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
.disabled {
  color: white;
  pointer-events: none;
  background-color: #6c757d;
}
.dropdown-item {
  color: white;
  font-size: 16px;
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid white;
}
</style>

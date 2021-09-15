<template>
  <div>
    <!-- 用传送门传送到message节点 -->
    <teleport to="#message">
      <div
        v-if="isShow"
        class="alert fixed-top w-50 d-flex justify-content-between mt-5 mx-auto fade show"
        :class="classObject"
        role="alert"
      >
        <span class="text">{{ message }}</span>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click.prevent="hide"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
export type MessageType =
  | "success"
  | "warning"
  | "info"
  | "secondary"
  | "danger"
  | "light"
  | "dark";

export default defineComponent({
  name: "errorAlert",
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: "dark",
    },
    isShake: Boolean,
  },
  setup(props, context) {
    const node = document.createElement("div");
    node.id = "message";
    document.body.appendChild(node);

    // 是否显示的flag
    const isShow = ref(true);
    const classObject = {
      "alert-success": props.type === "success",
      "alert-warning": props.type === "warning",
      "alert-info": props.type === "info",
      "alert-secondary": props.type === "secondary",
      "alert-danger": props.type === "danger",
      "alert-light": props.type === "light",
      "alert-dark": props.type === "dark",

      // 动画
      animate__animated: props.isShake,
      animate__shakeX: props.isShake,
    };
    const hide = () => {
      isShow.value = false;
      context.emit("close-message", true);
    };
    return {
      isShow,
      classObject,
      hide,
    };
  },
});
</script>

<style scoped lang="less">
.text {
  font-size: 24px;
}
</style>

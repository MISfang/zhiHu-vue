<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="FormSubmit">
      <!-- 提交按钮 -->
      <slot name="submit" class="my-btn"> </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
// 使用第三方外部的库
import mitt from "mitt";

export const emitter = mitt();
type ValidateFunc = () => boolean;

export default defineComponent({
  name: "ValidateForm",
  emits: ["form-submit"],
  setup(props, context) {
    // 点击提交的方法
    const FormSubmit = () => {
      const res = funcArr.map((func) => func()).every((res) => res);
      context.emit("form-submit", res);
    };

    let funcArr: ValidateFunc[] = [];
    const callback = (func: ValidateFunc | undefined) => {
      funcArr.push(func as ValidateFunc);
    };

    emitter.on("form-item-created", callback);

    onUnmounted(() => {
      emitter.off("form-item-created", callback);
      funcArr = [];
    });
    return {
      FormSubmit,
    };
  },
});
</script>

<style scoped>
.my-btn {
  position: absolute;
  bottom: 0;
}
</style>

<template>
  <div
    class="validate-input-container pb-3"
    :class="{
      animate__animated: inputRef.isShake,
      animate__tada: inputRef.isShake,
    }"
  >
    <input
      v-if="tag === 'input'"
      type="text"
      class="form-control"
      :class="inputRef.error ? 'is-invalid' : 'is-valid'"
      :value="inputRef.val"
      @input="updateValue"
      @blur="validateInput"
      v-bind="$attrs"
    />
    <textarea
      v-else-if="tag === 'textarea'"
      type="text"
      class="form-control"
      :class="inputRef.error ? 'is-invalid' : 'is-valid'"
      :value="inputRef.val"
      @input="updateValue"
      @blur="validateInput"
      v-bind="$attrs"
    ></textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, onMounted } from "vue";
import { emitter } from "../components/ValidateForm.vue";
const emailReg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;

interface RuleProp {
  type:
    | "required"
    | "email"
    | "rangeMin"
    | "rangeMax"
    | "nickNameMin"
    | "nickNameMax"
    | "custom";
  message: string;
  length: number;
  validator?: () => boolean;
}
export type RulesProp = RuleProp[];
export type TagType = "input" | "textarea";

export default defineComponent({
  name: "ValidateItem",
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: "input",
    },
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || "",
      error: false,
      message: "",
      isShake: false,
    });

    // 验证邮箱方法
    const validateInput2 = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;
            case "rangeMin":
              passed = inputRef.val.length >= rule.length;
              break;
            case "rangeMax":
              passed = inputRef.val.length <= rule.length;
              break;
            case "nickNameMin":
              passed = inputRef.val.length >= rule.length;
              break;
            case "nickNameMax":
              passed = inputRef.val.length <= rule.length;
              break;
            case "custom":
              passed = rule.validator ? rule.validator() : true;
              break;
          }
          return passed;
        });
        // 取反
        inputRef.error = !allPassed;
        inputRef.isShake = !allPassed;
        return allPassed;
      }
      return true;
    };

    const validateInput = () => {
      const res = validateInput2();
      setTimeout(() => {
        inputRef.isShake = false;
      }, 1000);
      return res;
    };

    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });
    // 输入框更新方法
    const updateValue = (E: KeyboardEvent) => {
      const targetValue = (E.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit("update:modelValue", targetValue);
    };

    return {
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>

<style scoped>
.validate-input-container {
  height: 78.8px;
  margin: -6px 0;
}
</style>

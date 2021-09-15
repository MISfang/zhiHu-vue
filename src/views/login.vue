<template>
  <div class="login-page mx-auto p-3 login-container">
    <h1 class="my-3 text-center title">登录到宇龙专栏</h1>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">电子邮箱:</label>
        <validate-item
          :rules="emailRules"
          v-model="email"
          type="text"
          placeholder="请输入邮箱"
        ></validate-item>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">用户密码:</label>
        <validate-item
          :rules="passwordRules"
          type="password"
          placeholder="请输入密码"
          v-model="password"
        ></validate-item>
      </div>
      <template #submit>
        <button type="submit" class="btn btn-success my-btn">登录</button>
      </template>
    </validate-form>
    <div class="ph"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from "vue";
import ValidateItem, { RulesProp } from "@/use-component/ValidateItem.vue";
import ValidateForm from "@/components/ValidateForm.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import createMessage from "@/Fcomponents/creatMessage";

export default defineComponent({
  name: "Login",
  components: {
    ValidateItem,
    ValidateForm,
  },
  setup() {
    const route = useRouter();
    const store = useStore();

    const inputdata = toRefs(
      reactive({
        email: "111@test.com",
        password: "111111",
      })
    );
    const emailRules: RulesProp = [
      { type: "required", message: "邮箱不能为空", length: 0 },
      { type: "email", message: "请输入格式正确的邮箱", length: 0 },
    ];

    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空", length: 0 },
      {
        type: "rangeMin",
        message: "你的密码至少包括六位，不能含有空格",
        length: 6,
      },
      {
        type: "rangeMax",
        message: "你的密码最多有12位",
        length: 12,
      },
    ];

    // 表单传值，监听结果
    const onFormSubmit = (res: boolean) => {
      if (res) {
        const payload = {
          email: inputdata.email.value,
          password: inputdata.password.value,
        };
        store.dispatch("loginAndFetch", payload).then((res) => {
          createMessage("登录成功，2秒后跳转首页", "success", 1800, false);
          setTimeout(() => {
            route.push("/");
          }, 2000);
        });
      }
    };

    return {
      emailRules,
      passwordRules,
      ...inputdata,
      onFormSubmit,
    };
  },
});
</script>

<style lang="less">
.title {
  color: #198754;
}
.login-container {
  width: 450px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50px;
  backdrop-filter: blur(120px);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.4);
  margin-top: 40px;
  .my-btn {
    border-radius: 20px;
    width: 250px;
    margin-left: 80px;
  }
  .ph {
    width: 100%;
    height: 15px;
  }
}
</style>

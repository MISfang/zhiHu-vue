<template>
  <div class="login-page mx-auto p-3 login-container">
    <h1 class="my-3 text-center title">注 册 页 面</h1>
    <!-- 下面的表单 -->
    <validate-form @form-submit="onFormSubmit">
      <div class="mb">
        <label class="form-label">电子邮箱:</label>
        <validate-item
          :rules="emailRules"
          v-model="email"
          type="text"
          placeholder="请输入邮箱"
        ></validate-item>
      </div>
      <div class="mb">
        <label class="form-label">用户昵称:</label>
        <validate-item
          :rules="nickNameRules"
          v-model="nickName"
          type="text"
          placeholder="请输入用户昵称"
        ></validate-item>
      </div>
      <div class="mb">
        <label class="form-label">用户密码:</label>
        <validate-item
          :rules="passwordRules"
          type="password"
          placeholder="请输入密码"
          v-model="password"
        ></validate-item>
      </div>
      <div class="mb">
        <label class="form-label">重复密码:</label>
        <validate-item
          :rules="repeatPasswordRules"
          type="password"
          placeholder="请确认密码"
          v-model="repeatPassword"
        ></validate-item>
      </div>
      <template #submit>
        <button type="submit" class="btn btn-success my-btn">注册</button>
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
import createMessage from "@/Fcomponents/creatMessage";
import { NewUser } from "@/api/login";

export default defineComponent({
  name: "Login",
  components: {
    ValidateItem,
    ValidateForm,
  },
  setup() {
    const route = useRouter();

    const inputdata = toRefs(
      reactive({
        email: "111@test.com",
        nickName: "",
        password: "111111",
        repeatPassword: "111111",
      })
    );
    const emailRules: RulesProp = [
      { type: "required", message: "邮箱不能为空", length: 0 },
      { type: "email", message: "请输入格式正确的邮箱", length: 0 },
    ];

    const nickNameRules: RulesProp = [
      { type: "required", message: "昵称不能不能为空", length: 0 },
      {
        type: "nickNameMin",
        message: "你的用户名至少包括三位，不能含有空格",
        length: 3,
      },
      {
        type: "nickNameMax",
        message: "你的用户名至多包括十位，不能含有空格",
        length: 10,
      },
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

    const repeatPasswordRules: RulesProp = [
      { type: "required", message: "密码不能为空", length: 0 },
      {
        type: "custom",
        validator: () => {
          return inputdata.password.value === inputdata.repeatPassword.value;
        },
        message: "两次密码不相同!",
        length: 0,
      },
    ];
    // 表单传值，监听结果
    const onFormSubmit = (res: boolean) => {
      if (res) {
        const payload = {
          email: inputdata.email.value,
          password: inputdata.password.value,
          nickName: inputdata.password.value,
        };

        const newUser = async () => {
          const { data } = await NewUser(payload);
          if (data.msg === "请求成功") {
            createMessage("注册成功，两秒跳转登录页面", "success", 2000, false);
            setTimeout(() => {
              route.push("/login");
            });
          }
        };
        newUser();
      }
    };
    return {
      emailRules,
      passwordRules,
      nickNameRules,
      repeatPasswordRules,
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
    height: 10px;
  }
}
.mb {
  margin-bottom: -15px;
}
</style>

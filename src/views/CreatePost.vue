<template>
  <div class="create-post-page">
    <h1 class="title">新建文章</h1>

    <validate-form class="w-75 mx-auto mt-5" @form-submit="onFormSubmit">
      <!-- 上传组件 -->
      <up-loadbtn :beforeUpLoad="upLoadCheck" class="upload">
        <template #loading class="loading">
          <flower-spinner
            :animation-duration="1500"
            :size="120"
            color="#007bff"
          />
          <h3>正在上传...</h3>
        </template>
        <template #success="dataProps">
          <img :src="dataProps.upLoadData.data.url" width="486" class="img" />
        </template>
      </up-loadbtn>

      <div class="">
        <label class="form-label">文章标题：</label>
        <validate-item
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="">
        <label class="form-label">文章详情：</label>
        <validate-item
          rows="9"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
          class="textarea"
        />
      </div>
      <template #submit>
        <button class="btn btn-success btn-large my-btn">
          {{ isEditMode ? "更新文章" : "发表文章" }}
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { GlobalDataProps, PostProps } from "../store";
import ValidateItem, { RulesProp } from "../use-component/ValidateItem.vue";
import ValidateForm from "../components/ValidateForm.vue";
import upLoadbtn from "@/components/upLoadbtn.vue";
import createMessage from "@/Fcomponents/creatMessage";
import { FlowerSpinner } from "epic-spinners";
import { beforeUploadCheck, Condition } from "@/utils/checkFile";

export default defineComponent({
  name: "CreatePost",
  components: {
    ValidateItem,
    ValidateForm,
    upLoadbtn,
    FlowerSpinner,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore<GlobalDataProps>();
    // 导入基本的三基佬

    const uploadedData = ref();
    const titleVal = ref("");
    const isEditMode = !!route.query.id;
    const contentVal = ref("");

    const titleRules: RulesProp = [
      { type: "required", message: "文章标题不能为空", length: 0 },
    ];
    const contentRules: RulesProp = [
      { type: "required", message: "文章详情不能为空", length: 0 },
    ];

    // 导入图片路径
    const imgId = computed(() => store.state.imgId);
    const onFormSubmit = (res: boolean) => {
      if (res) {
        const { column, _id } = store.state.user;
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            author: _id,
            column,
          };
          if (imgId.value !== "") {
            newPost.image = imgId.value;
          }
          store.dispatch("createPost", newPost).then((res) => {
            if (res.msg === "请求成功") {
              createMessage(
                "文章发表成功 2秒后跳转回专栏",
                "success",
                2000,
                false
              );
              setTimeout(() => {
                // 跳转回首页
                router.push({ name: "column", params: { id: column } });
              }, 2000);
            }
          });
        }
      }
    };
    const condition: Condition = {
      format: ["image/jpeg", "image/png"],
      size: 10,
    };
    const upLoadCheck = (file: File) => {
      const res = beforeUploadCheck(file, condition);
      const { isPassed, ErrorMessage } = res;
      if (ErrorMessage !== "") {
        createMessage(ErrorMessage, "danger", 2000, true);
      }
      return isPassed;
    };
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      uploadedData,
      isEditMode,
      onFormSubmit,
      upLoadCheck,
    };
  },
});
</script>

<style lang="less" scoped>
.title {
  width: 220px;
  text-align: center;
  padding: 10px;
  font-size: 48px;
  color: white;
  margin: 20px 0 20px 550px;
  border: 3px solid #198754;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 20px;
}
.my-btn {
  width: 150px;
  height: 50px;
  border-radius: 40px;
  font-size: 24px;
  margin-left: 400px;
  margin-top: 180px;
  margin-bottom: 200px;
}
.upload {
  // cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.4);
  width: 100%;
  // height: 200px;
  box-shadow: 5px 10px 30px rgba(0, 0, 0, 0.4);
  object-fit: cover;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.img {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.6);
  margin: 10px 0 15px;
}
.textarea {
  resize: none;
}
</style>

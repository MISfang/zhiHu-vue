<template>
  <div>
    <div class="file-upload-container" @click.prevent="triggerUpLoad">
      <slot name="loading" v-if="fileStatus === 'loading'"></slot>
      <slot
        name="success"
        v-else-if="fileStatus === 'success'"
        :upLoadData="upLoadData"
        class="loading"
      >
      </slot>
      <slot name="error" v-else-if="fileStatus === 'error'">
        <button class="btn btn-primary">
          上传失败
        </button>
      </slot>
      <slot name="default" v-else-if="fileStatus === 'ready'">
        <div class="my-btn">
          <div>
            上传图片
          </div>
          <div class="small-tittle">(点击即可上传)</div>
          <div class="small-tittle">(再次点击 重新上传)</div>
        </div>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="inputFile"
      placeholder="上传文件"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { upLoad } from "@/api/upload";

import createMessage from "@/Fcomponents/creatMessage";
import { useStore } from "vuex";

type upLoadStatus = "ready" | "success" | "error" | "loading";
// 支持用户传入的检查函数
type checkFunction = (file: File) => boolean;

export default defineComponent({
  name: "upLoad",
  props: {
    beforeUpLoad: {
      type: Function as PropType<checkFunction>,
    },
  },
  setup(props) {
    const store = useStore();
    const inputFile = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<upLoadStatus>("ready");

    const upLoadData = ref();

    const triggerUpLoad = () => {
      if (inputFile.value) {
        inputFile.value.click();
      }
    };

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        // 用户的定义的上传检查
        if (props.beforeUpLoad) {
          const res = props.beforeUpLoad(files[0]);
          console.log("检查结果", res);

          if (!res) {
            return;
          }
        }
        // 说明已经选择文件
        fileStatus.value = "loading";

        const uploadFile = files[0];
        const formdata = new FormData();
        formdata.append(uploadFile.name, uploadFile);
        formdata.append("icode", "E7FE6030F4F99B3");

        // 处理完成，发送请求

        const postImg = async () => {
          const res = await upLoad(formdata);
          const { filename } = res.data.data;
          const { _id } = res.data.data;
          store.commit("setImgUrl", _id);

          if (res.status === 200) {
            setTimeout(() => {
              fileStatus.value = "success";
              createMessage(`${filename}图片上传成功`, "success", 2000, false);
            }, 2000);
            upLoadData.value = res.data;
          } else {
            fileStatus.value = "error";
            createMessage("图片上传失败", "danger", 2000, false);
          }
        };

        postImg();
      }
    };
    return {
      inputFile,
      triggerUpLoad,
      handleFileChange,
      fileStatus,
      upLoadData,
    };
  },
});
</script>

<style scoped lang="less">
.my-btn {
  width: 972px;
  height: 200px;
  font-size: 60px;
  letter-spacing: 20px;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .small-tittle {
    font-size: 20px;
    letter-spacing: 4px;
  }
}
.loading {
  margin-top: 20px;
}
</style>

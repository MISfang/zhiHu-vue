<template>
  <div class="detailContainer">
    <img alt="currentPost.title" class="rounded-lg img-fluid my-4" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { getPostDetail } from "@/api/Post";

export default defineComponent({
  name: "postDetail",
  setup() {
    const route = useRoute();
    const { postId } = route.params;
    console.log(postId);

    onMounted(() => {
      getPost();
    });

    let postData = toRefs(reactive({}));
    const getPost = async () => {
      const { data } = await getPostDetail(postId);
      console.log(data.data);
      postData = data.data;
    };
    return {
      postData,
    };
  },
});
</script>

<style scoped lang="less"></style>

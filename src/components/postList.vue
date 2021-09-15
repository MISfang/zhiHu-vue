<template>
  <div class="post-list">
    <article
      v-for="item in posts"
      :key="item._id"
      class="card mb-3 shadow-lg my-card"
    >
      <div class="card-body">
        <h3>
          <router-link :to="`/postdetail/${item._id}`" class="title">{{
            item.title
          }}</router-link>
        </h3>
        <div class="row my-3 align-items-center">
          <div v-if="item.image" class="col-4">
            <img
              :src="item.image && item.image.url"
              :alt="item.title"
              class="rounded-lg w-75 my-image-shadow my-image-border"
            />
          </div>
          <p :class="{ 'col-8': item.image }" class="text-muted">
            {{ item.excerpt }}
          </p>
        </div>
        <span class="text-muted">{{ item.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted } from "vue";
import { PostProps } from "../store";

export default defineComponent({
  name: "PostList",
  props: {
    posts: {
      required: true,
      type: Array as PropType<PostProps[]>,
    },
  },
  setup(props) {
    onMounted(() => {
      props.posts.forEach((item) => {
        console.log(item._id);
      });
      console.log("专栏文章数据");
    });

    return {};
  },
});
</script>

<style scoped lang="less">
.my-card {
  display: flex !important;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(100px);
  border-radius: 50px;
  padding: 10px;
  .title {
    text-decoration: none;
    font-size: 36px;
    color: black;
  }
  .title:hover {
    font-size: 40px;
    transition: 0.4s;
    color: black;
    box-shadow: 10px 10px 10px rgba(255, 255, 255, 0.6);
  }
  .text-muted {
    font-size: 18px;
    letter-spacing: 2px;
    color: black;
    text-align: justify;
  }
}
.my-card:hover {
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 1);
  background-color: rgba(255, 255, 255, 0.9);
  transition: 0.8s;
}
</style>

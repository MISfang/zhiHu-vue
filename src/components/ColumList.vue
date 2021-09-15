<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-3">
      <div class="card my-card mb-4">
        <div class="card-body text-center">
          <img
            :src="column.avatar && column.avatar.url"
            :alt="column.title"
            class="rounded-circle w-25 my-3 shadow-sm border border-2 border-info"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text">
            {{ column.description }}
          </p>
          <router-link
            class="btn btn-outline-success my-btn"
            :to="`/column/${column._id}`"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { ColumProps } from "../store";

export default defineComponent({
  name: "ColumList",
  props: {
    dataList: {
      type: Array as PropType<ColumProps[]>,
      required: true,
    },
  },
  setup(props) {
    const columnList = computed(() => {
      return props.dataList.map((dataItem) => {
        if (!dataItem.avatar) {
          dataItem.avatar = {
            url: require("@/assets/默认作者头像.png"),
          };
        }
        return dataItem;
      });
    });
    return {
      columnList,
    };
  },
});
</script>

<style scoped lang="less">
.row {
  margin-top: 30px;
  .my-card {
    background-color: rgba(229, 234, 223, 0.9);
    border: 2px solid #198754;
    height: 320px;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.4);
    position: relative;
  }
  .my-btn {
    position: absolute;
    width: 100px;
    border-radius: 20px;
    font-size: 18px;
    left: 50%;
    margin-left: -50px;
    bottom: 10%;
  }
}
</style>

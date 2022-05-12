<template>
  <div class="sy_tabs">
    <el-tabs v-model="activeName" class="sy_tabs_main" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in sy_tab_data"
        :label="item.label"
        :name="item.name"
        :key="item"
      >
        <slot :item="item"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onUpdated, watchEffect, defineProps } from "vue";

const props = defineProps({
  sy_tab_data: {
    type: Array,
    default: [
      { label: "label", name: "name", id: 1 },
      { label: "label", name: "name", id: 1 },
    ],
  },
});

let sy_tab_data = ref(props.sy_tab_data); //这里是变量, 不要用const;

onUpdated(() => {
  handleClick();
});

watchEffect(() => {
  sy_tab_data = props.sy_tab_data;
});
</script>
<style scoped>
.sy_tabs {
  position: relative;
  width: 1005px;
  height: 527px;
  border-radius: 1%;
  overflow: hidden;
  background-color: #fff;
  border: 0.5px solid rgb(192, 191, 191);
}

.sy_tabs_list {
  height: 500px;
  padding: 10px;
  margin: 0;
  list-style: none;
}

.infinite-list .sy_tabs_listitem {
  padding: 5px;
  margin: 5px;
  border-radius: 1%;
  height: 140px;
  border-bottom: 2px solid #000;
  background-color: #fff;
  border: 0.5px solid rgb(192, 191, 191);
}

.infinite-list .sy_tabs_listitem:hover {
  background-color: rgb(247, 246, 246);
}
</style>
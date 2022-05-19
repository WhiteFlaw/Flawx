<template>
  <div class="sy_tabs">
    <el-tabs v-model="activeName" class="sy_tabs_main" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in sy_tab_data"
        :label="item.label"
        :name="item.name"
        :key="item"
        @tab-click="handleClick"
      >
        <slot :item="item"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onUpdated, watchEffect } from "vue";

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

watchEffect(() => {
  sy_tab_data = props.sy_tab_data;
});
</script>
<style scoped>
.sy_tabs {
  height: 527px;
  border-radius: 3px;
  overflow: hidden;
  border: 0.5px solid rgb(192, 191, 191);
  background-color: rgb(239, 239, 239);
}

.sy_tabs_main {
  margin-left: 35px;
  margin-right: 3.5%;
}
</style>
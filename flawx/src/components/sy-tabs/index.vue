<!-- [{label, name, id},{label, name, id},] -->
<!-- 传入需要的label,name, 我们是利用id属性来判定把哪个数组的内容填入哪个标签页的, 所以要求传id吧...在这里手动添加有点麻烦. -->
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

<script>
import { ref, onUpdated, watch } from "vue";
export default {
  name: "sy-tabs",
  props: {
    sy_tab_data: {
      type: Array,
      default: [
        { label: "label", name: "name", id: 1 },
        { label: "label", name: "name", id: 1 },
      ],
    },
  },
  setup(props) {
    const sy_tab_data = ref(props.sy_tab_data);
    watch(
      () => props.sy_tab_data,
      (newValue, oldValue) => {
        sy_tab_data = newValue;
      }
    );

    onUpdated(() => {
      handleClick();
    });

    const handleClick = () => {
      
    };

    return {
      sy_tab_data,
      handleClick,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.el-tabs {
  margin-left: 35px;
  width: 950px;
}

.el-tabs__nav {
  height: 70px;
  line-height: 70px;
}

*::-webkit-scrollbar {
  display: none;
}
</style>

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
<template>
  <div class="author">
    <div class="author_main">
      <div class="author_basic">
        <div class="author_avatar">
          <el-avatar :size="author_avatarsize" :src="author_avatar" />
        </div>
        <div class="author_basic_name">
          <div class="author_name">
            <p v-html="author_name"></p>
          </div>
          <div class="author_downname">
            <p v-html="author_downname"></p>
          </div>
        </div>
      </div>
      <div class="author_motto">
        <p v-html="author_motto"></p>
      </div>
      <div class="author_tag">
        <slot name="author_tag"></slot>
      </div>
      <div
        class="author_else"
        style="
          display: flex;
          justify-content: space-around;
          align-items: center;
        "
      >
        <slot name="author_else"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from "vue";

const props = defineProps({
  size: {
    type: [String, Number],
    default: "large",
  },
  author_avatar: {
    //测试完毕,能用但是记得改一下图片默认放置位置
    type: String,
    default: "",
  },
  author_avatar_size: {
    //测试完毕,正常
    type: [String, Number],
    default: "large",
  },
  author_name: {
    type: String,
    default: "unnamed",
  },
  author_downname: {
    type: String,
    default: "unknown",
  },
  author_motto: {
    type: String,
    default: "unknown",
  },
});

const author_avatarsize = computed(() => {
  return props.author_avatar_size;
});

const author_avatar = ref(props.author_avatar);
const author_avatar_size = ref(props.author_avatar_size);
const author_name = ref(props.author_name);
const author = ref(props.author);

watchEffect(() => {
  author_avatar.value = props.author_avatar;
});

watchEffect(() => {
  author_name.value = props.author_name;
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.author {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1%;
  background-color: rgb(218, 218, 218);
}

.author_main {
  display: flex;
  flex-direction: column;
}

.author_basic {
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 0.5rem;
}

.author_avatar {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}

.author_basic_name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  flex: 3;
  padding-left: 1rem;
}

.author_name {
  flex: 2;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 20px;
  font-size: 17px;
  margin-top: 0.5rem;
  letter-spacing: 1px;
  line-height: 25px;
  color: rgb(102, 102, 102);
  background-color: rgb(235, 235, 235);
}

.author_downname {
  flex: 1;
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 0.5rem;
  border-radius: 20px;
  font-size: 17px;
  line-height: 30px;
  letter-spacing: 1px;
  color: rgb(170, 170, 170);
  transform-origin: 0 0;
  transform: scale(0.8);
  background-color: rgb(235, 235, 235);
}

.author_motto {
  display: flex;
  height: 80px;
  width: 100%;
  padding-left: 5px;
  border-radius: 3px;
  margin-top: 0.5rem;
  font-size: 17px;
  line-height: 30px;
  letter-spacing: 1px;
  overflow: hidden;
  color: rgb(170, 170, 170);
  background-color: rgb(235, 235, 235);
}

.author_tag {
  display: flex;
  height: 30px;
  width: 100%;
  margin-top: 0.5rem;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  background-color: rgb(235, 235, 235);
}

.author_else {
  height: 80px;
  width: 265px;
  border-radius: 8px;
}
</style>
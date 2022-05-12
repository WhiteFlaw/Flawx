<template>
  <div class="author">
    <div class="author_avatar">
      <el-avatar :size="120" :src="author_avatar" />
    </div>
    <div class="author_name">
      <p v-html="author_name"></p>
    </div>
    <div class="author_age">
      <p v-html="author_age"></p>
    </div>
    <div class="author_tag">
      <slot name="tag"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, defineProps } from "vue";

const props = defineProps({
  author_avatar: {
    type: String,
    default: "",
  },
  author_name: {
    type: String,
  },
  author_age: {
    type: String,
  },
});

const author_name = ref(props.author_name);
const author_avatar = ref(props.author_avatar);
const author_age = ref(props.author_age);

watchEffect(() => {
  author_avatar.value = props.author_avatar;
});

watchEffect(() => {
  author_name.value = props.author_name;
});

watchEffect(() => {
  author_age.value = props.author_age;
});
</script>

<style scoped>
.author {
  position: relative;
  top: 0px;
  left: 0px;
  border-radius: 1%;
  background-color: rgb(255, 255, 255);
  height: 655px;
  width: 320px;
}

.author_avatar {
  position: absolute;
  top: 100px;
  left: 96px;
  background-position: 50% 50%;
}

.author_name {
  position: absolute;
  top: 250px;
  left: 115px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 20px;
  line-height: 30px;
  font-size: 25px;
  letter-spacing: 1px;
  color: rgb(102, 102, 102);
  background-color: rgb(235, 235, 235);
}

.author_age {
  position: absolute;
  top: 300px;
  left: 80px;
  height: 30px;
  padding-right: 5px;
  padding-left: 5px;
  border-radius: 20px;
  line-height: 30px;
  font-size: 17px;
  letter-spacing: 1px;
  transform: scale(0.8);
  color: rgb(170, 170, 170);
  background-color: rgb(235, 235, 235);
}

.author_tag {
  position: absolute;
  top: 350px;
  left: 60px;
  height: 30px;
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
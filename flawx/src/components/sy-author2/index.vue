<template>
  <div class="author">
    <div class="author-content">
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
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue"; //defineProps不再需要引入

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
  display: flex;
  border-radius: 3px;
  background-color: rgb(255, 255, 255);
  height: 655px;
  width: 100%;
}

.author-content {
  display: flex;
  margin-top: 20%;
  width: 100%;
  height: 50%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.author_avatar {
  background-position: 50% 50%;
}

.author_name {
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
  display: flex;
  height: 30px;
  width: 60%;
  justify-content: space-between;
  align-items: center;
}
</style>
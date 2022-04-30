<template>
  <div class="article_author">
    <div class="article_author_avatar">
      <el-avatar size="large" :src="article_author.avatar" />
    </div>
    <div class="article_author_name">
      <p v-text="authorname"></p>
    </div>
    <div class="article_author_age">
      <p>{{ article_author.register_time.substring(0, 10) }}入驻</p>
      <!-- 这里如果不事先在data.article_author里声明register_time会导致报错substring的对象不可为undefined,一开始以为要在请求完做处理再渲染,并不是这个原因. -->
    </div>
    <div class="article_author_motto">
      {{ article_author.motto }}
    </div>
    <p class="article_author_totalView">
      被访问:{{ article_author.totalView }}次)
    </p>
    <div class="article_author_tag">
      <el-tag class="ml_2" type="success">{{ article_author.tag1 }}</el-tag>
      <el-tag class="ml_2" type="success">{{ article_author.tag2 }}</el-tag>
      <el-tag class="ml_2" type="warning">{{ article_author.tag3 }}</el-tag>
      <el-tag class="ml_2" type="danger">{{ article_author.tag4 }}</el-tag>
    </div>
    <div class="article_author_action">
      <el-button
        type="primary"
        round
        size="large"
        class="article_author_action_focus"
        >关 注</el-button
      >
      <el-button
        type="success"
        round
        size="large"
        class="article_author_action_agree"
        >认可({{ article_author.agree }})</el-button
      >
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch } from "vue";
export default {
  props: {
    authorname: {
      type: String,
    },
    article_author: {
      type: Object,
    },
  },
  setup(props) {
    const authorname = ref(props.authorname);
    const article_author = ref(props.article_author);
    watch(
      () => props.authorname,
      (newValue) => {
        authorname.value = newValue;
      }
    );
    watch(
      () => props.article_author,
      (newValue) => {
        article_author.value = newValue;
      }
    );
    return { authorname, article_author };
  },
};
</script>

<style scoped>
.article_author {
  position: relative;
  top: 0px;
  left: 0px;
  border-radius: 1%;
  background-color: #fff;
  height: 290px;
  width: 330px;
}

.article_author_avatar {
  position: absolute;
  top: 15px;
  left: 30px;
}

.article_author_name {
  position: absolute;
  top: 20px;
  left: 95px;
  font-size: 17px;
  letter-spacing: 1px;
  color: rgb(102, 102, 102);
}

.article_author_age {
  position: absolute;
  top: 40px;
  left: 83px;
  font-size: 17px;
  letter-spacing: 1px;
  transform: scale(0.8);
  color: rgb(170, 170, 170);
}

.article_author_totalView {
  position: absolute;
  top: 56px;
  left: 86px;
  font-size: 17px;
  transform: scale(0.8);
  color: rgb(170, 170, 170);
}

.article_author_motto {
  position: absolute;
  top: 85px;
  left: 33px;
  height: 80px;
  width: 265px;
  font-size: 17px;
  letter-spacing: 1px;
  color: rgb(170, 170, 170);
}

.article_author_tag {
  position: absolute;
  top: 170px;
  left: 25px;
}

.ml_2 {
  margin-left: 8px;
}

.article_author_action {
  position: absolute;
  top: 230px;
  left: 50px;
}

.article_author_action_agree {
  margin-left: 60px;
}
</style>
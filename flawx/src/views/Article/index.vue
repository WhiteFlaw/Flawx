<template>
  <sy-nav-bar></sy-nav-bar>
  <div class="article_body">
    <div class="article_else">
      <div class="article_author">
        <sy-author-1
          :author_avatar_size="62"
          v-model:author_avatar="data.article_author.avatar"
          v-model:author_name="data.authorname"
          v-model:author_downname="data.article_author.register_time"
          v-model:author_motto="data.article_author.motto"
        >
          <template #author_tag>
            <el-tag v-for="item in data.article_author.tag" :key="item">{{
              item
            }}</el-tag>
          </template>
          <template #author_else>
            <el-button type="primary"
              >赞同:{{ data.article_author.agree }}</el-button
            >
            <el-button type="success"
              >受访:{{ data.article_author.totalView }}</el-button
            >
          </template>
        </sy-author-1>
      </div>

      <div class="article_list">
        <div>
          <p style="margin-left: 10px">{{ data.authorname }}的其他文章</p>
        </div>
        <ul>
          <li
            v-for="item in data.article_list"
            :key="item"
            @click="toAnotherArticle(item.article_id)"
          >
            <h3>{{ item.article_title }}</h3>
          </li>
        </ul>
      </div>
    </div>

    <div class="article_article">
      <div class="article_content">
        <div class="article_title">
          <h2>{{ data.article_data.article_title }}</h2>
          <div>
            <p>
              | View:{{ data.article_data.viewCount }} |
              {{ data.article_data.article_posttime.substring(0, 10) }}
            </p>
          </div>
        </div>
        <div class="article_text">
          <p v-html="data.article_data.article_content"></p>
          <el-button type="success" plain @click="updateAgree"
            >好! ({{ data.article_data.article_agree }})</el-button
          >
        </div>
      </div>
      <div class="article_comments">
        <h3>评论:{{ data.article_comments_list.length }}</h3>
        <div class="article_comments_write">
          <el-input
            v-model="textarea"
            :rows="2"
            type="textarea"
            ref="textarea"
            placeholder="指点, 但是不要指指点点."
          />
          <el-button
            type="primary"
            class="article_comments_submit"
            @click="article_comments_submit(textarea)"
            >发表评论</el-button
          >
        </div>
        <ul class="article_comments_list">
          <li v-for="item in data.article_comments_list" :key="item">
            <div class="article_comments_avatar">
              <el-avatar size="default" :src="item.comment_avatar" />
            </div>
            <div class="article_comments_username">
              <p v-text="item.comment_name"></p>
            </div>
            <div class="article_comments_time">
              <p>{{ item.comment_time }}</p>
            </div>
            <div class="article_comments_comments">
              <p>{{ item.comment_content }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
    <!-- 现在生成页面的基本逻辑已经确定, 在HOME页面点击链接后使用$router.push({params:文章id})的方式先跳转到Article页面, 
    再根据url中的Param在create周期做文章请求;
    或许可以尝试"通过将v-for遍历item得到的文章id 传入点击事件"的方法;
    那么主页的宣传链接内需要包含正确的文章题目和文章id;
    如果将文章内容\id\文章名放在同一记录,或许可行;
    那么Home页面请求的记录也将包含文章内容,主页不展示内容,这没有必要,那么如何不请求内容的同时请求到id和文章名?
     -->

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import SyNavBar from "../../components/sy-navbar";
import SyAuthor1 from "../../components/sy-author1";
import {
  toSubmitComments,
  toGetArticle,
  toGetUserData,
  toUpdateViewCount,
  toGet5UserArticle,
  toGetComments,
  toUpdateAgree,
} from "./Article";

const $route = useRoute();
let data = reactive({
  authorname: "用户名请求失败",
  article_author: {
    motto: "motto请求失败",
    age: 1,
    tag: [],
    agree: "?",
    register_time: "失败",
    totalView: "失败",
    avatar: "",
  },
  article_list: [
    { article_title: "失败", id: "" },
    { article_title: "失败", id: "" },
    { article_title: "失败", id: "" },
    { article_title: "失败", id: "" },
    { article_title: "失败", id: "" },
  ],
  article_data: {
    article_title: "文章题目请求失败",
    artcile_content: `文章内容请求失败`,
    viewCount: "失败",
    article_agree: "?",
    article_posttime: "?",
  },
  article_comments_list: [],
});
onMounted(() => {
  article_comments_get();
  article_article_get();
});

function article_comments_submit(textarea) {
  if (localStorage.getItem("username")) {
    const username = localStorage.getItem("username");
    toSubmitComments({
      comment_name: username,
      comment_content: textarea, //不需要.value, 除非数据经过ref()转化为响应式
      comment_avatar: localStorage.getItem("avatar"),
      article_id: $route.query.id, //不是$router
      //发表时间甚麽的就交给后端吧
    }).then(() => {
      this.$message({ message: "评论成功.", type: "success" });
      //先push进去显示着,下次它再进来再请求
      data.article_comments_list.push({
        comment_name: username,
        comment_content: textarea,
        article_id: $route.query.id,
        comment_avatar: localStorage.getItem("avatar"),
      });
    });
  } else {
    this.$message.error("请先登录，如已登录请刷新页面。");
  }
}

function article_article_get() {
  toGetArticle({
    article_id: $route.query.id,
  }).then((res) => {
    //console.log(res.data[0]);
    data.article_data = res.data[0];
    data.authorname = res.data[0].article_authorname;
    toGetUserData({
      username: res.data[0].article_authorname,
    }).then((result) => {
      data.article_author = result.data[0];
      data.article_author.tag = [
        result.data[0].tag1,
        result.data[0].tag2,
        result.data[0].tag3,
        result.data[0].tag4,
      ];
      data.article_author.register_time =
        result.data[0].register_time.substring(0, 10) + "入驻";
      data.article_author.totalView += 1;
      data.article_data.viewCount += 1;
      toUpdateViewCount({
        viewCount: data.article_data.viewCount, //后面要把阅读量放到data.article_view里
        totalView: data.article_author.totalView,
        article_id: $route.query.id,
        username: data.authorname,
      }).then((res) => {
        if (res.data.status == true) {
          ElMessage.success(res.data.msg);
        } else {
          ElMessage.error(res.data.msg);
        }
        toGet5UserArticle({
          username: data.authorname,
        }).then((result) => {
          data.article_list = result.data;
        });
      });
    });
  });
}

function article_comments_get() {
  const id = $route.query.id;
  toGetComments({
    article_id: id,
  }).then((res) => {
    data.article_comments_list = res.data;
  });
}

const toAnotherArticle = (id) => {
  toGetArticle({
    article_id: id,
  }).then((res) => {
    data.article_data = res.data[0];
    data.authorname = res.data[0].article_authorname;
  });
};

function updateAgree() {
  data.article_author.agree += 1;
  data.article_data.article_agree += 1;
  const id = $route.query.id;

  toUpdateAgree({
    article_id: id,
    article_agree: data.article_data.article_agree,
    agree: data.article_author.agree,
    username: data.authorname,
  }).then((res) => {
    if (res.data.status === true) {
      ElMessage.success(res.data.msg);
    } else {
      ElMessage.error(res.data.msg);
    }
  });
}
</script>

<style>
.el-page-header {
  float: left;
  height: 55px;
  padding-right: 20px;
  padding-left: 20px;
  line-height: 55px;
}

.el-breadcrumb {
  /* 一定不要删 */
  float: left;
  line-height: 55px;
  height: 55px;
  width: 100%;
  background-color: #fff;
}
</style>
<style scoped>
@import "../../assets/style/Article/Article.css";
</style>

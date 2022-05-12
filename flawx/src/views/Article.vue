<template>
  <sy-nav-bar></sy-nav-bar>
  <div class="article_body">
    <div class="article_author">
      <sy-author-1
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
    <div class="article_article">
      <h2>{{ data.article_data.article_title }}</h2>
      <p v-html="data.article_data.article_content"></p>
      <div class="article_viewCount">
        <p>|{{ data.article_data.article_posttime.substring(0, 10) }}</p>
        <p>| View:{{ data.article_data.viewCount }}</p>
      </div>
      <div class="article_agree">
        <el-button type="success" plain @click="updateAgree"
          >好! ({{ data.article_data.article_agree }})</el-button
        >
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
import axios from "axios";
//axios.defaults.baseURL = "/api";
axios.defaults.baseURL = "http://8.130.48.246:3000";
import { reactive, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import SyNavBar from "../components/sy-navbar";
import SyAuthor1 from "../components/sy-author1";

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
    axios
      .post("/admin/insertComments", {
        comment_name: username,
        comment_content: textarea, //不需要.value;
        comment_avatar: localStorage.getItem("avatar"),
        article_id: $route.query.id, //不是$router
        //发表时间甚麽的就交给后端吧
      })
      .then(() => {
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
  axios
    .post("/getArticleById", {
      article_id: $route.query.id,
    })
    .then((res) => {
      //console.log(res.data[0]);
      data.article_data = res.data[0];
      data.authorname = res.data[0].article_authorname;
      axios
        .post("/getUserData", {
          username: res.data[0].article_authorname,
        })
        .then((result) => {
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
          axios
            .post("/updateViewCount", {
              viewCount: data.article_data.viewCount, //后面要把阅读量放到data.article_view里
              totalView: data.article_author.totalView,
              article_id: $route.query.id,
              username: data.authorname,
            })
            .then((res) => {
              if (res.data.status == true) {
                ElMessage.success(res.data.msg);
              } else {
                ElMessage.error(res.data.msg);
              }
              axios
                .post("/get5UserArticle", {
                  username: data.authorname,
                })
                .then((result) => {
                  data.article_list = result.data;
                });
            });
        });
    });
}

function article_comments_get() {
  const id = $route.query.id;
  axios
    .post("/getComments", {
      article_id: id,
    })
    .then((res) => {
      data.article_comments_list = res.data;
    });
}

const toAnotherArticle = (id) => {
  axios
    .post("/getArticleById", {
      article_id: id,
    })
    .then((res) => {
      data.article_data = res.data[0];
      data.authorname = res.data[0].article_authorname;
    });
};

function updateAgree() {
  data.article_author.agree += 1;
  data.article_data.article_agree += 1;

  const id = $route.query.id;
  axios
    .post("/updateAgree", {
      article_id: id,
      article_agree: data.article_data.article_agree,
      agree: data.article_author.agree,
      username: data.authorname,
    })
    .then((res) => {
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
  /* 一定不要删 */
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
.article_body {
  background-color: rgb(241, 241, 241);
}

.article_author {
  position: relative;
  top: 65px;
  left: 40px;
}

.article_author_action {
  position: absolute;
  top: 230px;
  left: 50px;
}

.article_author_action_agree {
  margin-left: 60px;
}

.article_list {
  position: relative;
  overflow: hidden;
  list-style-type: none;
  border-radius: 1%;
  top: 75px;
  left: 40px;
  height: 320px;
  width: 330px;
  background-color: #fff;
}

.article_list div {
  height: 50px;
  line-height: 50px;
  list-style-type: none;
  letter-spacing: 1px;
  color: rgb(102, 102, 102);
  font-weight: 600;
  border-bottom: 0.5px solid rgb(230, 230, 230);
}

.article_list li {
  height: 50px;
  padding-left: 10px;
  line-height: 50px;
  list-style-type: none;
  letter-spacing: 1px;
  font-size: 15px;
  color: rgb(102, 102, 102);
}

.article_article {
  position: relative;
  padding: 20px;
  border-radius: 1%;
  top: -545px;
  left: 380px;
  width: 1070px;
  word-wrap: break-word;
  background-color: #fff;
}

.article_article p {
  margin-top: 20px;
}

.article_article p:nth-child(2) {
  margin-top: 20px;
  padding-bottom: 30px;
}

.article_viewCount {
  position: absolute;
  top: 5px;
  opacity: 0.5;
  left: 985px;
}

.article_comments {
  position: absolute;
  overflow: hidden;
  border-radius: 1%;
  margin-top: 50px;
  left: 0px;
  width: 1110px;
  background-color: #fff;
}

.article_comments h3 {
  padding-top: 20px;
  padding-left: 20px;
}

.article_comments_write {
  padding: 20px;
}

.article_comments_submit {
  margin-top: 20px;
  margin-left: 980px;
}

.article_comments_list li {
  padding: 20px;
  border-top: 1px solid rgb(230, 230, 230);
}

.article_comments_avatar {
  float: left;
}

.article_comments_username {
  margin-top: -17px;
  margin-left: 50px;
  font-size: 17px;
  color: rgb(102, 102, 102);
}

.article_comments_time {
  margin-top: -17px;
  margin-left: -900px;
  transform: scale(80%);
  font-size: 14px;
  color: rgb(102, 102, 102);
}

.article_comments_comments {
  margin-top: -8px;
  margin-left: 50px;
  font-size: 17px;
  color: rgb(102, 102, 102);
}
</style>

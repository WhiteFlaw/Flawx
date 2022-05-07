<template>
  <sy-nav-bar></sy-nav-bar>
  <div class="allArticle_body">
    <div class="article_author">
      <sy-author-2
        v-model:author_avatar="data.article_author.avatar"
        v-model:author_name="data.authorname"
        v-model:author_age="data.article_author.register_time"
      >
        <template #tag>
          <el-tag v-for="item in data.article_author.tag" :key="item">
            {{ item }}
          </el-tag>
        </template>
      </sy-author-2>
    </div>
    <div class="allArticle_list">
      <sy-pagination
        size="large"
        v-model:user_article_content_page="data.user_article_content_page"
        v-model:newArr="data.newArr"
        @deleteArticle="deleteArticle"
      ></sy-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//axios.defaults.baseURL = "/api";
axios.defaults.baseURL = "http://8.130.48.246:3000";
import { ref, reactive, onMounted } from "vue";
import SyAuthor2 from "../components/sy-author2";
import SyPagination from "../components/sy-pagination";
import SyNavBar from "../components/sy-navbar";
import { ElMessage } from "element-plus";

export default {
  name: "allArticle",
  components: {
    SyAuthor2,
    SyPagination,
    SyNavBar,
  },
  setup() {
    let data = reactive({
      /* 请求到数据了,但是在同步到子组件之前子组件已经拿走了请求失败的默认值 */
      /* 因为是使用v-model绑定的数据, 所以本质原因是子组件的props处不同步数据,只在页面加载时检索一次数据,那么使用watch在子组件props里监听最新的值 */
      newArr: [],
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
      allArticle: [],
      currentPage: 1,
      user_article_content_page: 1,
    });

    onMounted(() => {
      getUserData();
      getUserArticle();
    });

    const getUserData = () => {
      data.authorname = localStorage.getItem("username");
      axios
        .post("/getUserData", {
          username: data.authorname,
        })
        .then((result) => {
          data.article_author = result.data[0];
          data.article_author.register_time =
            "入驻于" + result.data[0].register_time.substring(0, 10);
          data.article_author.tag = [
            result.data[0].tag1,
            result.data[0].tag2,
            result.data[0].tag3,
            result.data[0].tag4,
          ];
        });
    };

    const getUserArticle = () => {
      axios
        .post("/getUserArticle", {
          username: localStorage.getItem("username"),
        })
        .then((res) => {
          data.allArticle = res.data;
          dataProcessing(data.allArticle, 5);
        });
    };

    const dataProcessing = (arr, num) => {
      let newArr = [];
      for (let i = 0; i < arr.length; ) {
        newArr.push(arr.slice(i, (i += num)));
      }
      data.newArr = newArr;
      data.user_article_content_page = newArr.length;
      return newArr;
    };

    const deleteArticle = (item) => {
      //console.log(id);
      let temArr = data.allArticle.slice(0);
      for (let i = temArr.length; i >= 0; i--) {
        if (temArr[i] === item) {
          temArr.splice(i, 1);
        }
      }
      data.allArticle = temArr;
      dataProcessing(data.allArticle, 5);
      axios
        .post("/user/delArticle", {
          article_id: item.article_id,
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.status == true) {
            ElMessage.success(res.data.msg);
          } else {
            ElMessage.error(res.data.msg);
          }
        });
    };
    return {
      data,
      getUserData,
      getUserArticle,
      deleteArticle,
    };
  },
};
</script>

<style scoped>
.allArticle_body {
  position: relative;
  width: 100%;
  height: 750px;
  background-color: rgb(241, 241, 241);
}

.article_author {
  position: absolute;
  top: 70px;
  left: 50px;
}

.allArticle_list {
  position: absolute;
  top: -40px;
  left: 165px;
}
</style>
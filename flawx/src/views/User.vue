<template>
  <sy-nav-bar></sy-nav-bar>
  <div class="user_body">
    <el-button type="primary" round class="user_publish" @click="publish"
      >发布</el-button
    >
    <div class="user_tree">
      <el-tree
        :data="tree"
        :props="defaultProps"
        @node-click="handleNodeClick"
        default-expand-all="true"
      /><!-- 绑定的方法还是不要加括号了,真的会导致传不过去值之类的错误,至少现在在element里发现了这个错误,这里的handleNodeClick加括号获取不到点击的节点信息; -->
    </div>
    <ul class="user_articledata">
      <li
        class="user_articledata_detail"
        v-for="item in data.user_articledata_detail"
        :key="item"
      >
        <p>{{ item.articledata_title }}</p>
        <p>{{ item.articledata_data }}</p>
      </li>
    </ul>
    <!--     <div v-if="data.user_article_content !== ''" class="user_article_list_empty">
      <el-empty description="你还没有写过什么呢..." />
    </div> -->
    <sy-pagination
      size="middle"
      v-model:user_article_content_page="data.user_article_content_page"
      v-model:newArr="data.newArr"
    ></sy-pagination>
  </div>
</template>

<script>
import { toRefs, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import SyNavBar from "../components/sy-navbar";
import SyPagination from "../components/sy-pagination";

import axios from "axios";
export default {
  name: "User",
  components: {
    SyNavBar,
    SyPagination,
  },
  setup() {
    const router = useRouter();
    const tree = [
      {
        label: "首页",
        url: "/",
      },
      {
        label: "管理",
        children: [
          {
            label: "内容管理",
            url: "/user/allArticle",
          },
          {
            label: "评论管理",
            url: "",
          },
          {
            label: "专栏管理",
            url: "",
          },
        ],
      },
      {
        label: "活动",
        children: [
          {
            label: "活动列表",
          },
          {
            label: "投稿管理",
          },
        ],
      },
    ];
    const defaultProps = {
      children: "children",
      label: "label",
    };
    const data = reactive({
      user_articledata_detail: [
        { articledata_title: "受访问", articledata_data: "fail" },
        { articledata_title: "受认同", articledata_data: "fail" },
        { articledata_title: "受收藏", articledata_data: "fail" },
        { articledata_title: "受关注", articledata_data: "fail" },
      ],
      newArr: "",
      currentPage: 1,
      user_article_content: "",
      user_article_content_page: "",
    });

    onMounted(() => {
      getUserData();
      getUserArticle();
      ElMessage.success(
        "欢迎回来, " + localStorage.getItem("username") + " ..."
      );
    });

    const getUserData = () => {
      axios
        .post("http://101.200.171.66:3000/getUserData", {
          username: localStorage.getItem("username"),
        })
        .then((res) => {
          data.user_articledata_detail[0].articledata_data =
            res.data[0].totalView;
          data.user_articledata_detail[1].articledata_data = res.data[0].agree;
        });
    };

    const getUserArticle = () => {
      axios
        .post("http://101.200.171.66:3000/getUserArticle", {
          username: localStorage.getItem("username"),
        })
        .then((res) => {
          function spArr(arr, num) {
            //arr是你要分割的数组，num是以几个为一组
            let newArr = []; //首先创建一个新的空数组。用来存放分割好的数组
            for (let i = 0; i < arr.length; ) {
              //注意：这里与for循环不太一样的是，没有i++
              newArr.push(arr.slice(i, (i += num)));
            }
            data.newArr = newArr;
            data.user_article_content_page = newArr.length;
            return newArr;
          }
          let arr = res.data;
          spArr(arr, 5);
        });
    };

    const currentChange = () => {
      data.user_article_content = data.newArr[data.currentPage - 1];
      console.log(data.currentPage);
    };

    const prevClick = () => {
      data.currentPage - 1;
      data.user_article_content = data.newArr[data.currentPage - 1];
      console.log(data.currentPage);
    };

    const nextClick = () => {
      data.currentPage + 1;
      data.user_article_content = data.newArr[data.currentPage - 1];
    };

    const handleNodeClick = (data) => {
      router.push(data.url);
    };

    const publish = () => {
      window.location.href = "#/user/publish";
    };

    const goBack = () => {
      router.go(-1);
    };

    const logOut = () => {
      window.location.href = "#/login";
      localStorage.clear();
    };
    return {
      data,
      ...toRefs(data),
      handleNodeClick,
      logOut,
      publish,
      goBack,
      tree,
      defaultProps,
      currentChange,
      prevClick,
      nextClick,
    };
  },
};
</script>
<style>
.el-page-header {
  float: left;
  height: 45px;
  padding-right: 20px;
  padding-left: 20px;
  line-height: 45px;
}

.el-breadcrumb {
  float: left;
  line-height: 45px;
  height: 45px; /* 别改这里 */
  width: 100%;
  background-color: rgb(255, 255, 255);
  box-shadow: 5px 3px 10px #888888;
  border-radius: 2px;
}

.el-tree-node__content {
  height: 60px;
  background-color: rgb(241, 241, 241);
}
</style>
<style scoped>
.user_body {
  height: 740px;
  width: 100%;
  background-color: rgb(241, 241, 241);
}

.user_publish {
  position: fixed;
  top: 90px;
  left: 38px;
  width: 175px;
  height: 40px;
}

.user_tree {
  position: fixed;
  left: 38px;
  top: 140px;
  height: 100%;
  width: 230px;
}

.user_articledata {
  position: relative;
  top: 90px;
  left: 265px;
  height: 190px;
  width: 898px;
  border-radius: 1%;
  background-color: rgb(255, 255, 255);
}

.user_articledata_detail {
  height: 80px;
  line-height: 40px;
  text-align: center;
  margin-top: 50px;
  margin-left: 135px;
  list-style-type: none;
  float: left;
}

.user_articledata_detail p:nth-child(2) {
  font-family: "微软雅黑";
  font-weight: 600;
  font-size: 22px;
}
</style>
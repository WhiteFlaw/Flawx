<template>
  <el-breadcrumb separator="/" class="el-bread">
    <el-page-header :content="data.nav_data.pageName" @back="goBack" />
    <el-breadcrumb-item @click="goHome">Home</el-breadcrumb-item>
    <el-breadcrumb-item>{{ data.nav_data.pageName }}</el-breadcrumb-item>
    <div class="userData">
      <el-avatar
        @click="toUser()"
        shape="square"
        :size="35"
        :src="data.nav_data.avatar"
      />
      <p>
        {{ data.nav_data.username }}
      </p>
      <div class="sy-switch">
        <sy-switch></sy-switch>
      </div>
    </div>
    <div class="pushout">
      <ul>
        <li
          v-for="item in data.pushout"
          :key="item"
          @click="clickPushOut(item.link)"
        >
          {{ item.content }}
        </li>
      </ul>
    </div>
  </el-breadcrumb>
</template>

<script setup>
import { onMounted, reactive, watchEffect } from "vue";
import { ElMessage } from "element-plus";
import sySwitch from "../sy-switch";
import { useRoute, useRouter } from "vue-router";
const $router = useRouter();
const $route = useRoute();

let data = reactive({
  nav_data: {
    pageName: "", //本页名
    lastpageName: "", //上页名
    username: "未登录", //用户名
    avatar: "", //头像
  },
  pushout: [
    { content: "占位", link: "" },
    { content: "个人中心", link: "/user" },
    { content: "编辑信息", link: "/user/updateUser" },
    { content: "登录/切换账号", link: "/login" },
  ],
});

onMounted(() => {
  getPageName();
  getUsername();
  getAvatar();
});

function getPageName() {
  data.nav_data.pageName = $route.name; //刚刷新页面没有做到一半改了devServer了一下又有了, 一般就是因为没有watch.
} //在App.vue里获取当前页面name依旧可以使用$route.name, 可能因为router-view加载在导航栏之后所以导航栏组件获取不到页面名
//watch一下即可;

watchEffect(() => {
  data.nav_data.pageName = $route.name;
});

function goHome() {
  $router.push("/");
}

function getUsername() {
  if (localStorage.getItem("username")) {
    data.nav_data.username = localStorage.getItem("username");
  }
}

function getAvatar() {
  data.nav_data.avatar = localStorage.getItem("avatar");
}

function goBack() {
  $router.go(-1); //不知道这玩意行不行,没试
}

const clickPushOut = (link) => {
  if (link === "/user" && !localStorage.getItem("passCard")) {
    ElMessage.warning("进入用户空间须通行证,请登录以获取.");
  } else if (link === "/user/updateUser" && !localStorage.getItem("passCard")) {
    ElMessage.warning("编辑什么,我有你的信息嘛?");
  } else if (link === "/login" && localStorage.getItem("passCard")) {
    localStorage.clear();
    location.reload();
    $router.push(link);
    ElMessage.success("你的本地信息已清除.");
  } else if ($route.name === "User" && link === "/user") {
    ElMessage.success("你已经在用户空间啦...");
  } else if ($route.name == "Updateuser" && link === "/user/updateUser") {
    ElMessage.success("你已经在信息编辑页啦...");
  } else {
    $router.push(link);
  }
};

function toUser() {
  //发请求检验本地token在服务器内是否存在
  if (!localStorage.getItem("passCard")) {
    $router.push("/login");
  } else {
    $router.push("/user");
  }
}
</script>

<style scoped>
.el-breadcrumb {
  display: flex;
  align-items: center;
  background-color: var(--color-light2);
}

.el-breadcrumb__item:nth-child(2) {
  margin-left: 1rem;
}

.el-page-header {
  height: 50px;
  padding-right: 20px;
  padding-left: 20px;
  line-height: 50px;
}

.userData {
  display: flex;
  height: 3rem;
  width: 100%;
  align-items: center;
  margin-right: 4%;
  justify-content: flex-end;
}

.userData p {
  margin-left: 1rem;
}

.sy-switch {
  margin-left: 2rem;
  z-index: 4000;
}

.pushout {
  position: fixed;
  top: 1%;
  left: 84%;
  display: none;
  z-index: 3000;
}

.pushout ul {
  display: flex;
  width: 8rem;
  flex-direction: column;
}

.pushout li {
  display: flex;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  background-color: var(--color-light1);
  box-shadow: 5px 5px 5px 0px #888888;
}

.pushout ul li:nth-child(1) {
  margin-bottom: 10px;
  height: 45px;
  opacity: 0;
}

.userData:hover + .pushout {
  display: block;
}

.pushout:hover {
  display: block;
}

.pushout li:hover {
  background-color: var(--color-light2);
  transition: all 0.3s linear;
}
</style>

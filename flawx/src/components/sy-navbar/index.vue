<template>
  <el-breadcrumb separator="/">
    <el-page-header :content="data.nav_data.pageName" @back="goBack" />
    <el-breadcrumb-item @click="goHome">Home</el-breadcrumb-item>
    <!-- 下一步将该元素绑定到上一个路由 -->
    <el-breadcrumb-item>{{ data.nav_data.pageName }}</el-breadcrumb-item>
    <div class="userData">
      <p style="float: right; margin-right: 120px">
        {{ data.nav_data.username }}
      </p>
      <el-avatar
        @click="toUser()"
        shape="square"
        :size="35"
        style="float: right; margin: 8px 10px 15px"
        :src="data.nav_data.avatar"
      />
    </div>
    <ul class="pushOut">
      <li
        v-for="item in data.pushOut"
        :key="item"
        @click="clickPushOut(item.link)"
      >
        {{ item.content }}
      </li>
    </ul>
  </el-breadcrumb>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { defineComponent } from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "NavBar",
  setup() {
    const $router = useRouter();
    const $route = useRoute();
    let data = reactive({
      nav_data: {
        pageName: "", //本页名
        lastpageName: "", //上页名
        username: "未登录", //用户名
        avatar: "", //头像
      },
      pushOut: [
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
      //getLastPageName();
    });

    function getPageName() {
      data.nav_data.pageName = $route.name;
    }
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
      } else if (
        link === "/user/updateUser" &&
        !localStorage.getItem("passCard")
      ) {
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
    return {
      data,
      goBack,
      toUser,
      goHome,
      clickPushOut,
    };
  },
});
</script>

<style scoped>
.el-page-header {
  float: left;
  height: 50px;
  padding-right: 20px;
  padding-left: 20px;
  line-height: 50px;
}

.el-breadcrumb {
  position: fixed;
  float: left;
  line-height: 50px;
  height: 50px; /* 别改这里 */
  width: 100%;
  background-color: rgb(255, 255, 255);
  box-shadow: 5px 3px 10px #888888;
  border-radius: 2px;
  z-index: 3000;
}

.pushOut {
  position: relative;
  list-style-type: none;
  float: right;
  width: 130px;
  text-align: center;
  margin-right: -135px;
  display: none;
  opacity: 1;
  margin-top: 0px;
  border-radius: 3px;
  transition: all 0.3s linear;
  z-index: 3000;
}

.pushOut li {
  background-color: rgb(255, 255, 255);
  box-shadow: 5px 5px 5px 0px #888888;
}

.pushOut li:hover {
  background-color: rgb(219, 219, 219);
  transition: all 0.3s linear;
}

.pushOut li:nth-child(1) {
  margin-bottom: 10px;
  height: 45px;
  opacity: 0;
}

.userData:hover + .pushOut {
  display: block;
  opacity: 0;
}

.pushOut:hover {
  display: block;
}
</style>

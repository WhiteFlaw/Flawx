<template>
  <sy-nav-bar></sy-nav-bar>
  <div class="login_body">
    <div class="drops">
      <div class="drop"></div>
      <div class="drop"></div>
      <div class="drop"></div>
      <div class="drop"></div>
    </div>
    <div class="login_introduction">
      <!-- <h2>Welcome To FlawX</h2> -->
      <h2>XXXXXXXXXXXXX</h2>
      <p v-html="login_introduction"></p>
    </div>
    <div class="login_main">
      <div class="login_container">
        <ul class="login_title">
          <li
            :class="{ login_title_active: item.active === true }"
            v-for="item in data.login_fangfa"
            :key="item.value"
            @click="login_title_active(item)"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="login_detail">
          <div
            class="login_detail_index"
            :class="{
              login_detail_index_active0: data.login_fangfa[0].active === true,
            }"
          >
            二维码登录_未开放
          </div>
          <div
            class="login_detail_index"
            :class="{
              login_detail_index_active1: data.login_fangfa[1].active === true,
            }"
          >
            <el-form
              label-position="top"
              :rules="data.rules"
              :model="data.ruleForm"
              ref="loginForm_mianmi"
            >
              <el-form-item label="手机号" prop="phonenumber">
                <el-input
                  type="text"
                  v-model.trim="data.ruleForm.phonenumber"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="6位数字验证码" prop="yanzhengma">
                <el-input
                  type="text"
                  v-model.trim="data.ruleForm.yanzhengma"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button
                  style="width: 100%"
                  type="primary"
                  @click="submitForm_mianmi()"
                  >免密登录_未开放</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div
            class="login_detail_index"
            :class="{
              login_detail_index_active2: data.login_fangfa[2].active === true,
            }"
          >
            <el-form
              label-position="top"
              :rules="data.rules"
              :model="data.ruleForm"
              ref="loginForm_mima"
              @keydown.enter="submitForm_mima"
            >
              <el-form-item label="手机号/邮箱/用户名" prop="username">
                <el-input
                  placeholder="你是一个一个一个"
                  type="text"
                  v-model.trim="data.ruleForm.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input
                  placeholder="不,不能看"
                  type="password"
                  v-model.trim="data.ruleForm.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button
                  style="width: 100%"
                  type="primary"
                  @click="submitForm_mima"
                  >立即登录</el-button
                ><!-- 这里简单写个键盘事件似乎不是全局监听的,鼠标选中可以监听但是直接敲键盘不触发
              我超那我为啥不直接给el-form加键盘监听呢..? -->
                <el-link type="primary" @click="toRegister" class="toRegister"
                  >去注册!</el-link
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="login_another">
          <p>其他登录方式</p>
          <ul>
            <li>
              <!-- <router-link
              :to="{ path: '/' + item.url }"
              v-for="item in data.login_another_fangfa"
              :key="item.img"
            >
              <img :src="item.img" :alt="item.introduction" />
            </router-link> -->
            </li>
          </ul>
          <p>未注册用户扫码后自动登录, 注册即代表同意</p>
          <span>
            <router-link to="/">服务条款</router-link> 和
            <router-link to="/">隐私协议</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import md5 from "js-md5";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import SyNavBar from "../../components/sy-navbar";
import { toSubmitForm_mima } from "./Login";

const loginForm_mima = ref(null);
const router = useRouter();
const login_introduction = ref(`Created at 2022-4-6`);
let data = reactive({
  login_fangfa: [
    {
      name: "微信登录",
      value: "weixin",
      active: false,
    },
    {
      name: "免密登录",
      value: "mianmi",
      active: false,
    },
    {
      name: "密码登录",
      value: "mima",
      active: true,
    },
  ],
  login_another_fangfa: [
    {
      name: "github",
      //url: "login_github",
      img: "https://s3.bmp.ovh/imgs/2022/03/70cf5524adc09632.jpg",
      introduction: "github",
    },
    {
      name: "QQ",
      //url: "login_qq",
      img: "https://s3.bmp.ovh/imgs/2022/03/bdba4466c0573821.jpg",
      introduction: "QQ",
    },
    {
      name: "baidu",
      //url: "login_baidu",
      img: "https://s3.bmp.ovh/imgs/2022/03/450b74064e31d62f.jpg",
      introduction: "baidu",
    },
  ],
  ruleForm: {
    phonenumber: "",
    yanzhengma: "",
    username: "",
    password: "",
  },
  checked: true,
  rules: {
    phonenumber: [
      { required: "true", message: "手机号不能为空", trigger: "blur" },
    ],
    yanzhengma: [
      { require: true, message: "验证码", trigger: "blur" },
      {
        min: 6,
        max: 6,
        message: "验证码应当为6位数",
        trigger: "blur",
      },
    ],
    username: [
      {
        require: true,
        message: "用户名",
        trigger: "blur",
      },
      {
        min: 3,
        max: 8,
        message: "用户名长度应当在3-7个字符之间",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur",
      },
      {
        min: 6,
        max: 12,
        message: "密码长度应当在6-12个字符之间",
        trigger: "blur",
      },
    ],
  },
});

const login_title_active = (params) => {
  //console.log(params);
  data.login_fangfa.forEach((item) => {
    item.active = false;
  });
  params.active = true;
};

function submitForm_mima() {
  if (
    localStorage.getItem("username") == data.ruleForm.username &&
    localStorage.getItem("passCard")
  ) {
    ElMessage.warning("你已登陆,有效期一周,请不要重复请求.");
  } else {
    localStorage.clear();
    loginForm_mima.value.validate(async (valid) => {
      if (valid) {
        toSubmitForm_mima({
          username: data.ruleForm.username,
          password: md5(data.ruleForm.password),
        }).then((res) => {
          if (res.data.status == true) {
            console.log(res.data.avatar);
            localStorage.setItem("passCard", res.data.token); //记得这里要存相应信息
            localStorage.setItem("username", res.data.userData.username);
            localStorage.setItem("avatar", res.data.userData.avatar);
            localStorage.setItem(
              "register_time",
              res.data.userData.register_time
            );
            window.location.href = "#/user";
          } else {
            ElMessage.error("报告:" + res.data.msg);
          }
        });
      } else {
        ElMessage.warning("请检查信息是否完整并符合规则.");
      }
    });
  }
}

const toRegister = () => {
  router.push("/register");
};
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

.el-form-item {
  padding: 10px;
}
</style>
<style scoped>
@import "../../assets/style/Login/Login.css";
.login_title_active {
  color: rgb(2, 2, 2);
}

.login_detail_index_active0 {
  display: block;
  color: rgb(35, 156, 249);
}

.login_detail_index_active1 {
  display: block;
  color: rgb(35, 156, 249);
}

.login_detail_index_active2 {
  display: block;
  color: rgb(35, 156, 249);
}
</style>
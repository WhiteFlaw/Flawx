<template>
  <sy-nav-bar></sy-nav-bar>
<!--   <div
    class="update_dialog"
    ref="dialog"
    :class="{
      update_dialog_active: data.update_dialog_active === true,
    }"
  >
    <p style="margin: 0 auto">名为{{ data.ruleForm.username }}</p>
    <p>的{{ data.ruleForm.sex }}啊</p>
    <p>你愿意作为另一个「人」继续生活下去麽?</p>

    <div style="margin-left: 100px; margin-top: 30px">
      <el-button type="primary" @click="cancelSubmit()">再想想</el-button>
      <el-button
        type="warning"
        style="margin-left: 50px"
        @click="submitForm()"
        plain
        >是的</el-button
      >
    </div>
  </div> -->
  <div class="update_body">
    <div class="update_container">
      <div class="update_user">
        <el-form :rules="data.rules" :model="data.ruleForm" ref="updateForm">
          <el-form-item label="新的昵称" prop="username">
            <el-input
              placeholder="必填,如无需求请填原用户名."
              type="text"
              v-model.trim="data.ruleForm.username"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="新的密码" prop="password">
            <el-input
              placeholder="必填,如无需求请填原密码."
              type="text"
              v-model.trim="data.ruleForm.password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="个人介绍" prop="motto">
            <el-input
              placeholder="新的个人介绍,非必填."
              type="text"
              v-model.trim="data.ruleForm.motto"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="tag1" prop="tag1">
            <el-input
              placeholder="标签1,非必填."
              type="text"
              v-model.trim="data.ruleForm.tag1"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="tag2" prop="tag2">
            <el-input
              placeholder="标签2,非必填."
              type="text"
              v-model.trim="data.ruleForm.tag2"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="tag3" prop="tag3">
            <el-input
              placeholder="标签3,非必填."
              type="text"
              v-model.trim="data.ruleForm.tag3"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="tag4" prop="tag4">
            <el-input
              placeholder="标签4,非必填."
              type="text"
              v-model.trim="data.ruleForm.tag4"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="你是一位?">
            <el-radio v-model="data.ruleForm.sex" label="绅士" size="large"
              >绅士</el-radio
            >
            <el-radio v-model="data.ruleForm.sex" label="淑女" size="large"
              >淑女</el-radio
            >
            <el-radio v-model="data.ruleForm.sex" label="机器人" size="large"
              >机器人</el-radio
            >
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 50%; margin-left: 120px"
              type="success"
              plain
              size="large"
              @click="showDialog()"
              >我弄好了!</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div class="update_avatar">
        <p>新的形象?</p>
        <ul>
          <li
            :class="{ update_avatar_active: item.active === true }"
            v-for="item in data.avatar"
            :key="item"
            @click="update_avatar_active(item)"
          >
            <img
              class="imga"
              :src="item.url"
              :alt="item.alt"
              style="height: 98%; width: 98%"
            />
          </li>
        </ul>
        <el-button
          @click="submitAvatar()"
          type="primary"
          size="large"
          plain
          style="margin-top: 118px; margin-left: 200px"
          >确认头像</el-button
        >
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
import { toUpdateUserData, toUpdateAvatar } from "./UpdateUser";

const updateForm = ref(null);
const dialog = ref(null);
const router = useRouter();
let data = reactive({
  ruleForm: {
    username: "",
    password: "",
    motto: "",
    tag1: "",
    tag2: "",
    tag3: "",
    tag4: "",
    sex: "机器人",
  },
  avatar: [
    {
      alt: "1",
      url: "https://s3.bmp.ovh/imgs/2022/04/16/53325b57ff0a1b7b.jpg",
      active: false,
    },
    {
      alt: "2",
      url: "https://s3.bmp.ovh/imgs/2022/04/16/9f50b84fbda1d0b3.jpg",
      active: false,
    },
    {
      alt: "3",
      url: "https://s3.bmp.ovh/imgs/2022/04/16/f9f0899ddb76d1eb.jpg",
      active: false,
    },
    {
      alt: "4",
      url: "https://s3.bmp.ovh/imgs/2022/04/16/db3ba4b8f88377c8.jpg",
      active: false,
    },
    {
      alt: "5",
      url: "https://s3.bmp.ovh/imgs/2022/04/16/e5a7e1c80730d09f.jpg",
      active: false,
    },
    {
      alt: "6",
      url: "https://s3.bmp.ovh/imgs/2022/04/16/0a51ff84b0485cf1.jpg",
      active: false,
    },
    {
      alt: "7",
      url: "https://s3.bmp.ovh/imgs/2022/04/16/1f647b5cde7f86a2.jpg",
      active: false,
    },
    {
      alt: "8",
      url: "https://s3.bmp.ovh/imgs/2022/04/16/53b85ba7601ee5af.jpg",
      active: false,
    },
  ],
  update_dialog_active: false,
  rules: {
    username: [
      {
        require: true,
        message: "喂,你没写名字.",
        trigger: "blur",
      },
      {
        min: 3,
        max: 8,
        message: "用户名长度应当在3-7字符之间.",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "这是要开公共账号?",
        trigger: "blur",
      },
      {
        min: 6,
        max: 12,
        message: "密码长度应为6-12个字符.",
        trigger: "blur",
      },
    ],
    motto: [
      {
        required: false,
        message: "motto将写入默认内容.",
        trigger: "blur",
      },
      {
        min: 0,
        max: 20,
        message: "motto至多20字.",
        trigger: "blur",
      },
    ],
    tag1: [
      { require: false, message: "tag将显示为空.", trigger: "blur" },
      {
        min: 0,
        max: 4,
        message: "tag至多4字.",
        trigger: "blur",
      },
    ],
    tag2: [
      { require: false, message: "tag将显示为空.", trigger: "blur" },
      {
        min: 0,
        max: 4,
        message: "tag至多4字.",
        trigger: "blur",
      },
    ],
    tag3: [
      { require: false, message: "tag将显示为空.", trigger: "blur" },
      {
        min: 0,
        max: 4,
        message: "tag至多4字.",
        trigger: "blur",
      },
    ],
    tag4: [
      { require: false, message: "tag将显示为空.", trigger: "blur" },
      {
        min: 0,
        max: 4,
        message: "tag至多4字.",
        trigger: "blur",
      },
    ],
  },
});

function submitForm() {
  updateForm.value.validate(async (valid) => {
    if (valid) {
      toUpdateUserData({
        username: data.ruleForm.username,
        password: md5(data.ruleForm.password),
        motto: data.ruleForm.motto,
        tag1: data.ruleForm.tag1,
        tag2: data.ruleForm.tag2,
        tag3: data.ruleForm.tag3,
        tag4: data.ruleForm.tag4,
        sex: data.ruleForm.sex,
        lastUsername: localStorage.getItem("username"),
      }).then((res) => {
        if (res.data.status == true) {
          setTimeout(goLogin, 3000);
          ElMessage.success(res.data.msg);
        } else {
          ElMessage.error(res.data.msg);
        }
      });
    } else {
      ElMessage.warning("请检查信息是否完整并符合规则.");
    }
  });
}

const update_avatar_active = (params) => {
  data.avatar.forEach((item) => {
    item.active = false;
  });
  params.active = true;
};

const submitAvatar = () => {
  let username = localStorage.getItem("username");
  data.avatar.forEach((item) => {
    if (item.active == true) {
      let avatar_active = item.url;
      toUpdateAvatar({
        username: username,
        avatar: avatar_active,
      }).then((res) => {
        if (res.data.status == true) {
          ElMessage.success(res.data.msg);
          localStorage.setItem("avatar", avatar_active);
        } else {
          ElMessage.error(res.data.msg);
        }
      });
    }
  });
};

const goLogin = () => {
  localStorage.clear();
  window.location.href = "#/login";
  ElMessage.success("请使用新的信息登录以更新通行证.");
};

const showDialog = () => {
  data.update_dialog_active = true;
};

const cancelSubmit = () => {
  data.update_dialog_active = false;
};
</script>

<style scoped>
@import "../../assets/style/UpdateUser/UpdateUser.css";
</style>
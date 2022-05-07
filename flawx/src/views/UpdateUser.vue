<template>
  <sy-nav-bar></sy-nav-bar>
  <div class="update_body">
    <div class="update_container">
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
        <div
          class="update_dialog"
          ref="dialog"
          :class="{
            update_dialog_active: data.update_dialog_active === true,
          }"
        >
          <p>名为{{ data.ruleForm.username }}</p>
          <p>的{{ data.ruleForm.sex }}啊</p>
          <p>
            你愿意作为另一个「人」继续生活下去麽?
          </p>
          <div style="margin-left: 100px; margin-top: 30px">
            <el-button type="primary" @click="cancelSubmit()">再想想</el-button>
            <el-button type="warning" style="margin-left: 50px" @click="submitForm()" plain
              >是的</el-button
            >
          </div>
        </div>
      </el-form>
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

<script>
import axios from "axios";
//axios.defaults.baseURL = "/api";
axios.defaults.baseURL = "http://8.130.48.246:3000";
import md5 from "js-md5";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import SyNavBar from "../components/sy-navbar";

export default {
  name: "UpdateUser",
  components: {
    SyNavBar,
  },
  setup() {
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
      //这个没加用户名重复验证,记得加
      updateForm.value.validate(async (valid) => {
        if (valid) {
          axios
            .post("/updateUser", {
              username: data.ruleForm.username,
              password: md5(data.ruleForm.password),
              motto: data.ruleForm.motto,
              tag1: data.ruleForm.tag1,
              tag2: data.ruleForm.tag2,
              tag3: data.ruleForm.tag3,
              tag4: data.ruleForm.tag4,
              sex: data.ruleForm.sex,
              lastUsername: localStorage.getItem("username"),
            })
            .then((res) => {
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
          axios
            .post("/user/updateAvatar", {
              username: username,
              avatar: avatar_active,
            })
            .then((res) => {
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

    return {
      data,
      submitForm,
      router,
      updateForm,
      showDialog,
      cancelSubmit,
      dialog,
      update_avatar_active,
      submitAvatar,
    };
  },
};
</script>

<style>
.update_body {
  width: 100%;
  height: 750px;
  background-color: rgb(241, 241, 241);
}

.update_container {
  position: relative;
  top: 100px;
  left: 9%;
  height: 500px;
  width: 500px;
  border-radius: 1%;
  background-color: #fff;
  padding: 50px;
}

.update_avatar .el-radio {
  padding-bottom: 25px;
}

.update_dialog {
  display: none;
}

.update_dialog_active {
  display: block;
  position: absolute;
  top: 25%;
  left: 67.5%;
  z-index:3000;
  border-radius: 3px;
  padding: 20px;
  height: 200px;
  width: 400px;
  background-color: rgb(241, 241, 241);
}

.update_dialog_active p:nth-child(1) {
  margin-top: 40px;
  margin-left: 50px;
}

.update_dialog_active p:nth-child(2) {
  margin-top: -22px;
  margin-left: 270px;
}

.update_dialog_active p:nth-child(3) {
  margin-top: 50px;
  margin-left: 5px;
  text-align: center;
  background-color: rgb(255, 0, 0);
}

.update_avatar {
  position: relative;
  top: -517px;
  left: 120%;
  height: 500px;
  width: 500px;
  border-radius: 1%;
  background-color: #fff;
  padding: 50px;
}

.update_avatar_active {
  background-color: rgb(149, 199, 255);
}

.update_avatar li {
  float: left;
  list-style-type: none;
  height: 105px;
  width: 105px;
  margin-left: 17px;
  margin-top: 17px;
  border-radius: 2%;
  overflow: hidden;
  background-color: #fff;
}
</style>
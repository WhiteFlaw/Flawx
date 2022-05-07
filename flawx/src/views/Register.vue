<template>
  <sy-nav-bar></sy-nav-bar>
  <div class="register_body">
    <div class="register_container">
      <el-form
        label-position="top"
        :rules="data.rules"
        :model="data.ruleForm"
        ref="register_form"
      >
        <el-form-item label="手机号/邮箱/用户名" prop="username">
          <el-input
            placeholder="请取个像人的名字."
            type="text"
            v-model.trim="data.ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="目前不支持找回,请记好."
            type="password"
            v-model.trim="data.ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submitForm"
            >就先这样吧.</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//axios.defaults.baseURL = "/api";
axios.defaults.baseURL = "http://8.130.48.246:3000";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import md5 from "js-md5";
import sd from "silly-datetime";
import SyNavBar from "../components/sy-navbar";

export default {
  name: "register",
  components: {
    SyNavBar,
  },
  setup() {
    const register_form = ref(null);
    let time = sd.format(new Date(), "YYYY-MM-DD HH:mm:ss");
    let data = reactive({
      ruleForm: {
        username: "",
        password: "",
      },
      checked: true,
      rules: {
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

    function submitForm() {
      if (localStorage.getItem("username") == data.ruleForm.username) {
        ElMessage.warning("不是我寻思你都登陆了还来注册啥啊(锤)?!");
      } else {
        localStorage.clear();
        register_form.value.validate(async (valid) => {
          if (valid) {
            axios
              .post("/doRegister", {
                username: data.ruleForm.username,
                password: md5(data.ruleForm.password),
              })
              .then((res) => {
                if (res.data.status == true) {
                  axios
                    .post("/doLogin", {
                      username: data.ruleForm.username,
                      password: md5(data.ruleForm.password),
                    })
                    .then((res) => {
                      if (res.data.status == true) {
                        let count = 5;
                        let timer = setInterval(() => {
                          if (count > 0 && count <= 5) {
                            count--;
                          } else {
                            clearInterval(timer);
                            timer = null;
                            window.location.href = "#/user";
                          }
                          ElMessage.success(
                            "成功了,自动跳转,但是" + count + "秒."
                          );
                        }, 1000);

                        localStorage.setItem("passCard", res.data.token); //记得这里要存相应信息
                        localStorage.setItem(
                          "username",
                          res.data.userData.username
                        );
                        localStorage.setItem(
                          "avatar",
                          res.data.userData.avatar
                        );
                        localStorage.setItem("register_time", time);
                      } else {
                        ElMessage.error("报告:" + res.data.msg);
                      }
                    });
                } else {
                  ElMessage.error("服务器开小差了(*￣▽￣*)||:" + res.data.msg);
                }
              });
          } else {
            ElMessage.warning("请检查信息是否完整并符合规则.");
          }
        });
      }
    }

    return {
      data,
      submitForm,
      register_form,
    };
  },
};
</script>
<style scoped>
.register_body {
  height:740px;
  width:100%;
  background-color: rgb(241, 241, 241);
}

.register_container {
  position: relative;
  top:150px;
  left:550px;
  width:400px;
  background-color: #fff;
  border-radius:2px;
}

.el-form-item {
  padding: 8px;
}

.el-form {
  padding:50px;
}
</style>
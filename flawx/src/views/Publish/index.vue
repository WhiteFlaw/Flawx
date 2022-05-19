<template>
  <sy-nav-bar></sy-nav-bar>
  <div class="publish_body">
    <div class="publish_main">
      <div class="publish_title">
        <p>
          Atten: 这个模块现在不支持保存,在你退出本页面后, 所有写下的内容将会清空.
        </p>
        <el-input
          type="text"
          v-model.trim="data.article_title"
          placeholder="Title There..."
        />
      </div>
      <div class="publish_content">
        <div class="editor" name="editor" id="editor" ref="editor"></div>
      </div>
      <el-button
        @click="publish_submitArticle"
        style="padding: 20px; margin-left: 10px"
        >发表文章</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import EWangEditor from "wangeditor";
import SyNavBar from "../../components/sy-navbar";
import { toPublish } from "./Publish";

let data = reactive({
  editorContent: "",
  article_title: "",
});
onMounted(() => {
  var editor = new EWangEditor("#editor");
  editor.config.uploadImgShowBase64 = true;
  editor.config.onchangeTimeout = 400; /* 配置触发 onchange 的时间频率，默认为 200ms */

  editor.config.customAlert = (err) => {
    console.log(err);
  };

  editor.customConfig = editor.customConfig
    ? editor.customConfig
    : editor.config;

  editor.customConfig.onchange = (html) => {
    data.editorContent = html;
  };

  let menuItem = [
    "head",
    "bold",
    "fontSize",
    "fontName",
    "italic",
    "underline",
    "indent",
    "lineHeight",
    "foreColor",
    "backColor",
    "link",
    "list",
    "justify",
    "image",
    "video",
  ];

  editor.config.menus = [...menuItem]; /* 自定义系统菜单 */
  // 配置颜色（文字颜色、背景色）
  editor.config.colors = ["#000000", "#eeece0", "#1c487f", "#4d80bf"];
  // 配置字体
  editor.config.fontNames = [
    "黑体",
    "仿宋",
    "楷体",
    "标楷体",
    "华文仿宋",
    "华文楷体",
    "宋体",
    "微软雅黑",
  ];
  editor.config.height = 500;

  editor.create();
});

function publish_submitArticle() {
  //article_content\article_title\article_authorname
  if (
    localStorage.getItem("username") &&
    data.editorContent.length > 20 &&
    data.article_title.length >= 3
  ) {
    toPublish({
      article_title: data.article_title,
      article_authorname: localStorage.getItem("username"),
      article_content: data.editorContent,
    }).then((res) => {
      if (res.data.status == true) {
        ElMessage.success("上传成功");
        window.location.href = "#/user";
      } else {
        ElMessage.error("报告:" + res.data.msg);
      }
    });
  } else if (!localStorage.getItem("username")) {
    ElMessage.error("请检查登陆状况.");
  } else if (!data.article_title.length >= 3) {
    ElMessage.warning("标题至少3字符,太短啦.");
  } else if (data.article_title.length >= 20) {
    ElMessage.warning("标题至多20字符, 太长啦.");
  } else {
    ElMessage.error(
      "这怎么能叫文章啊, 至少要够20字吧?!" + data.article_title.length
    );
  }
}
</script>
<style scoped>
@import "../../assets/style/Publish/Publish.css";
</style>
<template>
  <sy-nav-bar></sy-nav-bar>
  <div class="home_body">
    <el-collapse @change="handleChange">
      <el-collapse-item title="站内导航" name="1" style="margin-top: 40px">
        <el-link
          @click="clickNav(item.tag)"
          class="home_nav_detail"
          v-for="item in data.home_nav_detail"
          :key="item.alt"
          target="_blank"
          >{{ item.name }}</el-link
        >
      </el-collapse-item>
    </el-collapse>
    <div class="home_new">
      <div class="home_new_left">
        <li class="home_new_left_title" style="list-style-type: none">
          <img
            src="@/assets/20220107104621.png"
            alt="icon"
            style="height: 25px"
          />
          <p>推荐</p>
        </li>
        <div
          class="home_new_left_detail"
          @click="toArticle(data.home_new_left_detail.article_id)"
        >
          <img
            :src="data.home_new_left_detail.img"
            :alt="data.home_new_left_detail.alt"
            style="height: 100%; width: 100%"
          />
          <h2 v-text="data.home_new_left_detail.title"></h2>
          <p
            style="font-size: 18px"
            v-text="data.home_new_left_detail.text"
          ></p>
        </div>
      </div>
      <div class="home_new_mid">
        <sy-carousel
          v-model:home_new_mid_page_news="data.home_new_mid_page_news"
        ></sy-carousel>
      </div>
      <div class="home_new_right">
        <sy-carousel
          v-model:home_new_mid_page_news="data.home_new_mid_page_hot"
        ></sy-carousel>
      </div>
      <div class="home_adver_right">
        <el-carousel
          indicator-position="inside"
          autoplay="false"
          height="405px"
        >
          <el-carousel-item
            v-for="item in data.home_adver_right_index"
            :key="item"
            @click="toArticle(item.id)"
            ><!-- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ -->
            <img
              :src="item.url"
              :alt="item.alt"
              style="height: 100%; width: 100%"
            />
            <h3>{{ item.text }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="home_articleList">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in data.home_article_type"
          :label="item.label"
          :name="item.name"
          :key="item"
        >
          <ul
            v-infinite-scroll="load"
            class="infinite-list"
            style="overflow: auto"
          >
            <li
              v-for="i in data.home_article_content[item.id]"
              :key="i"
              class="infinite-list-item"
              @click="toArticle(i.article_id)"
            >
              <h3>{{ i.article_title }}</h3>
              <p v-html="i.article_content.substring(0, 30)"></p>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="home_timeList">
      <el-timeline class="home_timeList_detail">
        <el-timeline-item
          v-for="(activity, index) in data.activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :hollow="activity.hollow"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { MoreFilled } from "@element-plus/icons-vue";
import SyNavBar from "../components/sy-navbar";
import SyCarousel from "../components/sy-carousel";

export default {
  name: "Home",
  components: {
    SyNavBar,
    SyCarousel,
  },
  setup() {
    const loading = ref(true);
    const activeNames = ref(["1"]);
    const cardShow = ref(null);
    const cardShow2 = ref(null);
    const count = ref(0);
    const router = useRouter();
    let data = reactive({
      home_nav_user: { username: "未登录" },
      home_nav_detail: [
        //请求内容
        { name: "后端", tag: "backend", active: false },
        { name: "前端", tag: "frontend", active: false },
        { name: "算法", tag: "algorithm", active: false },
        { name: "设计", tag: "design", active: false },
        { name: "人工智能", tag: "ai", active: false },
        { name: "数据库", tag: "database", active: false },
        { name: "安全", tag: "security", active: false },
        { name: "杂项", tag: "else", active: false },
      ],
      home_new_left_detail: {
        img: "https://s3.bmp.ovh/imgs/2022/04/06/6da731882a64835f.gif",
        article_id: "", //YaBai的最新一篇文章id
        title: "2022-4-8 | Ver0.1.2更新",
        text: "点这了解此次更新",
        alt: "home_new_left_detail",
      }, //把这个绑定到后端，不然要天天换
      home_new_mid_title_img: [
        //不请求
        {
          url: "https://s3.bmp.ovh/imgs/2022/03/a8e2bb733453086b.png",
          id: 1,
          alt: "arrow_l",
          active: true,
          direction: "left",
        },
        {
          url: "https://s3.bmp.ovh/imgs/2022/03/2a6f0982c02436a8.png",
          id: 2,
          alt: "arrow_r",
          active: false,
          direction: "right",
        },
      ],
      home_new_right_title_img: [
        //不请求
        {
          url: "https://s3.bmp.ovh/imgs/2022/03/a8e2bb733453086b.png",
          id: 1,
          alt: "arrow_l",
          active: true,
          direction: "left",
        },
        {
          url: "https://s3.bmp.ovh/imgs/2022/03/2a6f0982c02436a8.png",
          id: 2,
          alt: "arrow_r",
          active: false,
          direction: "right",
        },
      ],
      home_new_mid_page_news: [],
      home_new_mid_page_hot: [],
      home_adver_right_index: [
        {
          url: "https://img-bss.csdn.net/1647926800463.jpg",
          text: "",
          alt: "",
        },
        {
          url: "https://img-bss.csdn.net/1648036050414.png",
          text: "",
          alt: "",
        },
        {
          url: "https://img-bss.csdn.net/1647921575623.png",
          text: "",
          alt: "",
        },
        {
          url: "https://img-bss.csdn.net/1647486977227.png",
          text: "",
          alt: "",
        },
      ],
      countTime: 3,
      load: true,
      home_article_type: [
        { label: "推荐", name: "first", id: 0 },
        { label: "热门", name: "second", id: 1 },
        { label: "关注", name: "third", id: 2 },
      ],
      home_article_content: [
        [],
        [],
        [
          {
            article_title: "offline",
            article_content: "'foucus' module coming soon...",
            article_id: 11,
          },
        ],
      ],
      activities: [
        {
          content: "offline",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: MoreFilled,
        },
        {
          content: "offline",
          timestamp: "2018-04-03 20:46",
          type: "success",
          color: "#0bbd87",
        },
        {
          content: "offline",
          timestamp: "2018-04-03 20:46",
          type: "warning",
          size: "large",
        },
        {
          content: "offline",
          timestamp: "2018-04-03 20:46",
          type: "danger",
          hollow: true,
        },
        {
          content: "offline",
          type: "info",
          timestamp: "2018-04-08 20:46",
        },
      ],
    });
    onMounted(() => {
      getLatestArticle();
      getHottestArticle();
      changeUserData();
      getChangelog();
      xxx();
    });

    const load = () => {
      count.value += 2;
    };

    const xxx = () => {
      data.countTime -= 1;
      if (data.countTime == 0) {
        data.load = false;
        clearInterval(interval);
      }
    };
    let interval = setInterval(xxx, 1000);
    function getChangelog() {
      axios.post("http://101.200.171.66:3000/getChangelog").then((res) => {
        //console.log(res.data[0].article_id);
        data.home_new_left_detail.article_id = res.data[0].article_id;
        data.home_new_left_detail.title = res.data[0].article_title;
      });
    }

    function changeUserData() {
      if (localStorage.getItem("username")) {
        data.home_nav_user.username = localStorage.getItem("username");
      }
    }

    function arrowClick(val) {
      //$ref在setup内会无法获取元素的ref属性值(vue3中没有$refs这一说),ref 需要在dom渲染完成后才会有，在使用的时候确保dom已经渲染完成,即mounted和以后。
      //在setup里"const 元素的ref属性值 = ref(null),然后return出去,再在mounted里"元素的ref属性值.value"即可
      if (val === "right") {
        cardShow.value.next();
      } else {
        cardShow.value.prev();
      }
    }

    function arrowClick2(val) {
      //$ref在setup内会无法获取元素的ref属性值,ref 需要在dom渲染完成后才会有，在使用的时候确保dom已经渲染完成。
      if (val === "right") {
        cardShow2.value.next();
      } else {
        cardShow2.value.prev();
      }
    }

    const clickNav = (params) => {
      router.push({
        path: "/category",
        query: {
          id: params,
        },
      });
    };
    const toArticle = (params) => {
      router.push({
        path: "/article",
        query: {
          id: params,
        },
      });
    };

    function getLatestArticle() {
      axios.get("http://101.200.171.66:3000/getLatestArticle").then((res) => {
        data.home_new_mid_page_news.push(
          [res.data[0], res.data[1], res.data[2], res.data[3]],
          [res.data[4], res.data[5], res.data[6], res.data[7]]
        );
        data.home_article_content[0] = res.data;
      });
    }

    function getHottestArticle() {
      axios.get("http://101.200.171.66:3000/getHottestArticle").then((res) => {
        data.home_article_content[1] = res.data;
        data.home_new_mid_page_hot.push(
          [res.data[0], res.data[1], res.data[2], res.data[3]],
          [res.data[4], res.data[5], res.data[6], res.data[7]]
        );
      });
    }
    return {
      data,
      load,
      activeNames,
      clickNav,
      toArticle,
      arrowClick,
      arrowClick2,
      cardShow,
      cardShow2,
    };
  },
};
</script>

<style>
.el-tabs {
  margin-left: 35px;
  width: 950px;
}

.el-tabs__nav {
  /* infinite-list-nav 横向位置*/
  margin-left: 0px;
  height: 70px;
  line-height: 70px;
}

.el-tabs__content {
  /* infinite-list-content 横向位置*/
  margin-left: -10px;
}

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
  background-color: #fff;
}

.el-collapse {
  position: relative;
  top: 45px;
}

.el-collapse-item__header {
  margin-left: 0;
  line-height: 45px;
  text-align: center;
  display: block;
}

*::-webkit-scrollbar {
  display: none;
}
</style>
<style scoped>
/* element的类样式不会受到加了scoped的样式影响,可以写一个不带scoped的样式来调整 */
.home_body {
  height: 1300px;
  width: 100%;
  background-color: rgb(241, 241, 241);
}

.infinite-list {
  height: 500px;
  padding: 10px;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  padding: 5px;
  margin: 5px;
  border-radius: 1%;
  height: 140px;
  border-bottom: 2px solid #000;
  background-color: #fff;
  border: 0.5px solid rgb(192, 191, 191);
}

.infinite-list .infinite-list-item:hover {
  background-color: rgb(247, 246, 246);
}

.el-carousel__item {
  background-color: #fff;
}

.el-carousel__item li {
  height: 24%;
}

.home_nav_detail {
  float: left;
  list-style-type: none;
  margin: 24px;
  color: rgb(102, 102, 102);
}

.home_new {
  position: relative;
  top: 110px;
  left: 70px;
  height: 435px;
  width: 1380px;
  border-radius: 1%;
}

.home_new_left_title img {
  float: left;
  margin-top: 12px;
}

.home_new_left_title p {
  padding: 10px;
}

.home_new_left_detail {
  position: absolute;
  top: 45px;
  left: 0px;
  height: 230px;
  width: 420px;
  border-radius: 1%;
  border: 0.5px solid rgb(192, 191, 191);
}

.home_new_left_detail h2 {
  position: absolute;
  top: 240px;
  font-size: 22px;
}

.home_new_left_detail p {
  position: absolute;
  top: 273px;
  color: rgb(170, 170, 170);
  font-size: 21px;
}

.home_new_mid {
  position: absolute;
  top: 0;
  left: 445px;
  height: 435px;
  width: 255px;
  color: rgba(34, 33, 33, 0.705);
  list-style-type: none;
}

.home_new_right {
  position: absolute;
  top: 0;
  left: 750px;
  height: 435px;
  width: 255px;
  color: rgba(34, 33, 33, 0.705);
  list-style-type: none;
}

.home_adver_right {
  position: absolute;
  top: 0;
  left: 1040px;
  height: 405px;
  width: 340px;
  border-radius: 1%;
  overflow: hidden;
  border: 0.5px solid rgb(192, 191, 191);
}

.home_articleList {
  position: relative;
  width: 1005px;
  top: 110px;
  left: 70px;
  height: 527px;
  border-radius: 1%;
  overflow: hidden;
  background-color: #fff;
  border: 0.5px solid rgb(192, 191, 191);
}

.home_timeList {
  position: relative;
  border-radius: 1%;
  top: -418px;
  left: 1110px;
  height: 525px;
  width: 341px;
  overflow: hidden;
  background-color: #fff;
  border: 0.5px solid rgb(192, 191, 191);
}

.home_timeList_detail {
  height: 100%;
  padding-top: 30px;
  padding-left: 30px;
}
</style>
<template>
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
        <div class="home_new_left_img">
          <img
            :src="data.home_new_left_detail.img"
            :alt="data.home_new_left_detail.alt"
            style="height: 100%; width: 100%"
          />
        </div>
        <div
          class="home_new_left_detail"
          @click="toArticle(data.home_new_left_detail.article_id)"
        >
          <h2 v-text="data.home_new_left_detail.title"></h2>
          <p
            style="font-size: 18px"
            v-text="data.home_new_left_detail.text"
          ></p>
        </div>
      </div>
      <div class="home_new_mid">
        <div class="home_new_mid_left">
          <sy-carousel :height="23.5" :width="15">
            <template #sy_carousel_content>
              <el-carousel-item
                v-for="(item, index) in data.home_new_mid_page_news"
                :key="item[index].article_id"
              >
                <li
                  class="awsl"
                  v-for="info in item"
                  :key="info.article_id"
                  @click="toArticle(info.article_id)"
                >
                  <h3 style="padding: 10px 0 0 10px">
                    {{ info.article_title.substring(0, 23) }}
                  </h3>
                  <p
                    style="padding: 0 15px 0 10px"
                    v-html="info.article_content.substring(0, 20)"
                  ></p>
                </li>
              </el-carousel-item>
            </template>
          </sy-carousel>
        </div>

        <div class="home_new_mid_right">
          <sy-carousel :height="23.5" :width="15">
            <template #sy_carousel_content>
              <el-carousel-item
                v-for="(item, index) in data.home_new_mid_page_hot"
                :key="item[index].article_id"
              >
                <li
                  class="awsl"
                  v-for="info in item"
                  :key="info.article_id"
                  @click="toArticle(info.article_id)"
                >
                  <h3 style="padding: 10px 0 0 10px">
                    {{ info.article_title.substring(0, 23) }}
                  </h3>
                  <p
                    style="padding: 0 15px 0 10px"
                    v-html="info.article_content.substring(0, 20)"
                  ></p>
                </li>
              </el-carousel-item>
            </template>
          </sy-carousel>
        </div>
      </div>
      <div class="home_new_right">
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
    <div class="home_article">
      <div class="home_articleList">
        <sy-tabs :sy_tab_data="data.home_article_type">
          <template v-slot="slotProps">
            <ul class="infinite-list" style="overflow: auto">
              <!-- 这里父组件要用子组件的数据item.id,考虑一下作用域插槽 -->
              <li
                v-for="i in data.home_article_content[slotProps.item.id]"
                :key="i"
                class="infinite-list-item"
                @click="toArticle(i.article_id)"
              >
                <h3>{{ i.article_title }}</h3>
                <p v-html="i.article_content.substring(0, 30)"></p>
              </li>
            </ul>
          </template>
        </sy-tabs>
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
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { MoreFilled } from "@element-plus/icons-vue";
import SyCarousel from "../../components/sy-carousel";
import SyTabs from "../../components/sy-tabs";
import {
  toGetChangeLog,
  toGetLatestArticle,
  toGetHottestArticle,
} from "./Home";

const cardShow = ref(null);
const cardShow2 = ref(null);
const router = useRouter();

let data = reactive({
  home_nav_user: { username: "未登录" },
  home_nav_detail: [
    { name: "后端", tag: "backend", active: false },
    { name: "前端", tag: "frontend", active: false },
    { name: "算法", tag: "algorithm", active: false },
    { name: "建模", tag: "design", active: false },
    { name: "数据库", tag: "database", active: false },
    { name: "安全", tag: "security", active: false },
    { name: "杂项", tag: "else", active: false },
  ],
  home_new_left_detail: {
    img: "https://s3.bmp.ovh/imgs/2022/04/06/6da731882a64835f.gif",
    article_id: "",
    title: "2022-4-8 | Ver0.1.2更新",
    text: "最新一次更新",
    alt: "home_new_left_detail",
  },
  home_new_mid_page_news: [],
  home_new_mid_page_hot: [],
  home_adver_right_index: [
    {
      url: "",
      text: "",
      alt: "",
    },
    {
      url: "",
      text: "",
      alt: "",
    },
    {
      url: "",
      text: "",
      alt: "",
    },
    {
      url: "",
      text: "",
      alt: "",
    },
  ],
  home_article_type: [
    { label: "推荐", name: "first", id: 0 },
    { label: "热门", name: "second", id: 1 },
  ],
  home_article_content: [[], []],
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
  getChangelog();
});

function getChangelog() {
  toGetChangeLog().then((res) => {
    //console.log(res.data[0].article_id);
    data.home_new_left_detail.article_id = res.data[0].article_id;
    data.home_new_left_detail.title = res.data[0].article_title;
  });
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
  toGetLatestArticle().then((res) => {
    data.home_new_mid_page_news.push(
      [res.data[0], res.data[1], res.data[2], res.data[3]],
      [res.data[4], res.data[5], res.data[6], res.data[7]]
    );
    data.home_article_content[0] = res.data;
  });
}

function getHottestArticle() {
  toGetHottestArticle().then((res) => {
    data.home_article_content[1] = res.data;
    data.home_new_mid_page_hot.push(
      [res.data[0], res.data[1], res.data[2], res.data[3]],
      [res.data[4], res.data[5], res.data[6], res.data[7]]
    );
  });
}
</script>

<style>
.el-collapse {
  position: relative;
  top: 0px;
}

.el-collapse-item__header {
  display: block;
  line-height: 45px;
  text-align: center;
  background-color: var(--color-light2);
}

.el-collapse-item__content {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  background-color: var(--color-light3);
}

.el-carousel p {
  font-size: 14px;
  transform: scale(0.9);
  transform-origin: left top;
}

.el-tabs__nav {
  height: 70px;
  line-height: 70px;
}
</style>
<style scoped>
/* element的类样式不会受到加了scoped的样式影响,可以写一个不带scoped的样式来调整 */
@import "../../assets/style/Home/Home.css";
</style>
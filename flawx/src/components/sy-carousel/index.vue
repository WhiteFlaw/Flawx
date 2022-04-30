<template>
  <li class="home_new_mid_title" style="list-style-type: none">
    <img
      :src="item.url"
      :alt="item.alt"
      v-for="item in data.home_new_mid_title_img"
      :key="item.id"
      @click="arrowClick(item.direction)"
    />
  </li>
  <div
    class="home_new_mid_carousel"
    v-loading="data.countTime"
    element-loading-background="rgb(241, 241, 241)"
    element-loading-text="Loading..."
  >
    <el-carousel
      indicator-position="none"
      :autoplay="true"
      height="360px"
      arrow="never"
      ref="cardShow"
    >
      <!-- 我不理解为什么这个B地方V加了data就undefined了但是不报错 -->
      <el-carousel-item
        v-for="(item, index) in home_new_mid_page_news"
        :key="item[index].article_id"
      >
        <li
          v-for="info in item"
          :key="info.article_id"
          @click="toArticle(info.article_id)"
        >
          <h3 style="padding: 15px 0 0 10px">
            {{ info.article_title.substring(0, 23) }}
          </h3>
          <p
            style="padding: 0 15px 0 10px"
            v-html="info.article_content.substring(0, 15)"
          ></p>
        </li>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  props: {
    home_new_mid_page_news: {
      type: Array,
    },
  },
  setup(props) {
    const cardShow = ref(null);
    const cardShow2 = ref(null);
    const count = ref(0);
    const router = useRouter();
    const home_new_mid_page_news = ref(props.home_new_mid_page_news);
    let data = reactive({
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
      countTime: 3,
      load: true,
    });
    onMounted(() => {
      xxx();
    });

    watch(
      () => props.home_new_mid_page_news,
      (newValue) => {
        home_new_mid_page_news.value = newValue;
        console.log(home_new_mid_page_news.value);
      }
    );

    const xxx = () => {
      data.countTime -= 1;
      if (data.countTime == 0) {
        data.load = false;
        clearInterval(interval);
      }
    };

    let interval = setInterval(xxx, 1000);

    function arrowClick(val) {
      //$ref在setup内会无法获取元素的ref属性值(vue3中没有$refs这一说),ref 需要在dom渲染完成后才会有，在使用的时候确保dom已经渲染完成,即mounted和以后。
      //在setup里"const 元素的ref属性值 = ref(null),然后return出去,再在mounted里"元素的ref属性值.value"即可
      data.load = false;
      if (val === "right") {
        cardShow.value.next();
      } else {
        cardShow.value.prev();
      }
    }

    function arrowClick2(val) {
      //$ref在setup内会无法获取元素的ref属性值,ref 需要在dom渲染完成后才会有，在使用的时候确保dom已经渲染完成。
      data.load = false;
      if (val === "right") {
        cardShow2.value.next();
      } else {
        cardShow2.value.prev();
      }
    }

    const toArticle = (params) => {
      router.push({
        path: "/article",
        query: {
          id: params,
        },
      });
    };

    return {
      cardShow,
      cardShow2,
      data,
      home_new_mid_page_news,
      arrowClick,
      arrowClick2,
      toArticle,
    };
  },
};
</script>

<style scoped>
.home_new_mid {
  position: absolute;
  top: 0;
  left: 445px;
  height: 435px;
  width: 255px;
  color: rgba(34, 33, 33, 0.705);
}

.home_new_mid_title {
  position: absolute;
  top: 5px;
  left: 220px;
}

.home_new_mid_carousel li {
  margin: 2px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  height: 24%;
}

.home_new_mid_carousel li:hover {
  background-color: rgb(247, 246, 246);
}

.home_new_mid_title img {
  height: 23px;
  padding: 3px;
}

.home_new_mid_carousel {
  position: absolute;
  top: 45px;
  height: 360px;
  width: 250px;
  border-radius: 1%;
  overflow: hidden;
  border: 1px solid rgb(192, 191, 191);
  list-style-type: none;
}
</style>
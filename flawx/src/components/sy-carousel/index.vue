<!--横向尺寸, 纵向尺寸, 内容, 箭头位置(v-if-else) -->
<template>
  <div
    class="sy_carousel"
    :style="[size.sy_carousel_height, size.sy_carousel_width]"
  >
    <!-- 这里直接返回宽高 -->
    <li class="sy_carousel_title" style="list-style-type: none">
      <img
        :src="item.url"
        :alt="item.alt"
        v-for="item in data.sy_carousel_title_img"
        :key="item.id"
        @click="arrowClick(item.direction)"
      />
    </li>
    <div
      class="sy_carousel_loading"
      v-loading="data.countTime"
      element-loading-background="rgb(241, 241, 241)"
      element-loading-text="Loading..."
    >
      <!-- 这里style应该显示被缩小化的宽,height传入被处理过的高 -->
      <el-carousel
        :style="size.el_carousel_width"
        indicator-position="inside"
        :autoplay="true"
        :interval="5000"
        :height="size.el_carousel_height"
        arrow="never"
        ref="cardShow"
      >
        <slot name="sy_carousel_content"></slot>
        <!-- 我不理解为什么这个B地方V加了data就undefined了但是不报错 -->
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  props: {
    height: {
      type: [String, Number],
      default: "",
    },
    width: {
      type: [String, Number],
      default: "",
    },
  },
  computed: {
    size() {
      let sy_carousel_width = `width: ${this.width}px`;
      let sy_carousel_height = `height: ${this.height}px`;
      let el_carousel_width = `width: ${this.width}px`;
      let el_carousel_height = `${this.height * 0.89}px`;
      return {
        sy_carousel_width,
        sy_carousel_height,
        el_carousel_width,
        el_carousel_height,
      };
    },
  },
  setup(props) {
    const router = useRouter();
    const cardShow = ref(null);
    const cardShow2 = ref(null);

    let data = reactive({
      sy_carousel_title_img: [
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
      data,
      cardShow,
      cardShow2,
      arrowClick,
      arrowClick2,
      toArticle,
    };
  },
};
</script>

<style scoped>
.sy_carousel {
  position: absolute;
  top: 0;
  left: 0px;
  color: rgba(34, 33, 33, 0.705);
}

.sy_carousel_title {
  position: absolute;
  top: 15px;
  right: 0px;
}

.sy_carousel_title img {
  height: 23px;
  padding: 3px;
}

.sy_carousel_loading {
  position: absolute;
  top: 45px;
  border-radius: 1%;
  overflow: hidden;
  border: 1px solid rgb(192, 191, 191);
}
</style>
<template>
  <div class="sy-pagination" :class="[size]">
    <ul class="sy-pagination_screen">
      <li
        class="sy-pagination_article"
        v-for="item in data.user_article_content"
        :key="item"
        style="text-decoration: none; color: #000"
      >
        <p @click="toArticle('/article?id=' + item.article_id)">
          {{ item.article_title }}
        </p>
        <span
          style="position: absolute; right: 70px; color: red"
          @click="deleteArticle(item.article_id)"
          >删除</span
        >
        <span style="position: absolute; right: 140px; color: #409eff;"
          >编辑</span
        >
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="user_article_content_page * 10"
      class="el_pagination"
      v-model:current-page="data.currentPage"
      @current-change="currentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
    />
  </div>
</template>

<script>
import { onUpdated, ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  props: {
    newArr: {
      type: Array,
    },
    user_article_content_page: {
      type: Number,
    },
    size: {
      type: String,
    },
  },
  computed: {
    size() {
      return this.size ? `sy-pagination-${this.size}` : "";
    },
  },

  emits: ["deleteArticle"],
  setup(props, { emit }) {
    let data = reactive({
      currentPage: 1,
      user_article_content: "",
    });
    const router = useRouter();
    const newArr = ref(props.newArr);
    const user_article_content_page = ref(props.user_article_content_page);

    onUpdated(() => {
      //不在渲染完毕之后调用一下, pagination页内容显示不出来
      currentChange();
    }),
      //分好页的信息
      watch(
        () => props.newArr,
        (newValue, oldValue) => {
          newArr.value = newValue;
          //console.log(newArr.value);
        }
      );

    //总页数
    watch(
      () => props.user_article_content_page,
      (newValue, oldValue) => {
        user_article_content_page.value = newValue;
        //console.log(user_article_content_page.value);
      }
    );

    watch(
      () => data.user_article_content,
      (newValue, oldValue) => {
        data.user_article_content = newValue;
      }
    );

    const currentChange = () => {
      data.user_article_content = newArr.value[data.currentPage - 1];
      //console.log(data.currentPage);
    };

    const prevClick = () => {
      data.currentPage - 1;
      data.user_article_content = newArr.value[data.currentPage];
      //console.log(data.currentPage);
    };

    const nextClick = () => {
      data.currentPage + 1;
      data.user_article_content = newArr.value[data.currentPage];
    };

    const toArticle = (params) => {
      router.push(params);
    };

    const deleteArticle = (id) => {
      emit("deleteArticle", id); //在这里成功传出id之后,父组件接收不需要传进去参数,直接调用函数,不用写形参,直接函数内输出id就可以拿到
    };

    return {
      data,
      newArr,
      user_article_content_page,
      toArticle,
      currentChange,
      prevClick,
      nextClick,
      deleteArticle,
    };
  },
};
</script>

<style scoped>
.sy-pagination,
.sy-pagination_empty {
  position: relative;
  top: 110px;
  left: 265px;
  border-radius: 1%;
  padding: 25px;
  background-color: rgb(255, 255, 255);
}

.sy-pagination-mini,
.sy-pagination_empty-mini {
  height: 300px;
}

.sy-pagination-middle,
.sy-pagination_empty-middle {
  height: 350px;
  width: 850px;
}

.sy-pagination-large {
  height: 605px;
  width: 995px;
}

.el-pagination {
  position: absolute;
  top: 90%;
  left: 35%;
}

.sy-pagination_screen {
  border-radius: 1%;
  background-color: rgb(255, 255, 255);
}

.sy-pagination_article {
  border-radius: 2px;
  overflow: hidden;
  padding: 20px;
  border-bottom: 0.5px solid rgb(192, 191, 191);
  list-style-type: none;
}

.sy-pagination_article:hover {
  background-color: rgb(248, 248, 248);
  border-bottom: 0.5px solid rgb(192, 191, 191);
}
</style>
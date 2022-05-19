<template>
  <div class="sy-pagination" :class="[size]">
    <ul class="sy-pagination_screen">
      <li
        class="sy-pagination_article"
        v-for="item in data.user_article_content"
        :key="item"
        style="text-decoration: none; color: #000"
      >
        <p
          @click="toArticle('/article?id=' + item.article_id)"
          style="float: left"
        >
          {{ item.article_title }}
        </p>
        <div class="sy-pagination-action">
          <span @click="deleteArticle(item)" class="sy-pagination-delete"
            >删除</span
          >
          <span class="sy-pagination-edit">编辑</span>
        </div>
      </li>
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
    </ul>
  </div>
</template>

<script setup>
import {
  onUpdated,
  ref,
  reactive,
  //defineProps,  defineProps不再需要引入
  //defineEmits, defineEmits不再需要引入
  watchEffect,
  computed, //nmmd没引入computed, 这个组件内出错, 会导致所有引入这个组件的页面在某行报错, 而且报错行不是真正错的那行
} from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  newArr: {
    type: Array,
    default: [],
  },
  user_article_content_page: {
    type: Number,
  },
  size: {
    type: String,
  },
});

const size = computed(() => {
  return props.size ? `sy-pagination-${props.size}` : "";
});

const emit = defineEmits(["deleteArticle"]); //发送事件时使用的方法名要与这里的变量名一致

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
});

watchEffect(() => {
  newArr.value = props.newArr;
});

//总页数
watchEffect(() => {
  user_article_content_page.value = props.user_article_content_page;
});

const currentChange = () => {
  //这里一定不要先给currentPage-1, 不然onMounted开局的那次调用会把第一页吞掉
  data.user_article_content = newArr.value[data.currentPage - 1];
  //console.log(data.currentPage);
};

const prevClick = () => {
  data.user_article_content = newArr.value[data.currentPage - 1];
  //console.log(data.currentPage);
};

const nextClick = () => {
  data.currentPage + 1;
  data.user_article_content = newArr.value[data.currentPage];
};

const toArticle = (params) => {
  router.push(params);
};

const deleteArticle = (item) => {
  emit("deleteArticle", item); //在这里成功传出id之后,父组件接收不需要传进去参数,直接调用函数,不用写形参,直接函数内输出id就可以拿到
};
</script>

<style scoped>
.sy-pagination {
  display: flex;
  padding: 25px;
  border-radius: 3px;
  justify-content: center;
  background-color: rgb(255, 255, 255);
}

.sy-pagination-mini,
.sy-pagination_empty-mini {
  height: 300px;
}

.sy-pagination-middle,
.sy-pagination_empty-middle {
  height: 350px;
}

.sy-pagination-large,
.sy-pagination_empty-large {
  height: 605px;
}

.sy-pagination_screen {
  display: flex;
  width: 95%;
  border-radius: 3px;
  align-items: center;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
}

.sy-pagination_article {
  display: flex;
  width: 100%;
  padding: 20px;
  margin-bottom: 1rem;
  border-radius: 3px;
  overflow: hidden;
  list-style-type: none;
  justify-content: space-between;
  border-bottom: 0.5px solid rgb(192, 191, 191);
}

.sy-pagination_article:hover {
  background-color: rgb(248, 248, 248);
}

.sy-pagination_article span:nth-child(2):hover {
  border-radius: 5px;
  background-color: rgb(243, 200, 200);
}

.sy-pagination-action {
  display: flex;
  margin-right: 2rem;
}
.sy-pagination-delete {
  color: rgb(250, 55, 55);
  margin-right: 2rem;
}
</style>
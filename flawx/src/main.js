import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ElUpload, ElDialog, ElLoading, ElEmpty, ElMessage, ElTabs, ElInfiniteScroll, ElForm, ElFormItem, ElInput, ElCollapse, ElLink, ElBreadcrumb, ElBreadcrumbItem, ElAvatar, ElCarousel, ElPageHeader, ElTimeline, ElTag, ElButton, ElTree, ElPagination, ElIcon, ElRadio } from 'element-plus'
import '../node_modules/element-plus/theme-chalk/index.css';

const app = createApp(App)
app.use(router) //vue3里不要use(axios),会导致调用栈溢出,用app.config.globalProperties.$http = axios
    .use(ElLoading)
    .use(ElMessage)
    .use(ElTabs)
    .use(ElForm)
    .use(ElFormItem)
    .use(ElInput)
    .use(ElCollapse)
    .use(ElInfiniteScroll)
    .use(ElLink)
    .use(ElBreadcrumb)
    .use(ElBreadcrumbItem)
    .use(ElPageHeader)
    .use(ElAvatar)
    .use(ElTimeline)
    .use(ElCarousel)
    .use(ElTag)
    .use(ElButton)
    .use(ElInput)
    .use(ElTree)
    .use(ElPagination)
    .use(ElIcon)
    .use(ElRadio)
    .use(ElEmpty)
    .use(ElDialog)
    .use(ElUpload)

app.mount('#app');


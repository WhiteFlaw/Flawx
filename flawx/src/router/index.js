import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/Article.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../views/Category.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/laws',
    name: 'Laws',
    component: () => import('../views/Laws.vue')
  },
  {
    path: '/user/publish',
    name: 'Publish',
    component: () => import('../views/Publish.vue')
  },
  {
    path: '/user/updateuser',
    name: 'Updateuser',
    component: () => import('../views/UpdateUser.vue')
  },
  {
    path: '/user/allArticle',
    name: 'AllArticle',
    component: () => import('../views/AllArticle.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const passCard = window.localStorage.getItem("passCard");  //目前看到有已登录但无法进入用户中心的情况
  if (to.path === "/login" || to.path === "/register" || to.path === "/") {
    return next()
  } else if (!passCard) {
    return next("/login")
  } else {
    next();
  }
});

export default router

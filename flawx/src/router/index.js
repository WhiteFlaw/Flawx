import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/Article')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../views/Category')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register')
  },
  {
    path: '/laws',
    name: 'Laws',
    component: () => import('../views/Laws')
  },
  {
    path: '/user/publish',
    name: 'Publish',
    component: () => import('../views/Publish')
  },
  {
    path: '/user/updateuser',
    name: 'Updateuser',
    component: () => import('../views/UpdateUser')
  },
  {
    path: '/user/allArticle',
    name: 'AllArticle',
    component: () => import('../views/AllArticle')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const passCard = window.localStorage.getItem("passCard");
  if (to.path === "/login" || to.path === "/register" || to.path === "/") {
    return next()
  } else if (!passCard) {
    return next("/login")
  } else {
    next();
  }
});

export default router

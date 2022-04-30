<template>
  <!-- 在此处写页面底部法律之类,不要用fixed固定定位 -->
  <router-view />
</template>
<script>
export default {
  setup() {

  },
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 14px;
  background-color: rgb(255, 255, 255);
}

#nav a {
  font-weight: bold;
  color: #161616;
}

#nav a.router-link-exact-active {
  color: #636363;
}
</style>

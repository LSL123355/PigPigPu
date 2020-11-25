<!-- layout blog.vue -->
<!-- blog.vue 布局会应用指定 layout 为 blog 的页面 -->
<template>
  <div>
    <!-- 页头 -->
    <Navbar :menu="menu" :search="search" :user="user" />

    <!-- pages 里面的模板会被渲染到这个 Nuxt 标签里  -->
    <Nuxt />

    <!-- 页脚 -->
    <Footer />
  </div>
</template>


<!-- 针对使用 store layout 的 添加样式 -->
<script>
export default {
  data() {
    return {
      search: {
          name: "name",
          placeholder: "请输入关键字",
          buttonText: "搜索",
        },
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    menu() {
      return this.$store.state.global.menu;
    }
  },
};
</script>


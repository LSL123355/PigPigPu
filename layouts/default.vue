<!-- layout default.vue -->
<!-- 布局会应用到所有 pages 页面 -->
<template>
  <div>
    <!-- 页头 -->
    <Navbar  />
    <!-- pages 里面的模板会被渲染到这个 Nuxt 标签里  -->
    <Nuxt />
  </div>
</template>

<script>
export default {
  // 在页面和布局文件中添加 外联 css 和 script 和 在 nuxt.config.js 中添加语法不一样
  // 在 nuxt.config.js 中类似 对象定义方法
  // 在页面和布局文件中 是 head() 方法和执行并有返回值
  head() {
    return {
      link: [{ rel: "stylesheet/less", href: "/styles/test.less" }],
      script: [
        // {
        //   src: "/script/less.js",
        // },
      ],
    };
  },
  data() {
    return {
      search: null,
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


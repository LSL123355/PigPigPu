<template>
  <div class="overflow-auto">
    <!-- :link-gen -->
    <!-- link-gen 指向一个方法   -->
    <!-- 方法定义在 script 的 methods 里面 -->
    <!-- 生成页码链接时，将页码通过这个方法做一个包装  -->
    <!-- 这个方法返回的字符串就是对应页码的链接 -->
    <!-- :number-of-pages -->
    <!-- 组件生成的总页数 -->
    <!-- use-router -->
    <!-- 使用路由功能 -->
    <!-- v-model -->
    <!-- 检查传进来的 currentPage 属性，对应这个值，将会作为当前页面使用 -->
    <b-pagination-nav
      :link-gen="linkGen"
      :number-of-pages="allPage"
      use-router
    ></b-pagination-nav>
  </div>
</template>

<script>
export default {
  // 组件公开的属性接口
  // 一旦遇到不传值时，就会出错
  // props: ["allPage"],
  // 使用带默认值的 组件公开接口定义方法
  props :{
    allPage:{
      // 期望传进来的是一个数值
      type:Number,
      // 当没有传该属性值进来的时候 会调用这个方法生成一个可用的默认值
      default:1,
    },
  },
  methods: {
    linkGen(pageNum) {
      // 如果页面是1，表示就在blog的首页
      // 如果不是1，表示需要到对应页码的页面
      // ? 表示后面会接对应的参数(key=value 键值对)
      // 如果后面没有参数，就会省略这个 ?
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
  },
};
</script>
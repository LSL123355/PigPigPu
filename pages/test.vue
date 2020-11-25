<template>
  <b-container>
    <!-- 默认的响应式栅格 是把宽度分成12分  -->
    <!-- b-col 占用多少份 使用 cols 来设置的  -->
    <!-- 响应式 cols 设置的份数 是最小尺寸往上有效 -->
    <!-- 如果更大尺寸需要修改 需要对大尺寸断点如： -->
    <!--  特小 (xs)<576px 就是 cols设置的份数	
            小 (sm) ≥576px	
            中等 (md) ≥768px	
            大 (lg) ≥992px	
            特大 (xl) ≥1200px 
      -->
    <b-row class="main-container">
      <!-- 通过不同的 尺寸定占用尺寸的份数，来根据屏幕显示设计页面的布局 -->
      <b-col cols="12" lg="8">
        <!-- 组件名称是大小写敏感的 -->
        <BlogPost v-for="item in blog" :key="item.id" :blog="item" />
        <!-- 分页组件 -->
        <PageNav />
      </b-col>
      <b-col cols="12" lg="4">
        <!-- 右边的链接列表 -->
        <BlogSidebar />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
let blog = [
  {
    id: 0,
    title: "Sample blog post",
    date: "January 1, 2014",
    author: "Mark",
    authorLink: "/author/Mark",
    note: `<p>This blog post shows a few different types of content that's supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p><p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>`,
  },
  {
    id: 1,
    title: "Sample blog post",
    date: "January 1, 2014",
    author: "Mark",
    authorLink: "/author/Mark",
    note: `<p>This blog post shows a few different types of content that's supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p><p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>`,
  },
  {
    id: 2,
    title: "Sample blog post",
    date: "January 1, 2014",
    author: "Mark",
    authorLink: "/author/Mark",
    note: `<p>This blog post shows a few different types of content that's supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p><p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>`,
  },
  {
    id: 3,
    title: "Sample blog post",
    date: "January 1, 2014",
    author: "Mark",
    authorLink: "/author/Mark",
    note: `<p>This blog post shows a few different types of content that's supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p><p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>`,
  },
  {
    id: 4,
    title: "Sample blog post",
    date: "January 1, 2014",
    author: "Mark",
    authorLink: "/author/Mark",
    note: `<p>This blog post shows a few different types of content that's supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p><p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>`,
  },
];
export default {
  data() {
    return {
      blog,
    };
  },
};
</script>

<style lang="less" scoped>
.main-container {
  padding: 80px 0;
}
.test-bg {
  background-color: gray;
}
.test-bg-l {
  background-color: lightgray;
}
</style>

<template>
  <b-container class="blog-post">
    <!-- {{ title }} 会被 script 内 data() 返回对象中的 title 属性值替换  -->
    <h2 class="blog-post-title">{{ title }}</h2>
    <p class="blog-post-meta">
      {{ date }} by <a :href="authorLink">{{ author }}</a>
    </p>
    <div class="blog-post-note" v-html="note"></div>
  </b-container>
</template>

<script>
// 默认显示数据
// 如果显示这个，代表外面没有传任何数据进来
let defaultBlogData = {
  id: 0,
  title: "标题",
  date: "日期",
  author: "作者",
  authorLink: "/#",
  note: `正文`,
};
export default {
  // props 定义 'blog' 的属性，用于接受外面传给组件的数据
  props: ["blog"],
  data() {
    // 判断外面传进来的 blog 数据是否为空
    if (this.blog) {
      // 有，使用外面传进来的 blog 数据对象
      // 直接将传进来的对象，公开给 template 使用
      return this.blog;
      // 等价于下面
      // {
      //   title: this.blog.title,
      //   date: this.blog.date,
      //   author: this.blog.author,
      //   authorLink: this.blog.authorLink,
      //   note: this.blog.note,
      // };
    } else {
      // 没有使用默认数据，避免报错页面
      return defaultBlogData;
    }
  },
};
</script>

<style lang="less" scoped>
.blog-post {
  margin: 30px auto;
  font-family: "Playfair Display", Georgia, "Times New Roman", serif;

  .blog-post-title {
    margin-bottom: 0.25rem;
    font-size: 2.5rem;
  }
  .blog-post-meta {
    margin-bottom: 1.25rem;
    color: #999;
  }
  .blog-post-note {
    margin-bottom: 1.25rem;
  }
}
</style>
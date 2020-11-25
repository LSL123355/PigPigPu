<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <!-- b-container 是一个容器 会根据不同尺寸 调整内部的内容显示 -->
    <b-container fluid="sm">
      <b-breadcrumb :items="items"></b-breadcrumb>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Index",
          href: "#",
        },
        {
          text: "Manage",
          href: "#",
        },
        {
          text: "Library",
          active: true,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.breadcrumb {
  background-color: unset;
  margin-bottom: 0px;
}
.breadcrumb-item {
  a {
    color: rgba(255, 255, 255, 0.5);

    &:hover {
      color: rgba(255, 255, 255, 0.75);
    }
  }

  &.active {
    color: rgba(255, 255, 255, 0.75);
  }
}
</style>
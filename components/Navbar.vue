<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-container>
      <b-navbar-brand to="/">
        <img src="https://i.loli.net/2020/11/23/mf8kvZBMI1yuhCT.png" alt="">
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- 会塌陷隐藏的菜单集合 -->
      <b-collapse id="nav-collapse" is-nav>
        <!-- 真正导航菜单 -->
        <b-navbar-nav class="mx-4">
          <!-- 导航菜单的选项 -->
          <!-- 使用 布尔值属性 disabled 可以禁用 菜单的点击 -->
          <b-nav-item v-for="item in menu" :key="item.id" :to="item.url">{{
            item.name
          }}</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <!-- bootstrap 是直接使用 class 名称来应用已经定好的CSS样式 -->
        <!-- class ml-auto 的效果是元素左边的空余是自动，即居右  -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="user" class="px-3 col-auto">
            <!-- Using 'button-content' slot -->
            <!-- 预留给登陆用的用户名显示插槽 -->
            <template v-slot:button-content>{{ user.nickName }}</template>
            <b-dropdown-item
              v-for="item in userMenu"
              :key="item.id"
              :to="item.url"
              >{{ item.name }}</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-navbar-nav right v-else class="px-3 col-auto">
            <!-- <b-nav-item to="/account/login">登录</b-nav-item> -->
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default() {
        return null;
      },
    },
    search: {
      type: Object,
      default() {
        return null;
      },
    },
    menu: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    userMenu() {
      if (this.user && this.user.userMenu) {
        let path = this.$route.path;
        console.log(`path: ${path}`);
        let currentMenu = this.user.userMenu[path];
        if (!currentMenu) {
          currentMenu = this.user.userMenu["default"];
          console.log("currentMenu: %O", currentMenu);
        }
        return currentMenu;
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
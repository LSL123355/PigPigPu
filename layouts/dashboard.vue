<template>
  <div>
    <!-- -->
    <b-navbar
      toggleable="lg"
      class="sticky-top flex-lg-nowrap p-0 shadow"
      type="dark"
      variant="dark"
    >
      <b-navbar-brand class="col-lg-3 col-xl-2 mr-0 px-3" to="/">
        <img src="https://i.loli.net/2020/11/23/mf8kvZBMI1yuhCT.png" alt="" />
        统一消息中心
      </b-navbar-brand>
      <b-navbar-toggle
        target="nav-collapse"
        class="position-absolute d-lg-none"
      ></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-4">
          <b-nav-item v-for="item in menu" :key="item.id" :to="item.url">{{
            item.name
          }}</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="user" class="px-3 col-auto">
            <template v-slot:button-content>{{ user.nickName }}</template>
            <b-dropdown-item
              v-for="item in userMenu"
              :key="item.id"
              :to="item.url"
              >{{ item.name }}</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-navbar-nav right v-else class="px-3 col-auto">
            <b-nav-item to="/account/login">登录</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="container-fluid">
      <div class="row">
        <nav
          id="sidebarMenu"
          class="col-md-3 col-lg-3 col-xl-2 d-md-block bg-light sidebar collapse"
        >
          <div class="sidebar-sticky">
            <b-nav vertical class="pt-4">
              <b-navbar-brand href="/admin/Default">
                <img src="/images/默认账号.png" alt="" />
                默认账号设置
              </b-navbar-brand>
              <b-navbar-brand href="/admin/Application">
                <img src="/images/应用管理.png" alt="" />
                应用管理
              </b-navbar-brand>

              <!-- <b-navbar toggleable> -->
                <b-navbar-brand href="#"  toggleable>
                  <img src="/images/日志管理.png" alt="" />
                  日志管理

                <b-navbar-toggle target="navbar-toggle-collapse">
                  <template #default="{ expanded }">
                    <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
                    <b-icon v-else icon="chevron-bar-down"></b-icon>
                  </template>
                </b-navbar-toggle>
            </b-navbar-brand>
                <b-collapse id="navbar-toggle-collapse" is-nav>
                  <b-navbar-nav class="ml-auto">
                    <b-nav-item href="#">
                      <img src="/images/小方块.png" alt="" />
                      接口调用日志
                    </b-nav-item>
                    <b-nav-item href="#">
                      <img src="/images/小方块.png" alt="" />
                      消息推送日志
                    </b-nav-item>
                    <b-nav-item href="#">
                      <img src="/images/小方块.png" alt="" />
                      操作日志
                    </b-nav-item>
                  </b-navbar-nav>
                </b-collapse>
              </b-navbar>

              <b-navbar-brand href="/admin/System">
                <img src="/images/系统管理.png" alt="" />
                系统管理
              </b-navbar-brand>
            </b-nav>
          </div>
        </nav>

        <Nuxt />
      </div>
    </div>
  </div>
</template>

<!-- 针对使用 store layout 的 添加样式 -->
<script>
import HomeIcon from "vue-feather-icons/icons/HomeIcon.js";
import FileIcon from "vue-feather-icons/icons/FileIcon.js";
import ShoppingCartIcon from "vue-feather-icons/icons/ShoppingCartIcon.js";
import UsersIcon from "vue-feather-icons/icons/UsersIcon.js";
import BarChart2Icon from "vue-feather-icons/icons/BarChart2Icon.js";
import LayersIcon from "vue-feather-icons/icons/LayersIcon.js";
import FileTextIcon from "vue-feather-icons/icons/FileTextIcon.js";
import PlusCircleIcon from "vue-feather-icons/icons/PlusCircleIcon.js";

export default {
  middleware: "auth",
  components: {
    HomeIcon,
    FileIcon,
    ShoppingCartIcon,
    UsersIcon,
    BarChart2Icon,
    LayersIcon,
    FileTextIcon,
    PlusCircleIcon
  },
  head() {
    return {
      // link: [{ rel: "stylesheet/less", href: "/styles/test.less" }],
      script: [
        {
          src: "/script/less.js"
        }
      ]
    };
  },
  data() {
    return {
      search: {
        name: "name",
        placeholder: "请输入用户名称",
        buttonText: "查找用户"
      }
    };
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },
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
    }
  }
};
</script>

<style lang="less" scoped>
body {
  font-size: 0.875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 767.98px) {
    top: 5rem;
  }
  .sidebar-sticky {
    background-color: #283748;
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */

    @supports ((position: -webkit-sticky) or (position: sticky)) {
      position: -webkit-sticky;
      position: sticky;
    }

    .nav-link.nuxt-link-exact-active {
      font-weight: bolder;
      background-color: rgba(42, 41, 49, 0.781);
    }

    .sidebar-heading {
      font-size: 0.75rem;
      text-transform: uppercase;
    }
  }

  & .nav-link {
    font-weight: 500;
    color: white;

    &.active {
      color: #007bff;
    }

    &:hover .feather,
    &.active .feather {
      color: inherit;
    }
  }
}

/*
 * Navbar
 */
.navbar {
  .navbar-brand {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  & .navbar-toggler {
    top: 0.5rem;
    right: 1rem;
  }
}
</style>

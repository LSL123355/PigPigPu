<template>
  <b-container class="account-container">
    <b-card :title="title" tag="article" class="account-box">
      <b-card-text>
        {{ message }}
      </b-card-text>

      <b-button v-on:click="gobackNow" to="/" variant="primary"
        >立刻返回首页</b-button
      >
    </b-card>
  </b-container>
</template>
<script>
import { defaultMenu } from "~/store/global.js";
export default {
  layout: "account",
  data() {
    return {
      result: null,
      title: "正在登出...",
      message: "请等待片刻...",
      timeKey: -1,
    };
  },
  methods: {
    gobackNow(event) {
      clearInterval(this.timeKey);
      this.timeKey = -1;
      this.$router.push({ path: "/" });
    },
  },
  async fetch() {
    let result = await fetch("/api/account/logout").then((res) => res.json());
    this.result = result.result;
    this.title = result.title;
    this.message = result.message;
    sessionStorage.removeItem("jz_user");
    this.$store.commit("auth/logout");
    // 恢复菜单为未登录状态
    this.$store.commit("global/init");

    let times = 5;
    this.message = `${result.message} ${times} 秒后返回上一页`;
    this.timeKey = setInterval(() => {
      times--;
      if (times < 0) {
        if (this.$route.query && this.$route.query.ref) {
          this.$router.push({ path: this.$route.query.ref });
        } else {
          this.$router.push({ path: "/" });
        }
        clearInterval(this.timeKey);
        this.timeKey = -1;
      } else {
        this.message = `${result.message} ${times} 秒后返回上一页`;
      }
    }, 1000);
  },
};
</script>
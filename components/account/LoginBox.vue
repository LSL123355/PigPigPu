<template>
  <b-form @submit.stop.prevent="onLoginSubmit">
    <b-form-input v-model="loginForm.token" type="text" hidden></b-form-input>

    <b-form-group                   breakpoint=""
      class="mt-5"
      id="input-group-login-username"
      label-for="input-login-username"
    >
    <div class="title">
      <img src="/images/logo.png" alt="">
      统一消息中心
    </div>
    <hr>
      <b-form-input
        id="input-login-username"
        v-model="$v.loginForm.username.$model"
        type="text"
        placeholder="请输入账号"
        :state="validateLoginState('username')"
        aria-describedby="input-login-username-feedback"
      ></b-form-input>
      <b-form-invalid-feedback id="input-login-username-feedback">
        账号长度必须在4至16个字符之间
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group
      class="mt-3"
      id="input-group-login-password"
      label-for="input-login-password"
    >
      <b-form-input
        id="input-login-password"
        v-model="$v.loginForm.password.$model"
        type="password"
        placeholder="请输入密码"
        :state="validateLoginState('password')"
        aria-describedby="input-login-password-feedback"
      ></b-form-input>
      <b-form-invalid-feedback id="input-login-password-feedback">
        密码长度必须在6至32个字符之间
      </b-form-invalid-feedback>
    </b-form-group>

    <div class="d-flex justify-content-between mt-3">
      <b-form-group
        id="input-group-login-remember"
        label-for="checkbox-login-remember"
      >
        <b-form-checkbox
          v-model="$v.loginForm.remember.$model"
          id="checkbox-login-remember"
          >7天内保持登录</b-form-checkbox
        >
      </b-form-group>

      <div>
        <b-link to="/account/forget">忘记密码？</b-link>
      </div>
    </div>

    <b-alert
      :show="result.dismissCountDown"
      dismissible
      fade
      :variant="result.result ? 'success' : 'danger'"
      @dismissed="result.dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      (Code : {{ result.code }}){{ result.title }} : {{ result.message }}
    </b-alert>

    <b-form-group id="input-group-login-submit" class="mt-3 mb-5">
      <b-button type="submit" variant="primary" block>登录</b-button>
    </b-form-group>
  </b-form>
</template>

<script>

// vuelidate 验证用的模块 混合验证的功能
import { validationMixin } from "vuelidate";
// 各种验证的条件
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      result: {
        dismissCountDown: 0,
        result: false,
        code: "",
        title: "",
        message: "",
      },
      loginForm: {
        token: "",
        username: null,
        password: null,
        remember: false,
      },
      timeKey: -1,
    };
  },
  // 验证方法，在输入改变时，对允许一次去校验我们的输入
  validations: {
    // 对应 data 里面的 loginForm
    loginForm: {
      // 改用户名 调用
      // 设定验证的条件
      username: {
        // 必填
        required,
        // 最小长度
        minLength: minLength(4),
        // 最大长度
        maxLength: maxLength(16),
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(32),
      },
      remember: {},
    },
  },
  methods: {
    // 验证状态处理
    validateLoginState(name) {
      // 前面 validations 执行后，会有一些验证结果相关的属性放到 this.$v.loginForm 里面
      // 判断 $dirty 用户操作，是不是true，
      // true 代表有被修改过
      // false 代表没有被修改过
      const { $dirty, $error } = this.$v.loginForm[name];
      // $dirty = true 判断是否有错误
      // 有错误，返回false, 没通过
      // 没有，true，通过验证
      return $dirty ? !$error : null;
    },
    async onLoginSubmit(evt) {
      this.$v.loginForm.$touch();
      if (this.$v.loginForm.$anyError) {
        return;
      }

      
      let postBody = Object.keys(this.loginForm)
        .map((key) => {
          return (
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(this.loginForm[key])
          );
        })
        .join("&");
      let result = await fetch("/api/account/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: postBody,
      }).then((res) => res.json());
      result.dismissCountDown = 10;
      Object.assign(this.result, result);
      if (!this.result.result) {
        await this.refreshToken();
        return;
      } else {
        this.$store.commit("auth/setUser", this.result.user);
        sessionStorage.setItem("jz_user", JSON.stringify(this.result.user));
        let times = 5;
        this.result.message = `${result.message} ${times} 秒后返回上一页`;
        this.timeKey = setInterval(() => {
          times--;
          if (times < 0) {
            console.log(this.$route.query);
            if (this.$route.query && this.$route.query.ref) {
              this.$router.push({ path: this.$route.query.ref });
            } else {
              this.$router.push({ path: "/" });
            }
            clearInterval(this.timeKey);
            this.timeKey = -1;
          } else {
            this.result.message = `${result.message} ${times} 秒后返回上一页`;
          }
        }, 1000);
      }
    },
    countDownChanged(dismissCountDown) {
      this.result.dismissCountDown = dismissCountDown;
    },
    async refreshToken() {
      let result = await fetch("/api/account/login").then((res) => res.json());
      this.loginForm.token = result.token;
    },
  },
  async fetch() {
    await this.refreshToken();
  },
};
</script>




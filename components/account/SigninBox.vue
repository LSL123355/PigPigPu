<template>
  <b-form @submit.stop.prevent="onSigninSubmit">
    <b-form-input v-model="signinForm.token" type="text" hidden></b-form-input>

    <b-form-group
      class="mt-5"
      id="input-group-signin-username"
      label-for="input-signin-username"
    >
      <b-form-input
        id="input-signin-username"
        v-model="$v.signinForm.username.$model"
        type="text"
        placeholder="请输入账号"
        :state="validateSigninState('username')"
        aria-describedby="input-signin-username-feedback"
      ></b-form-input>
      <b-form-invalid-feedback id="input-signin-username-feedback">
        账号必须为字母和数字组合，长度必须在4至16个字符之间
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group
      class="mt-3"
      id="input-group-signin-password"
      label-for="input-signin-password"
    >
      <b-form-input
        id="input-signin-password"
        v-model="$v.signinForm.password.$model"
        type="password"
        placeholder="请输入密码"
        :state="validateSigninState('password')"
        aria-describedby="input-signin-password-feedback"
      ></b-form-input>
      <b-form-invalid-feedback id="input-signin-password-feedback">
        密码长度必须在6至32个字符之间
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group
      class="mt-3"
      id="input-group-signin-confirmPassword"
      label-for="input-signin-confirmPassword"
    >
      <b-form-input
        id="input-signin-confirmPassword"
        v-model="$v.signinForm.confirmPassword.$model"
        type="password"
        placeholder="请再次输入密码"
        :state="validateSigninState('confirmPassword')"
        aria-describedby="input-signin-confirm-password-feedback"
      ></b-form-input>
      <b-form-invalid-feedback id="input-signin-confirm-password-feedback">
        两次输入的密码不相同
      </b-form-invalid-feedback>
    </b-form-group>
    <div class="d-flex justify-content-between mt-3">
      <b-form-group
        id="input-group-signin-agreement"
        label-for="checkbox-signin-agreement"
      >
        <b-form-checkbox
          id="checkbox-signin-agreement"
          v-model="$v.signinForm.agreement.$model"
          :state="validateSigninState('agreement')"
          >同意用户协议</b-form-checkbox
        >
      </b-form-group>
      <div>
        <b-link to="/account/agreement">查看用户协议</b-link>
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
    <b-form-group id="input-group-signin-submit" class="mt-3 mb-5">
      <b-button type="submit" variant="primary" block>注册</b-button>
    </b-form-group>
  </b-form>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  sameAs,
  isUnique,
  sameAsPassword,
} from "vuelidate/lib/validators";

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
      signinForm: {
        token: null,
        username: null,
        password: null,
        confirmPassword: null,
        agreement: false,
      },
      timeKey: -1,
    };
  },
  validations: {
    signinForm: {
      username: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(16),
        // 特殊判断
        isUnique(value) {
          // 检查用户名是否有 非法字符
          let reg = new RegExp("[^a-zA-Z0-9]","i");
          return !reg.test(value);
        },
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(32),
      },
      confirmPassword: {
        required,
        // 跟另外一个输入框的内容做比较，是否一样
        sameAsPassword: sameAs("password"),
      },
      // 同意用户协议
      agreement: {
        // 必须同意才能继续
        // chackbox 打勾就是 value = true
        isUnique(value) {
          // 只要 true 才算通过
          return value;
        },
      },
    },
  },
  methods: {
    // 验证输入框状态
    validateSigninState(name) {
      const { $dirty, $error } = this.$v.signinForm[name];
      return $dirty ? !$error : null;
    },
    /**
     * 点击提交按钮处理逻辑
     */
    async onSigninSubmit(evt) {
      this.$v.signinForm.$touch();

      // $anyError 有任何错误，有就不要动
      if (this.$v.signinForm.$anyError) {
        return;
      }

      // 是将表单数据组装成 表单格式
      let postBody = Object.keys(this.signinForm)
        .map((key) => {
          return (
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(this.signinForm[key])
          );
        })
        .join("&");

      // 发送数据到服务器
      let result = await fetch("/api/account/signin", {
        // Post 请求
        method: "POST",
        // 包括cookie数据
        credentials: "include",
        // 请求的头 用传统表单的类型，就是没有文件上传的那种
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        // 表单数据
        body: postBody,
      })
      // 服务器返回一个 json 结构的注册结果
      .then((res) => res.json());

      // 处理拿到结果之后怎么做
      // 结果提示框 显示10秒钟
      result.dismissCountDown = 10;
      // 将服务器结果记录到 页面数据中
      // 自己去看 Object.assign 是干什么用的
      Object.assign(this.result, result);

      if (!this.result.result) {
        // 注册不成功 重新请求 （防止重复提交数据和攻击）token 令牌 
        await this.refreshToken();
        return;
      } else {
        // 注册成功 修改结果提示框，5秒钟返回登陆页面
        let times = 5;
        this.result.message = `${result.message} ${times} 秒后返回登录页面`;
        this.timeKey = setInterval(
          () => {
            times--;
            if (times < 0) {
              this.$router.push({ path: "/account/login" });
              clearInterval(this.timeKey);
              this.timeKey = -1
            } else {
              this.result.message = `${result.message} ${times} 秒后返回登录页面`;
            }
          },
          1000,
          this.signinForm.username,
        );
      }
    },
    /**
     * 结果显示框的倒计时
     */
    countDownChanged(dismissCountDown) {
      this.result.dismissCountDown = dismissCountDown;
    },
    /**
     * 请求（防止重复提交数据和攻击）token 令牌 
     */
    async refreshToken() {
      let keyResult = await fetch("/api/account/signin").then((res) =>
        res.json()
      );
      this.signinForm.token = keyResult.token;
    },
  },
  /**
   * 进入页面自动获取 （防止重复提交数据和攻击）token 令牌 
   */
  async fetch() {
    await this.refreshToken();
  },
};
</script>
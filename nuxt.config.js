export default {

  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '统一消息中心',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://i.loli.net/2020/11/23/mf8kvZBMI1yuhCT.png' },
    ],

  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'assets/styles/main.less'
  ],

  router: {
    middleware: ['global'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // '@ant-design/icons-vue',
  ],

  bootstrapVue: {
    icons: true
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  // 设置启动监听的地址和端口
  // 修改后，需要重新启动 npm run dev
  server: {
    port: 81, // default: 3000
  },

  // 使用 nuxt 框架提供的 服务器中间件功能，实现 KOA 的后端服务
  serverMiddleware: [
    // /api 的地址请求，只有数据，没有页面
    // 所有的 /api 的请求都会转发到 api/app.js 脚本文件中
    { path: "/api", handler: "~/api/app.js" }
  ]
}

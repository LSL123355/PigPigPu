/**
 * 鉴权处理
 * 部分页面需要登陆或者其他权限才能使用，
 * 无权限用户将会跳转到登陆页面
 * @param {Object} context Nuxt Context 对象，包括所有可用API
 */
function auth(context) {
    let isClient = process.client;
    let isServer = process.server;
    let redirectURL = '/account/login';
    let user, path
    //在服务端
    if (isServer) {
        console.log(`服务器端鉴权`);
        // 目前都是在客户端鉴权
    }

    //在客户端判读是否需要登陆
    if (isClient) {
        console.log(`浏览器端鉴权`);
        // 获取 sessionStorage 里面的 用户数据
        // 不直接使用 Nuxt 已有的用户数据
        user = window.sessionStorage.getItem("jz_user");
        console.log(user);
        if (user) {
            user = JSON.parse(user);
        } else {
            path = context.route.path;
        }
    }
    // 当没有权限时会获取当前浏览器地址作为登陆后的跳转地址
    // 如果没有当前地址，则登陆后不跳转
    if (path) {
        redirectURL = redirectURL + '?ref=' + encodeURIComponent(path);
    }
    //判断是否存在登陆数据，没有则跳转
    if (!user) {
        console.log(`用户未登陆需要跳转到登陆页面`);
        context.redirect(redirectURL);
    }
}

export default auth;
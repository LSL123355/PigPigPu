// API 公共接口 /api
import Router from "koa-router";
import UUID from "../service/uuid.js";

const router = new Router();

/**
 * 登陆前获取一次登陆用的令牌, 令牌在10分钟内有效
 * 防止重复提交数据
 * url: /api/account/login
 * method: GET
 */
router.get("/login", async (ctx, next) => {
    ctx.type = "text/json";
    let loginToken = UUID();
    ctx.session.loginToken = loginToken;
    ctx.session.loginTokenTime = new Date().getTime() + 1000 * 60 * 10;
    ctx.body = JSON.stringify({ token: loginToken });
})
/**
 * 用户登陆处理
 * url: /api/account/login
 * method: POST
 */
router.post("/login", async (ctx, next) => {
    let { token, username, password, remember } = ctx.request.body;
    ctx.type = "text/json";

    // 临时保存 token 相关数据
    let loginToken = ctx.session.loginToken;
    let loginTokenTime = ctx.session.loginTokenTime;
    // 清空 session 内 token 相关数据
    // 只要有一次请求，用户本身已有的 token 就失效
    ctx.session.loginToken = undefined;
    ctx.session.loginTokenTime = undefined;

    // 判断登陆令牌是否有效
    if (loginTokenTime <= Date.now()
        || token !== loginToken) {
        ctx.status = 403;
        ctx.body = JSON.stringify({
            result: false,
            code: "100000",
            title: "登录失败",
            message: "Token 无效"
        });
        return;
    }

    // 用户名去空格
    username = username.trim();

    // 用户名有效性检验
    if (username.length < 4 || username.length > 16 || (/[^a-zA-Z0-9]/.test(username))) {
        ctx.status = 403;
        ctx.body = JSON.stringify({
            result: false,
            code: "100000",
            title: "登录失败",
            message: "账号名称无效"
        });
        return;
    }
    // 密码有效性检验
    if (password.length < 6 || password.length > 32) {
        ctx.status = 403;
        ctx.body = JSON.stringify({
            result: false,
            code: "100000",
            title: "登录失败",
            message: "密码长度必须在6至32位之间"
        });
        return;
    }

    const { User } = ctx.orm('user');
    let user = await User.findAll({
        where: {
            username,
            password
        }
    });
    if (user.length === 0) {
        ctx.status = 403;
        ctx.body = JSON.stringify({
            result: false,
            code: "100000",
            title: "登录失败",
            message: "账号不存在"
        });
        return;
    }
    user = user[0];
    if (password !== user.password) {
        ctx.status = 403;
        ctx.body = JSON.stringify({
            result: false,
            code: "100000",
            title: "登录失败",
            message: "密码错误"
        });
        return;
    }

    // 登陆之后 cookie 设置
    // ctx.cookies.set("login", "true");

    // 登陆之后用户数据记录到页面会话数据中
    // TODO 实现用户详情再从用户详情中获取对应 昵称
    // 这个nickname是假的
    user.nickName = "用户0001";
    // 需要服务器给客户端提供用户功能菜单选项
    user.userMenu = {}
    user.userMenu["default"] = [
        { id: 0, url: "/setting", name: "设置" },
        { id: 1, url: "/account/logout", name: "登出" },
    ];
    user.userMenu["/store"] = [
        { id: 0, url: "/store/cars", name: "购物车" },
        { id: 1, url: "/store/order", name: "订单" },
        { id: 2, url: "/setting", name: "设置" },
        { id: 3, url: "/account/logout", name: "登出" },
    ];
    user.userMenu["/admin"] = [
        { id: 0, url: "/store/admin/type", name: "商品类型" },
        { id: 1, url: "/store/admin/add", name: "添加商品" },
        { id: 2, url: "/setting", name: "设置" },
        { id: 3, url: "/account/logout", name: "登出" },
    ];

    console.log(user);

    // 保存用户数据到 session 中
    ctx.session.user = user;

    ctx.status = 200;
    ctx.body = JSON.stringify({
        result: true,
        code: 200,
        title: "登录成功",
        message: `账号 ${username} 登录成功！`,
        // 不要直接将数据库中的用户数据返回给客户端，其中包含太多敏感信息
        user: {
            nickName: user.nickName,
            userMenu: user.userMenu
        }
    });
});

/**
 * 处理用户登出
 * @param {Object} ctx 请求上下文对象
 * @param {Function} next 下一个函数
 */
function logoutHandler(ctx, next) {
    if (!ctx.session || !ctx.session.user) {
        ctx.status = 500;
        ctx.body = JSON.stringify({
            result: false,
            title: "登出错误",
            message: `您没有登陆任何账号！`
        });
        return;
    }

    // 仅销毁用户数据，但其他会话数据保留
    ctx.session.user = null;

    ctx.status = 200;
    ctx.body = JSON.stringify({
        result: true,
        code: 200,
        title: "登出成功",
        message: `账号安全登出！`
    });

}
// 两种请求都使用同一个处理
/**
 * 登出
 * url: /api/account/logout
 * method: GET
 */
router.get("/logout", logoutHandler);
/**
 * 登出
 * url: /api/account/logout
 * method: POST
 */
router.post("/logout", logoutHandler);

/**
 * 和登陆一样，注册也需要令牌
 * url: /api/account/signin
 * method: GET
 */
router.get("/signin", async (ctx, next) => {
    ctx.type = "text/json";
    let token = UUID();
    ctx.session.signinToken = token;
    ctx.session.signinTokenTime = new Date().getTime() + 1000 * 60 * 10;
    ctx.body = JSON.stringify({ token: token });
})

/**
 * 注册处理
 * url: /api/account/signin
 * method: POST
 */
router.post("/signin", async (ctx, next) => {
    let { token, username, password, agreement } = ctx.request.body;

    let signinToken = ctx.session.signinToken;
    let signinTokenTime = ctx.session.signinTokenTime;
    ctx.session.signinTokenTime = undefined;
    ctx.session.signinToken = undefined;

    ctx.type = "text/json";
    if (signinTokenTime < new Date().getTime()
        || signinToken !== token) {
        ctx.status = 403;
        ctx.body = JSON.stringify({
            result: false,
            code: "100000",
            title: "注册失败",
            message: "令牌无效"
        });
        return;
    }

    username = username.trim();
    if (username.length < 4
        || username.length > 16
        || !(/^[A-Za-z0-9]/.exec(username))) {
        ctx.status = 403;
        ctx.body = JSON.stringify({
            result: false,
            code: "100000",
            title: "注册失败",
            message: "账号名称无效"
        });
        return;
    }
    if (password.length < 6 || password.length > 32) {
        ctx.status = 403;
        ctx.body = JSON.stringify({
            result: false,
            code: "100000",
            title: "注册失败",
            message: "密码长度必须在6至32位之间"
        });
        return;
    }

    const { User } = ctx.orm('user');
    let user = await User.findAll({
        where: {
            username
        }
    });
    if (user.length > 0) {
        ctx.status = 403;
        ctx.body = JSON.stringify({
            result: false,
            code: "100000",
            title: "注册失败",
            message: "用户已存在"
        });
        return;
    }

    user = await User.create({ username, password });
    console.log(user);
    if (!user) {
        ctx.status = 500;
        ctx.body = JSON.stringify({
            result: false,
            code: "100000",
            title: "注册失败",
            message: "数据库错误！"
        });
        return;
    }

    ctx.status = 200;
    ctx.body = JSON.stringify({
        result: true,
        code: 200,
        title: "注册成功",
        message: `账号 ${username} 注册成功！`
    });
});


export default router;
import { defaultMenu } from "~/store/global.js"

/**
 * 全局初始化
 * 第一次进入页面和主要用于刷新页面，
 * 对 sessionStorage 和 localStorage 已有数据加载到Nuxt中使用
 * @param {Object} context Nuxt Context 对象，包括所有可用API
 */
function globalInit(context) {
    let isClient = process.client;
}
export default globalInit;
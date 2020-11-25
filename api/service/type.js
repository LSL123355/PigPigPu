/**
 * 类型检查高阶函数
 * @param {string} type 
 */
function createTypeOf(type) {
    let testType = type;
    return function (obj) {
        console.log(Object.prototype.toString.call(obj));
        return Object.prototype.toString.call(obj) === testType;
    }
}
// 检查返回的是否数据查询结果对象集
let ArrayType = createTypeOf('[object Array]');
export default createTypeOf;
export {
    ArrayType
}
import mysql from "mysql";

const config = {
    host: "localhost", post: '3306',
    user: 'root', password: '123456', database: 'account'
};
const pool = mysql.createPool(config);
const query = (sql, values) => {
    let promiseHandler = (resolve, reject) => {
        let connectionHandler = (err, connection) => {
            if (err) return reject(err);

            let queryCallback = (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
                connection.release();
            }
            let querytest = connection.query(sql, values, queryCallback);
            console.log(querytest.sql);
        }
        pool.getConnection(connectionHandler);
    }
    let queryPromise = new Promise(promiseHandler);
    return queryPromise;
}
/**
 * 根据传入SQL语句和属性，组合成完整的sql语句并对Mysql使用
 * @param {string} sql 
 * @param {array|any} values 
 */
const getRows = (sql, values) => {
    try {
        return query(sql, values).then(rows => {
            // 把属性值以日志显示格式在控制台输出
            console.log(rows);
            return rows;
        }, err => {
            // 把报错以错误显示格式在控制台输出
            console.error(err);
            // 报错了，返回 null
            return null;
        });
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        })
    }
}
// 默认导出
export default getRows;
// 指定导出
export {
    query
}
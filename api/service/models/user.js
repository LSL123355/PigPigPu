import { Sequelize, DataTypes, Model } from "sequelize";


/**
 * 定义一个 User class 用来映射 数据库中的 user 表
 * 为了不与之前的数据库冲突 使用新的库和表
 */
class User extends Model { }

// 初始化 User 内部的字段映射
export default function (sequelize, type) {
    let model = User.init({
        // 对应user表的 id 字段
        id: {
            type: DataTypes.INTEGER,    // 数据库里面的类型是 INT
            primaryKey: true,           // 索引键
            allowNull: false,           // NOT NUL
            autoIncrement: true,        // 自动增加值
            unique: true,               // 独特唯一
        },
        // 对应user表的 username 字段
        username: {
            type: DataTypes.STRING(20), // 数据库内类型是 VARCHAR(20)
            allowNull: false,           // NOT NUL
            unique: true,               // 独特唯一
        },
        email: {
            type: DataTypes.STRING,     // 数据库内类型是 VARCHAR(255)
            unique: true,               // 独特唯一
            // 默认请求 Sequelize 假设默认值为 NULL
        },
        phone: {
            type: DataTypes.STRING(11),     // 数据库内类型是 VARCHAR(11)
            unique: true,               // 独特唯一
        },
        // 对应user表的 password 字段
        password: {
            type: DataTypes.STRING(32), // 数据库内类型是 VARCHAR(32)
            allowNull: false,           // NOT NUL
        },
    },{
        sequelize,  // 将使用 orm 框架的实例sequelize 初始化这个 User 的定义
        tableName: "user",  // 指定对应的数据表为 user 表
        modelName: "User",  // 指定模块名称 为 "User"
    });
    
    // 同步数据库中的表，没有则创建 user 表
    User.sync();
    return model;
}
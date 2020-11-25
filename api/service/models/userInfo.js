import { Sequelize, DataTypes, Model } from "sequelize";


/**
 * 定义一个 UserInfo class 用来映射 数据库中的 user_info 表
 * 为了不与之前的数据库冲突 使用新的库和表
 */
class UserInfo extends Model { }

// 初始化 UserInfo 内部的字段映射
export default function (sequelize, type) {
    let model = UserInfo.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        gender: {
            type: DataTypes.INTEGER({length: 1}),
            unique: true,
        },
    }, {
        sequelize,
        tableName: "user_info",
        modelName: "UserInfo",
    });

    // 同步数据库中的表，没有则创建 user_info 表
    UserInfo.sync();
    return model;
}
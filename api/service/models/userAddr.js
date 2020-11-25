import { Sequelize, DataTypes, Model } from "sequelize";


/**
 * 定义一个 UserAddr class 用来映射 数据库中的 user_addr 表
 * 为了不与之前的数据库冲突 使用新的库和表
 */
class UserAddr extends Model { }

// 初始化 UserAddr 内部的字段映射
export default function (sequelize, type) {
    let model = UserAddr.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(11),
            allowNull: false,
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        area: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        specific: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "user_addr",
        modelName: "UserAddr",
    });

    // 同步数据库中的表，没有则创建 user_addr 表
    UserAddr.sync();
    return model;
}
import { Sequelize, DataTypes, Model } from "sequelize";

/**
 * 定义一个 Order class 用来映射 数据库中的 order 表
 * 为了不与之前的数据库冲突 使用新的库和表
 */
class Order extends Model { }

// 初始化 Order 内部的字段映射
export default function (sequelize, type) {
    let model = Order.init({
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
        state: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        goods: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "order",
        modelName: "Order",
    });
    // 同步数据库中的表，没有则创建 cart 表
    Order.sync();
    return model;
}
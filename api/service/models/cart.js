import { Sequelize, DataTypes, Model } from "sequelize";

/**
 * 定义一个 Cart class 用来映射 数据库中的 cart 表
 * 为了不与之前的数据库冲突 使用新的库和表
 */
class Cart extends Model { }

// 初始化 Cart 内部的字段映射
export default function (sequelize, type) {
    let model = Cart.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        goods: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    }, {
        sequelize,  
        tableName: "cart", 
        modelName: "Cart",  
    });
    // 同步数据库中的表，没有则创建 cart 表
    Cart.sync();
    return model;
}
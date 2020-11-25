import { Sequelize, DataTypes, Model } from "sequelize";

/**
 * 定义一个 Store class 用来映射 数据库中的 store 表
 * 为了不与之前的数据库冲突 使用新的库和表
 */
class Store extends Model { }

// 初始化 Store 内部的字段映射
export default function (sequelize, type) {
    let model = Store.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,  
        tableName: "store", 
        modelName: "Store",  
    });
    // 同步数据库中的表，没有则创建 store 表
    Store.sync();
    return model;
}
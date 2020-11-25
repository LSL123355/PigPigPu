import { Sequelize, DataTypes, Model } from "sequelize";

/**
 * 定义一个 StoreGoods class 用来映射 数据库中的 store_goods 表
 * 为了不与之前的数据库冲突 使用新的库和表
 */
class StoreGoods extends Model { }

// 初始化 StoreGoods 内部的字段映射
export default function (sequelize, type) {
    let model = StoreGoods.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        store_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        goods_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        num: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(12,2),
            allowNull: false,
        },
        discount: {
            type: DataTypes.DECIMAL(3,2),
            allowNull: false,
        },
    }, {
        sequelize,  
        tableName: "store_goods", 
        modelName: "StoreGoods",  
    });
    // 同步数据库中的表，没有则创建 store_goods 表
    StoreGoods.sync();
    return model;
}
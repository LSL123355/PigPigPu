import { Sequelize, DataTypes, Model } from "sequelize";

/**
 * 定义一个 GoodsType class 用来映射 数据库中的 goods_type 表
 * 为了不与之前的数据库冲突 使用新的库和表
 */
class GoodsType extends Model { }

// 初始化 GoodsType 内部的字段映射
export default function (sequelize, type) {
    let model = GoodsType.init({
        type: {
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
        group: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        des: {
            type: DataTypes.STRING, 
        },
    }, {
        sequelize,  
        tableName: "goods_type", 
        modelName: "GoodsType",  
    });
    // 同步数据库中的表，没有则创建 goods_type 表
    GoodsType.sync();
    return model;
}
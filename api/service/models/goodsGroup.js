import { Sequelize, DataTypes, Model } from "sequelize";

/**
 * 定义一个 GoodsGroup class 用来映射 数据库中的 goods_group 表
 * 为了不与之前的数据库冲突 使用新的库和表
 */
class GoodsGroup extends Model { }

// 初始化 GoodsGroup 内部的字段映射
export default function (sequelize, type) {
    let model = GoodsGroup.init({
        group: {
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
        des: {
            type: DataTypes.STRING, 
        },
    }, {
        sequelize,  
        tableName: "goods_group", 
        modelName: "GoodsGroup",  
    });
    // 同步数据库中的表，没有则创建 goods_group 表
    GoodsGroup.sync();
    return model;
}
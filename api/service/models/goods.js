import { Sequelize, DataTypes, Model } from "sequelize";

/**
 * 定义一个 Goods class 用来映射 数据库中的 goods 表
 * 为了不与之前的数据库冲突 使用新的库和表
 */
class Goods extends Model { }

// 初始化 Goods 内部的字段映射
export default function (sequelize, type) {
    let model = Goods.init({
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
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING(45), 
        },
        des: {
            type: DataTypes.STRING, 
        },
        images: {
            type: DataTypes.JSON, 
            allowNull: false, 
            defaultValue: "[]",
        },
    }, {
        sequelize,  
        tableName: "goods", 
        modelName: "Goods",  
    });
    // 同步数据库中的表，没有则创建 goods 表
    Goods.sync();
    return model;
}
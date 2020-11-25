// user 表
const SQL_INSERT_USER =                 "INSERT INTO `account`.`user` " +
                                        "(`username`, `password`) " +
                                        " VALUES (?, ?) ;";
const SQL_SELECT_USER_ALL =             "SELECT * FROM `account`.`user`;";
const SQL_SELECT_USER_BY_USERNAME =     "SELECT * FROM `account`.`user` " +
                                        "WHERE user.username = ? ;";
const SQL_SELECT_USER_BY_ID =           "SELECT * FROM `account`.`user` " +
                                        "WHERE user.id = ? ;";
const SQL_DELETE_USER_BY_ID =           "DELETE FROM `account`.`user` " +
                                        "WHERE `id` = ?;";
const SQL_UPDATE_USER_BY_ID =           "UPDATE `account`.`user` " +
                                        "SET " +
                                        "user.password = ? " +
                                        "WHERE user.id = ?;";

const USER = {
    SQL_INSERT: SQL_INSERT_USER, 
    SQL_SELECT: SQL_SELECT_USER_ALL,
    SQL_SELECT_USERNAME: SQL_SELECT_USER_BY_USERNAME,
    SQL_SELECT_ID: SQL_SELECT_USER_BY_ID,
    SQL_DELETE_ID: SQL_DELETE_USER_BY_ID,
    SQL_UPDATE: SQL_UPDATE_USER_BY_ID
}

export {
    USER
}

// goods_static表
const SQL_INSERT_GOODS_STATIC =         "INSERT INTO `store`.`goods_static` " +
                                        "(`goods_name`,`goods_type`,`goods_model`,`goods_des`,`goods_images`) " +
                                        "VALUES (?, ?, ?, ?, ?) ;"

const SQL_SELECT_GOODS_STATIC_ALL =     "SELECT * FROM `store`.`goods_static`";

const SQL_SELECT_GOODS_STATIC_BY_ID =   "SELECT * FROM `store`.`goods_static` " +
                                        "WHERE goods_static.goods_id = ?";
                                        
const SQL_DELETE_GOODS_STATIC_BY_ID =   "DELETE FROM `store`.`goods_static` " + 
                                        "WHERE goods_static.goods_id = ?";

const SQL_UPDATE_GOODS_STATIC_BY_ID =   "UPDATE `store`.`goods_static` " + 
                                        "SET " + 
                                        "goods_static.goods_name = ?, " + 
                                        "goods_static.goods_type = ?, " + 
                                        "goods_static.goods_model = ?, " + 
                                        "goods_static.goods_des = ?, " + 
                                        "goods_static.goods_images = ? " +
                                        "WHERE goods_static.goods_id = ?;";

// 将 goods_static 表相关的语句包装到 GOODS_STATIC 对象内;
const GOODS_STATIC = {
    SQL_INSERT: SQL_INSERT_GOODS_STATIC, 
    SQL_SELECT: SQL_SELECT_GOODS_STATIC_ALL,
    SQL_SELECT_ID: SQL_SELECT_GOODS_STATIC_BY_ID,
    SQL_DELETE_ID: SQL_DELETE_GOODS_STATIC_BY_ID,
    SQL_UPDATE: SQL_UPDATE_GOODS_STATIC_BY_ID
}

export {
    GOODS_STATIC
}

// SQL + 操作名 + 数据表 + 查询条件
// goods_store表
const SQL_INSERT_GOODS_STORE =          "INSERT INTO `store`.`goods_store` " + 
                                        "(`goods_id`, `goods_num`, `goods_price`, `goods_discount`) " + 
                                        "VALUES (?, ?, ?, ?);";

const SQL_SELECT_GOODS_STORE_ALL =      "SELECT * FROM `store`.`goods_store`";

const SQL_SELECT_GOODS_STORE_BY_ID =    "SELECT * FROM `store`.`goods_store` " + 
                                        "WHERE goods_store.goods_id = ?";

const SQL_DELETE_GOODS_STORE_BY_ID =    "DELETE FROM `store`.`goods_store` " + 
                                        "WHERE goods_store.goods_id = ?";

const SQL_UPDATE_GOODS_STORE_BY_ID =    "UPDATE `store`.`goods_store` " + 
                                        "SET " + 
                                        "goods_store.goods_id = ?, " + 
                                        "goods_store.goods_num = ?, " + 
                                        "goods_store.goods_price = ?, " + 
                                        "goods_store.goods_discount = ? " + 
                                        "WHERE goods_store.store_id = ?;";
// 将 goods_store 表相关的语句包装到 GOODS_STORE 对象内;
export const GOODS_STORE ={
    SQL_INSERT: SQL_INSERT_GOODS_STORE, 
    SQL_SELECT: SQL_SELECT_GOODS_STORE_ALL,
    SQL_SELECT_ID: SQL_SELECT_GOODS_STORE_BY_ID,
    SQL_DELETE_ID: SQL_DELETE_GOODS_STORE_BY_ID,
    SQL_UPDATE: SQL_UPDATE_GOODS_STORE_BY_ID
}

// goods_type表
const SQL_INSERT_GOODS_TYPE =           "INSERT INTO `store`.`goods_type` " + 
                                        "(`goods_type`, `goods_type_name`, `goods_parent_type`) " + 
                                        "VALUES (?, ?, ?);";

const SQL_SELECT_GOODS_TYPE_ALL =        "SELECT * FROM `store`.`goods_type`";

const SQL_SELECT_GOODS_TYPE_BY_TYPE =   "SELECT * FROM `store`.`goods_type` " + 
                                        "WHERE goods_type.goods_type = ?";

const SQL_DELETE_GOODS_TYPE_BY_TYPE =   "DELETE FROM `store`.`goods_type` " + 
                                        "WHERE goods_type.goods_type = ?";

const SQL_UPDATE_GOODS_TYPE_BY_TYPE =   "UPDATE `store`.`goods_type` " + 
                                        "SET " + 
                                        "goods_type.goods_type = ?, " + 
                                        "goods_type.goods_type_name = ?, " + 
                                        "goods_type.goods_parent_type = ? " + 
                                        "WHERE goods_type.goods_type = ?;";

// order表
const SQL_INSERT_ORDER_TYPE =           "INSERT INTO `store`.`order` " + 
                                        "(`user_id`, `goods_obj`, `order_state`) " + 
                                        "VALUES (?, ?, ?);";

const SQL_SELECT_ORDER_TYPE_ALL =       "SELECT * FROM `store`.`order`";

const SQL_SELECT_ORDER_TYPE_BY_ID =     "SELECT * FROM `store`.`order` " + 
                                        "WHERE order.order_id = ?";

const SQL_DELETE_ORDER_TYPE_BY_ID =     "DELETE FROM `store`.`order` " + 
                                        "WHERE order.order_id = ?";

const SQL_UPDATE_ORDER_TYPE_BY_ID =     "UPDATE `store`.`order` " + 
                                        "SET order.user_id = ?, " + 
                                        "order.goods_obj = ?, " + 
                                        "order.order_state = ? " + 
                                        "WHERE order.order_id = ?;";
                          
// shop_cart表
const SQL_INSERT_SHOP_CART_TYPE =           "INSERT INTO `store`.`shop_cart` " + 
                                            "(`user_id`, `goods_obj`) " + 
                                            "VALUES (?, ?);";

const SQL_SELECT_SHOP_CART_TYPE_ALL =       "SELECT * FROM `store`.`shop_cart`";

const SQL_SELECT_SHOP_CART_TYPE_BY_ID =     "SELECT * FROM `store`.`shop_cart` " + 
                                            "WHERE shop_cart.shop_cart_id = ?";     

const SQL_DELETE_SHOP_CART_TYPE_BY_ID =     "DELETE FROM `store`.`order` " + 
                                            "WHERE shop_cart.shop_cart_id = ?";

const SQL_UPDATE_SHOP_CART_TYPE_BY_ID =     "UPDATE `store`.`order` " + 
                                            "SET " + 
                                            "shop_cart.user_id = ?, " + 
                                            "shop_cart.goods_obj = ? " + 
                                            "WHERE shop_cart.shop_cart_id = ?;";

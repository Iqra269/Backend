const sequelize = require("../bin/dbConnection");

const users = require("./definitions/users");
const roles = require("./definitions/roles");
const orders = require("./definitions/orders");
const products = require("./definitions/products");
const carts = require("./definitions/carts");
const productVariations = require("./definitions/productVariations");
const cartItems = require("./definitions/cartItems");
const orderItems = require("./definitions/orderItems");
const sessions = require("./definitions/session");

const models = {
  users,
  roles,
  orders,
  products,
  carts,
  productVariations,
  cartItems,
  orderItems,
  sessions,
};

///relations

//1:1 Relations
//user-cart 1:1
users.hasOne(carts, { foreignKey: "userId" });
carts.belongsTo(users, { foreignKey: "userId" });

//1:M Relations
//user-role 1:M
roles.hasMany(users, { foreignKey: "roleId" });
users.belongsTo(roles, { foreignKey: "roleId" });

//user-session 1:1
users.hasOne(sessions, { foreignKey: "userId" });
sessions.belongsTo(users, { foreignKey: "userId" });

//user-order 1:M
users.hasMany(orders, { foreignKey: "userId" });
orders.belongsTo(users, { foreignKey: "userId" });

//user-product 1:M
users.hasMany(products, { foreignKey: "userId" });
products.belongsTo(users, { foreignKey: "userId" });

//product-productVariations 1:M
products.hasMany(productVariations, { foreignKey: "productId" });
productVariations.belongsTo(products, { foreignKey: "productId" });

//productVariations-cartItems 1:M && cart-cartItems 1:M  (productVariation-cartItems-cart M:M)
productVariations.hasMany(cartItems, { foreignKey: "variationId" });
cartItems.belongsTo(productVariations, { foreignKey: "variationId" });
//
carts.hasMany(cartItems, { foreignKey: "cartId" });
cartItems.belongsTo(carts, { foreignKey: "cartId" });

//productVariations-orderItems 1:M && orders-orderItems 1:M (productVariations-orderItems-orders M:M)
productVariations.hasMany(orderItems, { foreignKey: "variationId" });
orderItems.belongsTo(productVariations, { foreignKey: "variationId" });
//
orders.hasMany(orderItems, { foreignKey: "orderId" });
orderItems.belongsTo(orders, { foreignKey: "orderId" });

const db = {};

db.sequelize = sequelize;
sequelize.models = models;

module.exports = { db, models };

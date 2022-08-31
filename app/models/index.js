const dbConfig = require("../config/db.config")
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.knowledge = require("./knowledge.model.js")(sequelize, Sequelize);
db.tag = require("./tag.model.js")(sequelize, Sequelize);
db.tag.belongsToMany(db.knowledge, {
    through: "knowledge_tag",
    as: "knowledge",
    foreignKey: "tag_id",
});
db.knowledge.belongsToMany(db.tag, {
    through: "knowledge_tag",
    as: "tags",
    foreignKey: "knowledge_id",
});

module.exports = db;

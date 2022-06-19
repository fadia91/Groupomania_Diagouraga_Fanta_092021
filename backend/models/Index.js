const config = require("../dbConfig.js");
const Sequelize = require("sequelize");

const connexion = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = connexion;

db.user = require("./User.js")(connexion, Sequelize);
db.post = require("./Post.js")(connexion, Sequelize);
db.reaction = require("./Reaction.js")(connexion, Sequelize);

db.post.associate(db);
db.reaction.associate(db);



module.exports = db;
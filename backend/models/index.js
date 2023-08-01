const Sequelize = require("sequelize");
const config = require("../config");
const User = require("./users");
const Real_estate = require ("./real_estate");
const Transaction = require ("./transaction");
const Comment = require ("./comment");
const Recomment = require ("./recomment");
const Likes = require ("./likes");

const sequelize = new Sequelize(config.dev);

const db = {};
db.sequelize = sequelize;
db.User = User;
db.Real_estate = Real_estate;
db.Transaction = Transaction;
db.Comment = Comment;
db.Recomment = Recomment;
db.Likes = Likes;

User.init(sequelize);
Real_estate.init(sequelize);
Transaction.init(sequelize);
Comment.init(sequelize);
Recomment.init(sequelize);
Likes.init(sequelize);

User.assicoate(db);
Real_estate.assicoate(db);
Transaction.assicoate(db);
Comment.assicoate(db);
Recomment.assicoate(db);
Likes.assicoate(db);

module.exports = db;

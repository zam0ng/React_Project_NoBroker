const Sequelize = require("sequelize");
const bcrypt = require("bcrypt")
const config = require("../config");
const User = require("./users");
const Real_estate = require ("./real_estate");
const Transaction = require ("./transaction");
const Comment = require ("./comment");
const Recomment = require ("./recomment");
const Likes = require ("./likes");
const Vote = require("./vote");

const sequelize = new Sequelize(config.dev);

const db = {};
db.sequelize = sequelize;
db.User = User;
db.Real_estate = Real_estate;
db.Transaction = Transaction;
db.Comment = Comment;
db.Recomment = Recomment;
db.Likes = Likes;
db.Vote = Vote;

User.init(sequelize);
Real_estate.init(sequelize);
Transaction.init(sequelize);
Comment.init(sequelize);
Recomment.init(sequelize);
Likes.init(sequelize);
Vote.init(sequelize);

User.assicoate(db);
Real_estate.assicoate(db);
Transaction.assicoate(db);
Comment.assicoate(db);
Recomment.assicoate(db);
Likes.assicoate(db);
Vote.assicoate(db);

const createTestUser = async () => {

    const userq = await User.findOne();
    if (!userq) {
        const password1 = bcrypt.hashSync("qwer", 10);
        const password2 = bcrypt.hashSync("qq", 10);
        await User.create({user_id : "qwer", password :password1, role : true, user_name : "qwer", address : "주소", phone : "phone", ssn : "ssn"});
        await User.create({user_id : "qq", password :password2, role : true, user_name : "qwer", address : "주소", phone : "phone", ssn : "ssn"});
    }
}


createTestUser();

module.exports = db;

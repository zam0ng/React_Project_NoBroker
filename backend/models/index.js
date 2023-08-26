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

// const createTestData = async () => {

//     const user = await User.findOne();
//     if (!user) {
//         const password = bcrypt.hashSync("admin1234", 10);
//         // const password1 = bcrypt.hashSync("qwer", 10);
//         // const password2 = bcrypt.hashSync("qq", 10);
//         await User.create({user_img : "imgs/userImg/User_Profile.png", user_id : "admin", password, role : true, certificate_img : "imgs/userImg/User_Profile.png", certificate_user : 0, user_name : "admin", address : "", phone : "010-0000-0000", ssn : "ssn", seal_img : "imgs/userImg/User_Profile.png"});
//         // await User.create({user_id : "qwer", password :password1, role : true, user_name : "qwer", address : "주소", phone : "phone", ssn : "ssn"});
//         // await User.create({user_id : "qq", password :password2, role : true, user_name : "qwer", address : "주소", phone : "phone", ssn : "ssn"});
//     }

//     const estate = await Real_estate.findOne();
//     if (!estate) {

//         // await Real_estate.create({ seller : 3, province : "서울", city : "강동구", town : "길동", jibun : '서울 강동구 길동 382-6', road : '서울 강동구 양재대로113길 50', additional_address : '8동 715호', deposit : '390000000', balance : '39000000', year_built : '1972', lat : '37.5389', lng : '127.137', area : '287.54', doc : '1758-1996-029014', type : '아파트', img_1 : , img_2 : , img_3 : , img_4 : , img_5 : , img_6 : , img_7 : , views : 10, });
//         // await Real_estate.create({ seller : , accpet})
//     }

//     const transaction = await Transaction.findOne();
//     if (!transaction) {
//         await Transaction.create({buyer : 5, seller : 3, transaction_date : "2023-09-01", real_estate_id : 1, cancel : 3, approved : true});
//     }



// }


// createTestData();

module.exports = db;

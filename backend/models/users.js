const {DataTypes,Model} = require("sequelize");

class User extends Model{
    static init(sequelize) {
        return super.init(
            {
                // 유저 프로필 사진
                user_img : {
                    type : DataTypes.STRING,                 
                },
                // 유저 아이디
                user_id :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 유저 패스워드
                password :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 공인중개사 신청 여부(true : 공인중개사, false : 일반 유저)
                role : {
                    type : DataTypes.BOOLEAN,
                    allowNull : false,
                },
                // 공인중개사 자격증 이미지
                certificate_img :{
                    type : DataTypes.STRING,
                },
                // 인증된 공인중개사 인지 여부
                // 인증된 공인중개사 회원인지 여부 (0: 공인중개사 승인, 1: 신청중, 2: 승인 거절)
                certificate_user :{
                    type : DataTypes.INTEGER,
                },
                // 허위 매물 등록횟수
                fake_count :{
                    type : DataTypes.INTEGER,
                    defaultValue : 0,
                },
                // 판매 가능 여부 (패널티 여부)
                ban :{
                    type : DataTypes.BOOLEAN,
                    defaultValue : false,
                },
                // 유저 이름
                user_name :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 유저 주소
                address :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 유저 전화번호
                phone :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 유저 주민등록번호
                ssn :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 유저 인감 사진
                seal_img :{
                    type : DataTypes.STRING,
                },
                // 유저 보유 원화
                won :{
                    type : DataTypes.INTEGER,
                    defaultValue : 0,
                },
                // 유저 보유 btc
                btc :{
                    type : DataTypes.FLOAT,
                    defaultValue : 0,
                },
                // 유저 보유 eth
                eth :{
                    type : DataTypes.FLOAT,
                    defaultValue : 0,
                },
                // 유저 사용불가 원화
                disabled_won :{
                    type : DataTypes.INTEGER,
                    defaultValue : 0,
                },
                // 유저 사용불가 btc
                disabled_btc :{
                    type : DataTypes.FLOAT,
                    defaultValue : 0,
                },
                // 유저 사용불가 eth
                disabled_eth :{
                    type : DataTypes.FLOAT,
                    defaultValue : 0,
                },
            },{
                sequelize,
                underscored : false,
                timestamps : true,
                modelName : "Users",
                tableName : "users",
                charset : "utf8",
                collate : "utf8_general_ci"
            }
        )
    }
    static assicoate(db) {
        
        db.User.hasMany(db.Real_estate, { foreignKey : "seller", sourceKey : "id"});
        db.User.hasMany(db.Transaction, { foreignKey : "buyer", sourceKey : "id"});
        db.User.hasMany(db.Transaction, { foreignKey : "seller", sourceKey : "id"});
        db.User.hasMany(db.Comment, { foreignKey : "user_id", sourceKey : "id"});
        db.User.hasMany(db.Recomment, { foreignKey : "user_id", sourceKey : "id"});
        db.User.hasMany(db.Likes, { foreignKey : "user_id", sourceKey : "id"});
        db.User.hasMany(db.Vote, { foreignKey : "user_id", sourceKey : "id"});

    }

}
module.exports = User;

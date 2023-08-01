const {DataTypes,Model} = require("sequelize");

class Real_estate extends Model{
    static init(sequelize){
        return super.init(
            {
                // users 테이블의 id
                seller :{
                    type : DataTypes.INTEGER,
                    allowNull : false,
                },
                // 매물 등록 후 admin 승인여부 전 상태(기본값 : false) , 승인 후 : true
                accpet : {
                    type : DataTypes.BOOLEAN,
                    defaultValue : false,
                },
                // 거래 상태 (0: 매매가능&기본값, 1:거래요청, 2:거래중, 3:거래완료)
                state : {
                    type : DataTypes.INTEGER,
                    defaultValue : 0,
                },
                // 조회수
                views : {
                    type : DataTypes.INTEGER,
                    defaultValue : 0,
                },
                // 건물 이름 
                name : {
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 시,도 (서울특별시, 경기도 등)
                province : {
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 시,군,구
                city : {
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 읍,면,동
                town : {
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 지번 주소
                jibun : {
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 도로명 주소
                road : {
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 상세 주소
                additional_address : {
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 계약금
                deposit: {
                    type : DataTypes.INTEGER,
                    allowNull : false,
                },
                // 잔금 (기본값 계약금의 10%)
                balance: {
                    type : DataTypes.INTEGER,
                    allowNull : false,
                },
                // 건축년도
                year_built :{
                    type : DataTypes.INTEGER,
                    allowNull : false,
                },
                // 위도
                lat :{
                    type : DataTypes.FLOAT,
                    allowNull : false,
                },
                // 경도
                lng :{
                    type : DataTypes.FLOAT,
                    allowNull : false,
                },
                // 전용 면적
                area :{
                    type : DataTypes.FLOAT,
                    allowNull : false,
                },
                // 인증 서류 이미지(본인 땅인지 확인)
                doc :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 매물 타입(아파트, 주택 등)
                type :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 매물 사진
                img_1 :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 매물 사진
                img_2 :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 매물 사진
                img_3 :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 매물 사진
                img_4 :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 매물 사진
                img_5 :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 매물 사진
                img_6 :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                // 매물 사진
                img_7 :{
                    type : DataTypes.STRING,
                    allowNull : false,
                },

            },{
                sequelize,
                underscored : false,
                timestamps : true,
                modelName : "Real_estate",
                tableName : "real_estate",
                charset : "utf8",
                collate : "utf8_general_ci"
            }
        )
    }

    static assicoate(db) {
        
        db.Real_estate.belongsTo(db.User, { foreignKey : "seller", targetKey : "id"});

        db.Real_estate.hasMany(db.Transaction, { foreignKey : "real_estate_id", sourceKey : "id"});
        db.Real_estate.hasMany(db.Comment, { foreignKey : "real_estate_id", sourceKey : "id"});
        db.Real_estate.hasMany(db.Likes, { foreignKey : "real_estate_id", sourceKey : "id"});

    }
}
module.exports = Real_estate;
const {DataTypes, Model} = require("sequelize");

class Likes extends Model{
    static init(sequelize){
        return super.init(
            {
                // users 테이블의 id 참조
                user_id : {
                    type : DataTypes.INTEGER,
                    allowNull : false,
                },
                // 매물 테이블의 id 참조
                real_estate_id : {
                    type : DataTypes.INTEGER,
                    allowNull : false,
                },
            },{
                sequelize,
                underscored : false,
                timestamps : true,
                modelName : "Likes",
                tableName : "likes",
                charset : "utf8",
                collate : "utf8_general_ci"
            }
        )
    }

    static assicoate(db) {
        
        db.Likes.belongsTo(db.User, { foreignKey : "user_id", targetKey : "id"});
        db.Likes.belongsTo(db.Real_estate, { foreignKey : "real_estate_id", targetKey : "id"});


    }
}

module.exports = Likes;
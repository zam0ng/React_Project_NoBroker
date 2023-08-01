const {DataTypes, Model} = require("sequelize");

class Comment extends Model{
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
                // 댓글 내용
                content : {
                    type : DataTypes.STRING,
                    allowNull : false,
                },

            },{
                sequelize,
                underscored : false,
                timestamps : true,
                modelName : "Comment",
                tableName : "comment",
                charset : "utf8",
                collate : "utf8_general_ci"
            }
        )
    }

    static assicoate(db) {
        
        db.Comment.belongsTo(db.User, { foreignKey : "user_id", targetKey : "id"});
        db.Comment.belongsTo(db.Real_estate, { foreignKey : "real_estate_id", targetKey : "id"});
        
        db.Comment.hasMany(db.Recomment, { foreignKey : "comment_id", sourceKey : "id"});


    }
}

module.exports = Comment;
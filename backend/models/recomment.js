const {DataTypes, Model} = require("sequelize");

class Recomment extends Model{
    static init(sequelize){
        return super.init(
            {
                // users 테이블의 id 참조
                user_id : {
                    type : DataTypes.INTEGER,
                    allowNull : false,
                },
                // comment 테이블의 id 참조
                comment_id : {
                    type : DataTypes.INTEGER,
                    allowNull : false,
                },
                // 대댓글 내용
                re_content : {
                    type : DataTypes.STRING,
                    allowNull : false,
                },

                // 작성 시각
                createdAt : {
                    type : DataTypes.STRING,
                    defaultValue : new Date().toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    //   hour: "2-digit",
                    //   minute: "2-digit",
                    //   second: "2-digit",
                    })
                  }

            },{
                sequelize,
                underscored : false,
                timestamps : false,
                modelName : "Recomment",
                tableName : "recomment",
                charset : "utf8",
                collate : "utf8_general_ci"
            }
        )
    }

    static assicoate(db) {

        db.Recomment.belongsTo(db.User, { foreignKey : "user_id", targetKey : "id"});
        db.Recomment.belongsTo(db.Comment, { foreignKey : "comment_id", targetKey : "id"});


    }
}

module.exports = Recomment;
const {DataTypes,Model} = require('sequelize');

class Vote extends Model{
    static init(sequelize){
        return super.init(
            {
                user_id : {
                    type : DataTypes.INTEGER,
                    allowNull : false,
                },
                real_estate_id : {
                    type : DataTypes.INTEGER,
                    allowNull : false,
                },
                // 정상매물 true , 허위매물 false
                result : {
                    type : DataTypes.BOOLEAN,
                }
        },{
            sequelize,
            underscored : false,
            timestamps : true,
            modelName : "Vote",
            tableName : "vote",
            charset : "utf8",
            collate : "utf8_general_ci"
        })
    }
    static assicoate(db) {
        
        db.Vote.belongsTo(db.User, { foreignKey : "user_id", targetKey : "id"});
        db.Vote.belongsTo(db.Real_estate, { foreignKey : "real_estate_id", targetKey : "id"});

    }

}

module.exports = Vote;
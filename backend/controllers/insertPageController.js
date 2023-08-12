const {User} =require('../models');
const { findOne } = require('../models/users');

exports.getUserInfo =async(req,res)=>{

    // 더미 데이터
    const user_id = "qwer";
    try {
        const data = await User.findOne({
            where : {user_id : user_id},
            raw : true,
        })
        console.log("들어옴??");
        console.log(data);
        res.json(data);
    } catch (error) {
        console.log("getUserInfo에서 오류남",error); 
    }   
}

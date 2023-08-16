const {User,Real_estate} =require('../models');
const { findOne } = require('../models/users');

exports.getUserInfo =async(req,res)=>{
    // 더미 데이터
    // const user_id = "";
    const user_id = "qwer";

    try {
        if(user_id==""){
            return res.send("미로그인");
        }
        const data = await User.findOne({
            where : {user_id : user_id},
            raw : true,
        })
        
        res.json(data);
    } catch (error) {
        console.log("getUserInfo에서 오류남",error); 
    }   
}


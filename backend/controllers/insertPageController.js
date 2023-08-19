const {User,Real_estate} =require('../models');
const { findOne } = require('../models/users');

exports.getUserInfo = async (req,res)=>{
    console.log(req);
    console.log(req.acc_decoded);

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



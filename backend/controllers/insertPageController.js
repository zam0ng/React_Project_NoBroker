const {User,Real_estate} =require('../models');
const { findOne } = require('../models/users');

exports.getUserInfo = async (req,res)=>{
    console.log(req);
    console.log(req.acc_decoded);
    // const user_id = req.acc_decoded.user_id;

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


// exports.getUserList = async(req, res) => {
//     try {

//         const userListData = await User.findAll({
//             // where : {}
//         })

//         // console.log("userListData" , userListData)
//         return res.json({ userListData })

//     } catch (error) {
//         console.log("getUserList 에서 오류 " , error)

//     }
// }



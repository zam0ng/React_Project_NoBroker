const {User,Real_estate} =require('../models');
const { findOne } = require('../models/users');

exports.getUserInfo = async (req,res)=>{
    console.log("getUserInfo--------------");
    console.log(req.acc_decoded);
    const {id} = req.acc_decoded;
    try {

        const data = await User.findOne({
            where : {id : id},
            raw : true,
        })

        console.log(data)

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



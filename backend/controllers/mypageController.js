const {User,Real_estate} =require('../models');
const { findOne } = require('../models/users');

exports.getMypageInfo = async(req,res)=>{
    console.log("getMypageInfo 들옴??")
    // 더미
    const id = 1;

    try {
        if(id==""){
            return res.send("미로그인");
        }

        const data = await Real_estate.findAll({
            where : {seller : id},
            attributes : ["id","accpet","jibun","additional_address","balance","year_built","area","type","img_1","createdAt"],
            order :[["createdAt","DESC"]],
            raw : true,
        })
        console.log(data);
        res.json(data);
    } catch (error) {
        console.log("마이페이지 컨트롤러 오류",error);
    }
}

exports.reSubmit = async(req,res)=>{

    try {
        console.log("reSubmit 컨트롤러 드렁옴???");
        const {el} = req.query;
        const data = await Real_estate.update({
            accpet : 0
        },{
            where :{id : el},
        })

        console.log(data);
        res.json({data : data, msg : "성공"});
    } catch (error) {
        console.log("reSubmit 컨트롤러에서 오류남" + error);
    }
}
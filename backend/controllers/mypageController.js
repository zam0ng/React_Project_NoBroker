const {User,Real_estate,Transaction} =require('../models');
const { findOne } = require('../models/users');
const {Op} =require("sequelize");
const cron = require("node-cron");

exports.getMypageInfo = async(req,res)=>{
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
        res.json(data);
    } catch (error) {
        console.log("마이페이지 컨트롤러 오류",error);
    }
}

exports.reSubmit = async(req,res)=>{

    try {
        const {el} = req.query;
        const data = await Real_estate.update({
            accpet : 0
        },{
            where :{id : el},
        })

        res.json({data : data, msg : "성공"});
    } catch (error) {
        console.log("reSubmit 컨트롤러에서 오류남" + error);
    }
}

exports.getmyregisterinfo = async (req,res)=>{
    
    // 더미
    const id = 1;

    try {
        // 매시간마다 Transaction 테이블에 거래 날짜와 현재 날짜를 비교하여
        // 현재 날짜 > 거래 날짜 이면 completed 를 1로 변경
        cron.schedule('0 * * * *', async () => {
        const transactionCom = await Transaction.findAll({
            attributes :["transaction_date","completed","id"],
            raw: true,
        })
        
        const currentTime = new Date();

        transactionCom.forEach(async(el) => {
            console.log(el);
            const transactionTime = new Date(el.transaction_date);

            if(currentTime > transactionTime){
                const ta = await Transaction.update({completed : true},{
                    where : { id : el.id},
                })
                console.log(ta);
            }
        });
        },{
            scheduled : true,
            timezone : 'Asia/Seoul',
        });

        //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

        const data = await Transaction.findAll({
            where :{
                [Op.or]:[
                    {seller :id},
                    {buyer : id},
                ],
            },
            include : [{model : Real_estate, attributes : ["id","jibun","additional_address","balance","year_built","area","type","img_1"]}],
            // raw: true,
        })

        // const realestateInfo =[];

        // for( const transaction of data){
        //     const realestateId = transaction.real_estate_id;
        //     const estateData = await Real_estate.findOne({
        //         where :{ id: realestateId},
        //         raw : true,
        //     });

        //     realestateInfo.push(estateData);
        // }

      
        return res.json({data, user_id:id});
    } catch (error) {
        console.log("getmyregisterinfo 에서 오류",error);
    }

}
    

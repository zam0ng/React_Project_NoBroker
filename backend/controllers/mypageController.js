const {User,Real_estate,Transaction, sequelize,Likes,Vote} =require('../models');
const { findOne } = require('../models/users');
const {Op, Sequelize} =require("sequelize");
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

exports.getmyregisterinfo = async (req, res) => {
    const id = 1;
    // 매시간마다 Transaction 테이블에 거래 날짜와 현재 날짜를 비교하여
    // 현재 날짜 > 거래 날짜 이면 completed 를 1로 변경transactionCompleted
        try {
            const transactionCom = await Transaction.findAll({
                attributes: ["transaction_date", "completed", "id"],
                where: {
                    approved: 1,
                    completed: 0,
                },
                raw: true,
            })

            const currentTime = new Date();
            transactionCom.forEach(async(el) => {
                const transactionTime = new Date(el.transaction_date);

                if (currentTime > transactionTime) {
                    const ta = await Transaction.update({ completed: true }, {
                        where: { id: el.id }
                    })

                }
            })
        } catch (error) {
            console.log("transactionCompleted에서 오류",error);
    }
    try {
        const data = await Transaction.findAll({
            where : { completed :1 },
            include : [{model: Real_estate,attributes:["id","balance","deposit"]}],
            // raw : true,
        })
        data.forEach(async(el) => {

            await User.update({
                disabled_won : sequelize.literal(`disabled_won - ${el.Real_estate.deposit-el.Real_estate.balance}`),
                
            },{
                where : {id : el.buyer},
            })

            await User.update({
                won : sequelize.literal(`won + ${el.Real_estate.deposit-el.Real_estate.balance}`),
            },{
                where : {id : el.seller}
            })

            await Transaction.update({
                completed : 2
            },{
                where : {real_estate_id : el.Real_estate.id}
            })
        });
        
    } catch (error) {
        console.log(error);
    }
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    try {
        const data = await Transaction.findAll({
            where: {
                [Op.or]: [
                    { seller: id },
                    { buyer: id },
                ],
            },
            include: [{ model: Real_estate, attributes: ["id", "jibun", "additional_address", "balance", "deposit", "year_built", "area", "type", "img_1"] }],
            // raw: true,
        })

        return res.json({ data, user_id: id });
    } catch (error) {
        console.log("getmyregisterinfo 에서 오류", error);
    }

}
// 구매자의 disable_won 을 잔금 만큼 빼고, 판매자의 won 에 잔금만큼 더하기
exports.transactionCom = async(req,res)=>{
    try {
        const data = await Transaction.findAll({
            where : { completed :1 },
            include : [{model: Real_estate,attributes:["id","balance","deposit"]}],
            // raw : true,
        })
        data.forEach(async(el) => {
            console.log(el.buyer)
            console.log(el.Real_estate.deposit-el.Real_estate.balanc);

            await User.update({
                disabled_won : sequelize.litseral(`disabled_won - ${el.Real_estate.deposit-el.Real_estate.balance}`),
                
            },{
                where : {id : el.buyer},
            })

            await User.update({
                won : sequelize.literal(`won + ${el.Real_estate.deposit-el.Real_estate.balance}`),
            },{
                where : {id : el.seller}
            })

            await Transaction.update({
                completed : 2
            },{
                where : {real_estate_id : el.Real_estate.id}
            })
        });
        
    } catch (error) {
        console.log(error);
    }
}

exports.transactionStateUpdate = async(req,res)=>{
    
    try {

        const {el}=req.query;
        // 계약금 2배
        // 계약금 : (amount/2) , 잔금 : ((amount/2)*9) , 전체금액 : (amount*5)
        const amount = parseInt((el.deposit *2) * 10000);
        
        if(el.btnname=="승인"){
            await Transaction.update({approved : true},{
                where : {
                    id : el.estateId,
                }
            })
            // 승인했을 때 판매자에게 계약금 지급,
            await User.increment('won',{
                by : (amount/2),
                where : {id : el.userID},
            })

            res.send("승인");
        }
        //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
        
        else if(el.btnname=="판매취소"){

            // 거래 중인지 approved 가져와서 판별
            const data= await Transaction.findOne({
                where : {
                    id : el.transactionID,
                }, raw : true,
            })
            console.log("--------------",data.approved);
            // 판매 승인을 누르기 전 취소(거래중이 아닐 때 취소)
            // 구매자의 disabled 를 잔금 만큼 뺴고, 잔고에는 매매가 만큼 더하기
            if(data.approved == 0 ){

                await Transaction.update({cancel : el.userID},{
                    where : {
                        id : el.estateId,
                    }
                })
                await User.update({
                    disabled_won : sequelize.literal(`disabled_won - ${((amount/2)*9)}`),
                    won : sequelize.literal(`won +${(amount*5)}`),
                },{
                    where : {id : el.buyerID}
                })

                
                res.send("판매취소완료");
            }
            // 판매 승인을 누르고 취소(거래중일 때 취소)
            // deposit(계약금)의 2배를 구매자에게 줘야함.
            else{
                const data = await User.findOne({
                    where :{
                        id : el.userID,
                    }, raw:true, attributes:["won"]
                })
                const myWon=(data.won/10000);
                console.log(myWon);

            // 판매자의 잔고 확인 > 계약금 x 2 확인 해서 true
            // 판매자의 잔고에서는 빼고, 구매자의 잔고에서는 더하고, 구매자의 사용불가 금액에서는 계약금만큼 차감
                if(myWon >= (el.deposit)*2){
                    await Transaction.update({cancel : el.userID},{
                        where : {
                            id : el.estateId,
                        }
                    })
                    
                    console.log(amount)

                    try {
                        const updates = [
                            {action : 'decrement', id : el.userID, amount : amount},
                            {action : 'increment', id : el.buyerID, amount : amount}
                        ];
                        const updateQueries = updates.map((value) => ({
                            won: sequelize.literal(`won ${value.action === 'increment' ? '+':'-'} ${value.amount}`)
                        }));
                        
                            console.log(updateQueries);
                        
                            updateQueries.map( async(value,index) => {
                                try {
                                    const transaction = await sequelize.transaction();
                                    await User.update(value, {
                                        where: { id: updates[index].id },
                                        transaction: transaction
                                    });

                                    
                                    await transaction.commit();
                                } catch (error) {
                                    await transaction.rollback();
                                    console.error("트랜잭션 에러:", error);
                                }
                            })
                            
                                await User.decrement('disabled_won', {
                                    by: (amount / 2),
                                    where: { id: el.buyerID },
                                })

                        res.send("판매취소완료");
                        
                    } catch (error) {
                        console.log("error",error)
                    }
                    
                }
                else{
                    res.send("판매자잔고부족")
                }
            }
        }
        else if(el.btnname=="구매취소"){

            await Transaction.update({cancel : el.userID},{
                where : {
                    id : el.estateId,
                }
            })

            // 거래 중인지 approved 가져와서 판별
            const data= await Transaction.findOne({
                where : {
                    id : el.transactionID,
                }, raw : true,
            })
            // 거래 전 구매취소 -> 구매자의 disabled 에서 잔금만큼 빼고, 잔고에는 계약금+잔금 더하기
            if(data.approved == 0 ){
                try { 
                    await User.update({
                        disabled_won: sequelize.literal(`disabled_won - ${(amount/2)*9}`),
                        won : sequelize.literal(`won + ${amount*5}`)
                    },{
                        where : {id :el.userID}
                    })
                } catch (error) {
                    console.log("구매취소 오류 app 0",error);
                }
                
            }
            // 거래 중 구매 취소 -> 구매자의 disabled에서 잔금만큼 빼고, 잔고에는 잔금만큼 더해주고, 판매자의 잔고에는 계약금 만큼 더한다.
            else{
                await User.update({
                    disabled_won : sequelize.literal(`disabled_won - ${((amount/2)*9)}`),
                    won : sequelize.literal(`won + ${((amount/2)*9)}`),
                },{
                    where : {id : el.userID}
                })
                await User.update({
                    won : sequelize.literal(`won + ${(amount/2)}`),

                },{
                    where : { id: el.sellerID },
                })
 
            }
            res.send("구매취소완료")
        }
        // 매물id로 거래 테이블 삭제하고, 매물 accpet 를 1로
        else if(el.btnname=="재등록"){
            console.log(el);
            await Transaction.destroy({where : {real_estate_id : el.estateId}})
            await Real_estate.update({
                accpet : 1,
                
            },{
                where : {id : el.estateId},
            })

            res.send("재등록 완료");
        }
        
        
    } catch (error) {
        console.log("거래 상태 업데이트 컨트롤러에서 오류",error)
    }
}

exports.getMycheck =async(req,res)=>{
    //더미
    const user_id = 1;
    try {
        const data = await Likes.findAll({
            where :{user_id : user_id},

            include: [{ model: Real_estate, attributes: ["id", "jibun", "additional_address", "balance","deposit", "year_built", "area", "type", "img_1"] }],

        })
        res.json(data);

    } catch (error) {
        console.log("getMycheck 컨트롤러 오류",error);
    }
}

exports.checkcancel = async(req,res)=>{
    try {
        const {el}= req.query;

        const data = await Likes.destroy({
            where :{real_estate_id : el.el}
        })
        res.json("찜취소성공");
    } catch (error) {
        console.log("checkcancel 컨트롤러에서 오류남",error);
    }
}

exports.getCancelList = async(req,res) =>{
    console.log("들어오니?");
    const id = 1;
    // 구매했는데 취소가 내가 아닐 때 
    try {
        const data = await Transaction.findAll({
            where:{
                buyer : id,
                approved : 1,
                cancel :{
                    [Op.ne] : id,
                }
            },
            include: [{ model: Real_estate, attributes: ["id", "jibun", "additional_address", "balance", "deposit", "year_built", "area", "type", "img_1"] }],
            // raw : true,
        })
        res.json(data);
    } catch (error) {
        console.log("getCancelList 컨트롤러에서 오류남",error);
    }
}

exports.getMyvotedata = async(req,res)=>{

    const id = 2;
    try {
        const data = await Vote.findAll({
            where : {
                user_id : id,
            },
            include: [{ model: Real_estate, attributes: ["id", "accpet","jibun", "additional_address", "balance", "deposit", "year_built", "area", "type", "img_1"] }],
        })
        console.log(data);
        res.json(data);
    } catch (error) {
        console.log("getMyvotedata 컨트롤러에서 오류남",error);
    }
}

exports.getUpdateinfo= async(req,res)=>{
    console.log("9999999")

    const id=1;
    try {
        const data = await User.findOne({
            where :{id : id},
            // attributes : ['user_img','user_id','user_name','address',
            // 'phone','ssn']
        })
    res.json(data);
    } catch (error) {
        console.log("getUpdateinfo error",error)
    }
}

exports.userInfoUpdate = async(req,res)=>{
    try {
        console.log("req.bodyㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        console.log(req.body);
        console.log(req.file);
        const {userid,userphone,useraddress} = req.body;

        const updateFields = {};

if (userid) {
  updateFields.user_id = userid;
}

if (userphone) {
  updateFields.phone = userphone;
}

if (useraddress) {
  updateFields.address = useraddress;
}

if (req.file) {
  updateFields.user_img = req.file.path;
}
if (Object.keys(updateFields).length > 0) {
    await User.update(updateFields, {
      where: {
        id: 1,
      },
    });
  } else {
    // 업데이트할 필드가 없는 경우에 대한 처리
    console.log("No fields to update.");
  }
        
    } catch (error) {
        console.log("userInfoUpdate 컨트롤러에서 오류",error);
    }
}
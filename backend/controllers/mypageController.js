const {User,Real_estate,Transaction, sequelize} =require('../models');
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

exports.getmyregisterinfo = async (req,res)=>{
    
    // 더미
    const id = 1;

    try {
        // 매시간마다 Transaction 테이블에 거래 날짜와 현재 날짜를 비교하여
        // 현재 날짜 > 거래 날짜 이면 completed 를 1로 변경
        cron.schedule('* * * * *', async (req,res) => {
        const transactionCom = await Transaction.findAll({
            attributes :["transaction_date","completed","id"],
            where :{
                approved : 1,
                completed : 0,
            },
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
                // console.log(ta);
            }
        });
        
        res.send("거래완료");
        },{
            scheduled : true,
            timezone : 'Asia/Seoul',
        }
        );

        //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

        const data = await Transaction.findAll({
            where :{
                [Op.or]:[
                    {seller :id},
                    {buyer : id},
                ],
            },
            include : [{model : Real_estate, attributes : ["id","jibun","additional_address","balance","deposit","year_built","area","type","img_1"]}],
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

exports.transactionStateUpdate = async(req,res)=>{
    
    try {
        const {el}=req.query;
        console.log(el);
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
        
    } catch (error) {
        console.log("거래 상태 업데이트 컨트롤러에서 오류",error)
    }
}
    

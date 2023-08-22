const {User,Real_estate,Transaction, sequelize,Likes,Vote} =require('../models');
const {Op} =require("sequelize");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const path = require("path");


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
exports.approvedUpdate = async(req,res) =>{
    console.log("req.decodedㅡㅡㅡㅡㅡㅡㅡㅡ");
    // console.log(req.acc_decoded);
    const {el}=req.query;
    // console.log(el);
     
        const amount = parseInt((el.balance) * 10000); // 계약금 
        // 계약금 2배 : amount*2
        const restMoney = parseInt((el.deposit-el.balance) *10000);
        // 매매금 : el.deposit
        console.log("amount------------",amount)
        console.log(restMoney);
    try {
        
        // 여기서 pdf 만들어야함.ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
            console.log("승인 들어오니?222222222");
            // await Transaction.update({approved : true},{
            //     where : {
            //         id : el.estateId,
            //     }
            // })
            // 승인했을 때 판매자에게 계약금 지급,
            await User.increment('won',{
                by : (amount),
                where : {id : el.userID},
            })
            const data = await Transaction.findAll({
                where : {
                    id : el.transactionID,
                },
                include: [ 
                    { model: User, as: 'Buyer',attributes:["user_img","address","ssn","phone","user_name","seal_img"] },   
                    { model: User, as: 'Seller',attributes:["user_img","address","ssn","phone","user_name","seal_img"] },
                    { model: Real_estate, attributes :["jibun","type","area","deposit","balance","year_built","doc"]}],
                })
            // console.log(data);
            // console.log(data[0]);
            console.log(data[0].Seller.seal_img);
            console.log(data[0].Buyer.seal_img);
            const sellerSealImg = (data[0].Seller.seal_img).split("\\")[2];
            const buyerSealImg = (data[0].Buyer.seal_img).split("\\")[2];
            console.log(sellerSealImg);
            console.log(buyerSealImg);


            const doc = new PDFDocument();
            const fontPath = path.join(__dirname,'../../front','public/fonts/NotoSansKR-Light.ttf')
            const imgPath = path.join(__dirname,'../../front','public/NoBroker_Logo.png')
            const sellerPath = path.join(__dirname,'../',`imgs/estate/${sellerSealImg}`)
            const buyerPath = path.join(__dirname,'../',`imgs/estate/${buyerSealImg}`)
            const fileName = 'contract.pdf';
            const stream = fs.createWriteStream(fileName);
            doc.pipe(stream);
            doc.font(fontPath).fontSize(24).text('부동산 매매 계약서', { align: 'center' });

            // 1.~
            const content = `1. 매도인과 매수인은 쌍방은 아래 표시 부동산에 관하여 다음 계획 내용과 같이 매매계획을 체결한다.`;
            doc.rect(30, 150, 550, 20).fillColor('#FFCC80').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text(content, 40, 150, {align : 'center'});
            //-----------
            
            //소재지
            doc.rect(30, 170, 90, 20).fillColor('#EEEEEE').strokeColor('#000000').fillAndStroke().stroke(); // 왼쪽 작은 박스
            doc.font(fontPath).fontSize(12).fillColor('#000000').text("소재지", 40, 170, {align : 'left'});

            doc.rect(120, 170, 460, 20).stroke();
            doc.font(fontPath).fontSize(10).text(`${data[0].Real_estate.jibun}`, 130, 170, {align : 'left'});
            //-----------
            
            //건물
            doc.rect(30, 190, 90, 20).fillColor('#EEEEEE').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text("건물", 40, 190, {align : 'left'});

            //타입
            doc.rect(120, 190, 90, 20).fillColor('#EEEEEE').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text("타입", 130, 190, {align : 'left'});

            doc.rect(210, 190, 90, 20).stroke();
            doc.font(fontPath).fontSize(10).text(`${data[0].Real_estate.type}`, 220, 190, {align : 'left'});
            //-----------
            
            //면적
            doc.rect(300, 190, 90, 20).fillColor('#EEEEEE').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text("면적", 310, 190, {align : 'left'});

            doc.rect(390, 190, 190, 20).stroke();
            doc.font(fontPath).fontSize(10).text(`${data[0].Real_estate.area}㎡`, 400, 190, {align : 'left'});
            //-----------
           
            // 2.~
            const content1 = `2. 부동산의 매매에 대하여 매도인과 매수인은 합의에 의하여 매매대금을 아래와 같이 지불하기로 한다.`;
            doc.rect(30, 210, 550, 20).fillColor('#FFCC80').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text(content1, 40, 210, {align : 'center'});
            //-----------
            
            //매매대금
            doc.rect(30, 230, 90, 20).fillColor('#EEEEEE').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text("매매대금", 40, 230, {align : 'left'});

            doc.rect(120, 230, 460, 20).stroke();
            doc.font(fontPath).fontSize(10).fillColor('#000000').text(`${data[0].Real_estate.deposit} 만원`, 130, 230, {align : 'left'});
            //-----------
            
            // 계약금
            doc.rect(30, 250, 90, 20).fillColor('#EEEEEE').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text("계약금", 40, 250, {align : 'left'});

            doc.rect(120, 250, 460, 20).stroke();
            doc.font(fontPath).fontSize(10).fillColor('#000000').text(`${data[0].Real_estate.balance} 만원`, 130, 250, {align : 'left'});
            //-----------

            // 잔금
            doc.rect(30, 270, 90, 20).fillColor('#EEEEEE').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text("잔금", 40, 270, {align : 'left'});

            doc.rect(120, 270, 460, 20).stroke();
            doc.font(fontPath).fontSize(10).fillColor('#000000').text(`${data[0].Real_estate.deposit - data[0].Real_estate.balance} 만원 / 잔금날짜 : ${data[0].transaction_date}`, 130, 270, {align : 'left'});
            //-----------
            // 약조
            doc.font(fontPath).fontSize(10).fillColor('#000000').text("제 1 조", 40, 290, {align : 'left'});
            doc.font(fontPath).fontSize(10).fillColor('#000000').text("매도인은 매매대금의 잔금 수령과 동시에 매수인에게 소유권이전동기에 필요한 모든 서류를 교부하고 등기절차에 협력한다.", 70, 290, {align : 'left'});
            doc.font(fontPath).fontSize(10).fillColor('#000000').text("제 2 조", 40, 320, {align : 'left'});
            doc.font(fontPath).fontSize(10).fillColor('#000000').text("거래승인 후 매도인에게 잔금이 지불되기 전까지 매도인은 계약금의 2배액을 상환하고, 매수인은 계약금을 포기하고 본 계약을 해제할 수 있다.", 70, 320, {align : 'left'});
            doc.font(fontPath).fontSize(10).fillColor('#000000').text("제 3 조 계약 해지 시 본 매매계약서는 효력은 소멸된다.", 40, 350, {align : 'left'});
            doc.font(fontPath).fontSize(10).fillColor('#000000').text("제 4 조 NoBroker는 매도인 또는 매수인의 본 계약 불이행에 대하여 책임을 지지 않는다.", 40, 370, {align : 'left'});
            doc.font(fontPath).fontSize(10).fillColor('#000000').text("본 계약을 증명하기 위하여 계약 당사자가 이의 없음을 확인하고 각각 서명,날인 후 매도인, 매수인은 각각 보관한다.", 40, 390, {align : 'left'});
            //-----------
            // 매도인
            doc.rect(30, 410, 50, 40).fillColor('#EEEEEE').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text(`매도인`, 40, 420, {align : 'left'});

            doc.rect(80, 410, 90, 20).fillColor('#EEEEEE').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text(`주소`, 90, 410, {align : 'left'});

            doc.rect(170, 410, 360, 20).stroke();
            doc.font(fontPath).fontSize(10).fillColor('#000000').text(`${data[0].Seller.address}`, 180, 410, {align : 'left'});

            doc.rect(80, 430, 90, 20).fillColor('#EEEEEE').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text(`주민등록번호`, 90, 430, {align : 'left'});

            doc.rect(170, 430, 360, 20).stroke();
            doc.font(fontPath).fontSize(10).fillColor('#000000').text(`${data[0].Seller.ssn}`, 180, 430, {align : 'left'});

            doc.rect(530, 410, 50, 40).stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text(`인`, 550, 420, {align : 'left'});
            //-----------
            // 매수인
            doc.rect(30, 450, 50, 40).fillColor('#EEEEEE').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text(`매수인`, 40, 460, {align : 'left'});

            doc.rect(80, 450, 90, 20).fillColor('#EEEEEE').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text(`주소`, 90, 450, {align : 'left'});

            doc.rect(170, 450, 360, 20).stroke();
            doc.font(fontPath).fontSize(10).fillColor('#000000').text(`${data[0].Buyer.address}`, 180, 450, {align : 'left'});

            doc.rect(80, 470, 90, 20).fillColor('#EEEEEE').strokeColor('#000000').fillAndStroke().stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text(`주민등록번호`, 90, 470, {align : 'left'});

            doc.rect(170, 470, 360, 20).stroke();
            doc.font(fontPath).fontSize(10).fillColor('#000000').text(`${data[0].Buyer.ssn}`, 180, 470, {align : 'left'});

            doc.rect(530, 450, 50, 40).stroke();
            doc.font(fontPath).fontSize(12).fillColor('#000000').text(`인`, 550, 460, {align : 'left'});
            //-----------
            doc.image(imgPath, 530, 500, { width: 50, height: 50 });
            doc.image(sellerPath, 535, 415, { width: 40, height: 30 });
            doc.image(buyerPath, 535, 455, { width: 40, height: 30 });
            // 인감이미지 지원이랑 말해야함 저장하는거 ~~

            
            


            

            doc.end();

            stream.on("finish", () => {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=contract.pdf');
                const readStream = fs.createReadStream(fileName);
                readStream.pipe(res);
            });

        //여기서 pdf 만들어야함.ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    } catch (error) {
        console.log("approvedUpdate 컨트롤러 오류",error)
    }
}

exports.transactionStateUpdate = async(req,res)=>{
    
    try {

        const {el}=req.query;

        const amount = parseInt((el.balance) * 10000); // 계약금 
        // 계약금 2배 : amount*2
        const restMoney = parseInt((el.deposit-el.balance) *10000);
        // 매매금 : el.deposit
        console.log("amount------------",amount)
        
         if(el.btnname=="판매취소"){

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
                    disabled_won : sequelize.literal(`disabled_won - ${restMoney}`),
                    won : sequelize.literal(`won +${(el.deposit)}`),
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
                // console.log(myWon);

            // 판매자의 잔고 확인 > 계약금 x 2 확인 해서 true
            // 판매자의 잔고에서는 빼고, 구매자의 잔고에서는 더하고, 구매자의 사용불가 금액에서는 계약금만큼 차감
                if(myWon >= (el.deposit)*2){
                    await Transaction.update({cancel : el.userID},{
                        where : {
                            id : el.estateId,
                        }
                    })
                    
                    // console.log(amount)

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
                        disabled_won: sequelize.literal(`disabled_won - ${(amount)*9}`),
                        won : sequelize.literal(`won + ${el.deposit}`)
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
                    disabled_won : sequelize.literal(`disabled_won - ${restMoney}`),
                    won : sequelize.literal(`won + ${restMoney}`),
                },{
                    where : {id : el.userID}
                })
                await User.update({
                    won : sequelize.literal(`won + ${(amount)}`),

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
            const data = await User.update(updateFields, {
                where: {
                    id: 1,
                },
            });
        }
        res.send("유저정보수정성공");
} catch (error) {
        console.log("userInfoUpdate 컨트롤러에서 오류",error);
    }
}

exports.withdraw = async(req,res)=>{
    try {
        console.log(req.query);
        const id = req.acc_decoded.id;
        const {el} = req.query;

        await User.update({
            won: sequelize.literal(`won - ${el.money}`)
        },{
            where : {id : id},
        })

        res.send("출금완료")
    } catch (error) {
        console.log("withdraw 컨트롤러에서 오류남",error);
    }
}
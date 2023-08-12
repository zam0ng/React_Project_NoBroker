const { raw } = require('express');
const {Real_estate} =require('../models');

exports.EstateInfo = async(req,res)=>{
 
  const seller = req.body[0];
  const province = req.body[1];
  const city = req.body[2];
  const town = req.body[3];
  const jibun = req.body[4];
  const road = req.body[5];
  const lng = req.body[6];
  const lat = req.body[7];
  const additional_address = req.body[8];
  const balance = req.body[9];
  const deposit = req.body[10];
  const area = req.body[11];
  const doc = req.body[12];
  const type = req.body[13];
  const year_built = req.body[14];
  
  // console.log("매물정보 뜨나??");
  
  // console.log(seller,province,city,town,jibun,road,lng,lat,
  //   additional_address,balance,deposit);
    
    const imgpathArr = new Array(7).fill("");
    // console.log(imgpathArr);

  for (let index = 0; index < req.files.length; index++) {

    imgpathArr[index]=req.files[index].path;
  }
    console.log("++++++++++++++++++")
    // console.log(imgpathArr);
    try {
      const data = await Real_estate.findOne({
        where :{doc : doc},
        raw : true,
      })
      
      console.log("doc정보임", data);
      if(data==null){
      await Real_estate.create({
        seller,
        province,
        city,
        town,
        jibun,
        road,
        lng,
        lat,
        additional_address,
        balance,
        deposit,
        area,
        doc,
        type,
        year_built,
        img_1:imgpathArr[0],
        img_2:imgpathArr[1],
        img_3:imgpathArr[2],
        img_4:imgpathArr[3],
        img_5:imgpathArr[4],
        img_6:imgpathArr[5],
        img_7:imgpathArr[6],
      })
      
      res.send("매물 등록 완료");
    }
    else {
      res.json({msg : "이미 등록", accpetData : data.accpet});
    }

    } catch (error) {
        console.log(error);
    }
}
const {
  Real_estate,
  User,
  Likes,
  Comment,
  Recomment,
  Transaction,
} = require("../models");

const { Op } = require('sequelize');  // 여러 값 한번에 조회하기 위한 것



// 거래 가능한 모든 매물 반환 | 우선 state = 0 으로 테스트
exports.getTradableEstate = async(req , res) => {
  try {    

    console.log(req.query.roomType)
      // [목표 URL]`http://localhost:8080/list/tradableEstate?roomType=${checkedRoomTypes}&priceRangeValue=${priceRangeValue}`
      // 'req.query 는 객체' 임 => 따라서, 복수의 key 값이 있어도, 개별적으로 접근할 수 있음. 
      // 배열로 만들어서, 내가 필요한 값이 있나 없나 filter 를 안 해줘도 됨.  

    const whereConditions = {
        state : null,   // 모든 집값 상태를 가져오겠다.
    }


    if (req.query.roomType)  {
      const roomType = req.query.roomType;
      const arrRoomType = roomType.split(',');
      whereConditions.type = {
        [Op.in] : arrRoomType
      }
    }


    // console.log("req.query.priceRangeValue" , req.query.priceRangeValue)
    if(req.query.priceRangeValue){
      const minPrice = parseInt(req.query.priceRangeValue.split(',')[0], 10);
      const maxPrice = parseInt(req.query.priceRangeValue.split(',')[1], 10);
      whereConditions.deposit = {
        // 최소값과 최대값 사이에 있는 deposit 을 갖고 있는 모든 row 가져오기
        [Op.gte]: minPrice,  // deposit이 minPrice 이상
        [Op.lte]: maxPrice   // deposit이 maxPrice 이하
      }
    }
    
    if(req.query.builtYearValue){
      const minYear = parseInt(req.query.builtYearValue.split(',')[0], 10);
      const maxYear = parseInt(req.query.builtYearValue.split(',')[1], 10);
      whereConditions.year_built = {
        [Op.gte] : minYear, 
        [Op.lte] : maxYear,
      }
    }


    if(req.query.areaRangeValue){
      const minArea = parseInt(req.query.areaRangeValue.split(',')[0], 10);
      const maxArea = parseInt(req.query.areaRangeValue.split(',')[1], 10);
      whereConditions.area = {
        // 최소값과 최대값 사이에 있는 deposit 을 갖고 있는 모든 row 가져오기
        [Op.gte]: minArea,  // 면적이 최소한 minArea 
        [Op.lte]: maxArea   // 면적이 최대 maxArea
      }
    }
    


    console.log("whereConditions" , whereConditions)  
      // [문제상황] whereConditions { state: null, type: 'null' } 이렇게 찍힘 | 즉, type 이 null 이라는게 문제
      // [시도] 그래서, 문자열 null 이면, 일반 null 로 해달라고 해봄 

    const tradableEstate = await Real_estate.findAll({
      // where: whereConditions.state    // [주의] 이렇게 state 까지 넣어야 null 이 들어감. 
      where: whereConditions    // [주의] 이렇게 하면, 선택된게 들어감. 
    });

    return res.json({ tradableEstate })

  } catch (error) {
    console.log("@getTradableEstate" , error);
    return res.json({error})
  }
}

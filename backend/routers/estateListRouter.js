const router = require("express").Router();
const { getTradableEstate , getFilterTradableEstate} = require("../controllers/estateListController");
const { isLogin, isLoginNext } = require("../middleware/isLogin")


// 쿼리 스트링으로 데이터 받기 test 
// router.get("/filterTradableEstate/" , getFilterTradableEstate)

// | state 조건 수정 해야 함 | 심사 통과된, 판매가능한, 모든 매물 
// router.get("/tradableEstate", isLoginNext, getTradableEstate);
router.get("/tradableEstate", getTradableEstate);   // 미들웨어 없이


router.get("/test", (req, res)=>{
    console.log("test요청 들어옴");
    // return res.json({test : "test", __dirname});     // 이전 test
    return res.json({test : "test"});
});

module.exports = router;
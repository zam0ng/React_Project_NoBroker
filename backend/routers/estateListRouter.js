const router = require("express").Router();
const { getTradableEstate , getFilterTradableEstate} = require("../controllers/estateListController");

// 쿼리 스트링으로 데이터 받기 test 
// router.get("/filterTradableEstate/" , getFilterTradableEstate)

// | state 조건 수정 해야 함 | 심사 통과된, 판매가능한, 모든 매물 
router.get("/tradableEstate", getTradableEstate);

module.exports = router;
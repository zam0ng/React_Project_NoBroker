const router = require("express").Router();
const { getEstate, voteEstate } = require("../controllers/estateVoteController");

// 투표 가능한 매물 목록 반환(투표 완료한 매물 제외)
router.get("/", getEstate);

// 매물 허위/정상매물인지 투표
router.post("/voteEstate", voteEstate);

module.exports = router;
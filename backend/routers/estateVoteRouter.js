const router = require("express").Router();
const { getEstate, voteEstate, getUserVote, checkAuthorization } = require("../controllers/estateVoteController");
const { isLogin } = require("../middleware/isLogin");

// 투표 가능한 매물 목록 반환(투표 완료한 매물 제외)
router.get("/", isLogin, getEstate);

// 권한 확인
router.get("/checkAuthorization", isLogin, checkAuthorization);

// 매물 허위/정상매물인지 투표
router.post("/voteEstate", isLogin, voteEstate);

// 매물 투표했는지 여부 반환
router.get("/getUserVote/:real_estate_id", isLogin, getUserVote)

module.exports = router;
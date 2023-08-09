const router = require("express").Router();
const { voteEstate } = require("../controllers/estateVoteController");

// 매물 허위/정상매물인지 투표
router.post("/", voteEstate);


module.exports = router;
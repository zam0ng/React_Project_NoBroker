const router = require("express").Router();
const { buyEstate,  likeEstate, delLikeEstate, postComment, postRecomment} = require("../controllers/estateDetailController");


// 로그인 필요
// 매물 구매(판매 가능한 등급(패널티 없는 사람)인지 판별 필요)
router.post("/buyEstate", buyEstate);

// 로그인 필요
// 매물 찜
router.post("/like", likeEstate);

// 로그인 필요
// 매물 찜 취소
router.post("/delLike", delLikeEstate);

// 로그인 필요
// 댓글 작성
router.post("/postComment", postComment);

// 로그인 필요
// 대댓글 작성
router.post("/postRecomment", postRecomment);


module.exports = router;
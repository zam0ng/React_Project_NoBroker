const router = require("express").Router();
const { getEstate, viewEstate, buyEstate, likeEstate, delLikeEstate, postComment, postRecomment } = require("../controllers/estateDetailController");
const { isLogin } = require("../middleware/isLogin")

// 매물 상세 정보 반환(댓글,대댓글,찜 여부 반환)
router.get("/:id", getEstate);

// 매물 조회수 올리기
router.post("/view/:id", viewEstate);

// 로그인 필요
// 매물 구매
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
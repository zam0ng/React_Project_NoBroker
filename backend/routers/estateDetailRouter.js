const router = require("express").Router();
const { getEstate, buyEstate, getTradableEstate , likeEstate, delLikeEstate, postComment, postRecomment } = require("../controllers/estateDetailController");

// | test | 심사 통과된, 판매가능한, 모든 매물 
router.get("/tradableEstate", getTradableEstate);

// 매물 상세 정보 반환(댓글,대댓글,찜 여부 + 위도 경도 등 반환)
    // [수정 사유] 경로 파라미터가 위에 있으면, 그 밑에 있는 것들도 영향을 받아서 내림 
    // ex) tradableEstate 경로로 요청을 보내도, getEstate 이게 실행됨. 
router.get("/:id", getEstate);


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
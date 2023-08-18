const router = require("express").Router();

router.get("/", () => {
  console.log("서버연결 완료");
});

module.exports = router;

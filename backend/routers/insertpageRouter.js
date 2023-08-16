const router = require("express").Router();
const {getUserInfo, getMypageInfo} = require("../controllers/insertPageController");

router.get('/userinfo',getUserInfo);
module.exports = router;
const router = require("express").Router();
const {getUserInfo, getMypageInfo, getUserList} = require("../controllers/insertPageController");

router.get('/userinfo',getUserInfo);
router.get('/userListData',getUserList);


module.exports = router;
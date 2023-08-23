const router = require("express").Router();
const {getUserInfo, getMypageInfo} = require("../controllers/insertPageController");

const { isLogin } = require("../middleware/isLogin");
router.get('/userinfo', isLogin, getUserInfo);
// router.get('/userListData',getUserList);


module.exports = router;
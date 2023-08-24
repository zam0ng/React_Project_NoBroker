const router = require("express").Router();
const { getMypageInfo, reSubmit, getmyregisterinfo, transactionStateUpdate, transactionCom
    , getMycheck, checkcancel, getCancelList, getMyvotedata, getUpdateinfo, userInfoUpdate, approvedUpdate, withdraw, rewardresumit } = require("../controllers/mypageController");
const { updateUpload } = require("../middleware/imgUpload");
const { isLogin } = require("../middleware/isLogin")

router.get('/mypageinfo', getMypageInfo);
router.get('/resubmit', reSubmit)
router.get('/getmyregisterinfo', getmyregisterinfo);
router.get('/transactionStateUpdate', transactionStateUpdate);
// router.get('/transactionCom', transactionCom);
router.get('/getMycheck', getMycheck)
router.get('/checkcancel', checkcancel);
router.get('/getCancelList', getCancelList);
router.get('/getMyvotedata', getMyvotedata);
router.get('/getUpdateinfo', getUpdateinfo);
router.post('/update', updateUpload.single("upload"), isLogin, userInfoUpdate);
router.get('/approvedUpdate', approvedUpdate);
router.get('/withdraw', withdraw);
router.get('/rewardresumit', rewardresumit)
module.exports = router;


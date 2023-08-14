const router = require("express").Router();
const {getMypageInfo,reSubmit,getmyregisterinfo} = require("../controllers/mypageController");
router.get('/mypageinfo',getMypageInfo);
router.get('/resubmit', reSubmit)
router.get('/getmyregisterinfo',getmyregisterinfo);
module.exports = router;


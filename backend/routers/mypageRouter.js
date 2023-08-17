const router = require("express").Router();
const {getMypageInfo,reSubmit,getmyregisterinfo,transactionStateUpdate,transactionCom
,getMycheck} = require("../controllers/mypageController");

router.get('/mypageinfo',getMypageInfo);
router.get('/resubmit', reSubmit)
router.get('/getmyregisterinfo',getmyregisterinfo);
router.get('/transactionStateUpdate',transactionStateUpdate);
router.get('/transactionCom',transactionCom);
router.get('/getMycheck',getMycheck)
module.exports = router;

const router = require("express").Router();
const {getMypageInfo,reSubmit,getmyregisterinfo,transactionStateUpdate} = require("../controllers/mypageController");
router.get('/mypageinfo',getMypageInfo);
router.get('/resubmit', reSubmit)
router.get('/getmyregisterinfo',getmyregisterinfo);
router.get('/transactionStateUpdate',transactionStateUpdate);
module.exports = router;

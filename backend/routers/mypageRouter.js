const router = require("express").Router();
const {getMypageInfo,reSubmit} = require("../controllers/mypageController");
router.get('/mypageinfo',getMypageInfo);
router.get('/resubmit', reSubmit)
module.exports = router;


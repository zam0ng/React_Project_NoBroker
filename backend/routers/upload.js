const router = require("express").Router();
const {Upload} =require("../middleware/imgUpload");
const {EstateInfo} =require("../controllers/uploadcontroller");
const {isLogin} = require("../middleware/isLogin");

router.post("/",Upload.array("upload"),isLogin,EstateInfo)
router.post("/estateInfo",EstateInfo);

module.exports = router;

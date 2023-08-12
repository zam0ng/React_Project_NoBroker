const router = require("express").Router();
const {getUserInfo} = require("../controllers/insertPageController");

router.get('/userinfo',getUserInfo);

module.exports = router;
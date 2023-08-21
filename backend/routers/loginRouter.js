const router = require("express").Router();
const { Login } = require("../controllers");
router.post("/", Login);

module.exports = router;

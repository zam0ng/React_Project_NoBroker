const router = require("express").Router();

const {estateAgentApproval} = require("../controllers/adminController");

router.post("/agentApprove" , estateAgentApproval)


module.exports = router;
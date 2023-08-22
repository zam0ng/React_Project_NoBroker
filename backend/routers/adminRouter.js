const router = require("express").Router();

const {estateAgentApproval , getUserList} = require("../controllers/adminController");

router.post("/agentApprove" , estateAgentApproval)

// router.post("/agentApprove" , getUserList)
router.get('/userListData', getUserList);    // insert/userListData 경로를 -> admin/userListData 이렇게 수정


module.exports = router;
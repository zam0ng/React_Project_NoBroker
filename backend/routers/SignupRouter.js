const router = require("express").Router();
const { userImg } = require("../middleware/userImage");
const { UserList, UserAdd } = require("../controllers/SignupController");

router.get("/", UserList);

router.post(
  "/useradd",
  userImg.fields([{ name: "seal_img" }, { name: "certificate_img" }]),
  UserAdd
);

module.exports = router;

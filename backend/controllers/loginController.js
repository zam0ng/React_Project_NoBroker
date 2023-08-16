const { User } = require("../models");
const jwt = require("jsonwebtoken");
exports.Login = async (req, res) => {
  try {
    const { ID, PW } = req.body;
    console.log("계정정보 : ", ID, "  /  ", PW);
    const userSelec = await User.findOne({ where: { user_id: ID } });
    // const userIDSelec = await User.findAll();
    console.log("@@@@@@@@", userSelec);
    if (userSelec != null) {
      console.log("있는 유저");
      console.log(userSelec.dataValues.password);
      if (userSelec.dataValues.password == PW) {
        const { user_id, user_name, user_img, fake_count, certificate_user } =
          userSelec;
        let token = jwt.sign(
          {
            user_id,
            user_img,
            user_name,
            fake_count,
            certificate_user,
          },
          process.env.ACCESS_TOKEN_KEY,
          {
            expiresIn: "20m",
          }
        );
        req.session.access_token = token;
        return res.json({ message: "로그인 완료" });
      } else {
        console.log("비밀번호 틀림");
        return res.json({ message: "비밀번호 오류" });
      }
    } else {
      console.log("없는 유저");
      res.json({ message: "가입된 유저가 아님" });
    }
  } catch (error) {
    console.log(error);
  }
};

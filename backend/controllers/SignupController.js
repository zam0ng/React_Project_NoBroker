const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.UserList = async (req, res) => {
  try {
    const user = await User.findAll();
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

exports.UserAdd = async (req, res) => {
  try {
    // 비밀번호 주민번호 뒷자리 해시값으로 들어가자!!!!!!!!!!
    const { user_id, password, user_name, ssn, phone, address, role } =
      req.body;
    const seal_img = req.files.seal_img[0];
    // console.log(
    //   "@@@@@@@@@@@@@@@@@@@@",
    //   user_id,
    //   password,
    //   user_name,
    //   ssn,
    //   phone,
    //   address,
    //   role
    // );
    // console.log("@@@@@@@@@@@@@@@@@@@@", seal_img);
    // console.log(
    //   "@@@@@@@@@@@@@@@@@@@@",
    //   `${seal_img.destination}${seal_img.filename}`
    // );
    // console.log("################", req.files);
    const hash = bcrypt.hashSync(password, 10);

    // 사업자 회원이면
    if (role == "true") {
      const certificate_img = req.files.certificate_img[0];
      console.log("@@@@@@@@@@@@@@@@@@@@", certificate_img);
      //   console.log("@@@@@@@@@@@@@@@@@@@@", `${certificate_img.destination}${certificate_img.filename}`);
      await User.create({
        user_img: "imgs/User_Profile.png",
        user_id: user_id,
        password: hash,
        role: true,
        certificate_img: `${certificate_img.destination}${certificate_img.filename}`,
        certificate_user: 1,
        user_name: user_name,
        address: address,
        phone: phone,
        ssn: ssn,
        seal_img: `${seal_img.destination}${seal_img.filename}`,
      });
      return res.json({ message: "일반회원 회원가입 완료" });
    }
    // 일반 회원이면
    else {
      await User.create({
        user_img: "imgs/User_Profile.png",
        user_id: user_id,
        password: password,
        role: false,
        user_name: user_name,
        address: address,
        phone: phone,
        ssn: ssn,
        seal_img: `${seal_img.destination}${seal_img.filename}`,
      });
      return res.json({ message: "공인중개사 회원가입 완료" });
    }
  } catch (error) {
    console.log(error);
  }
};

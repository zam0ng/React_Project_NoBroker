const jwt = require("jsonwebtoken");

exports.isLogin = (req, res, next) => {
  const { access_token } = req.session;
  console.log(req.session);
  console.log(access_token);
  jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, acc_decoded) => {
    if (err) {
      console.log("로그인하자", err);
      res.json({ message: "다시 로그인" });
    } else {
      req.acc_decoded = acc_decoded;
      next();
    }
  });
};

exports.isLoginNext = (req, res, next) => {
  const { access_token } = req.session;
  jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, acc_decoded) => {
    if (err) {
      console.log("로그인 안됨");
    } else {
      req.acc_decoded = acc_decoded;
    }
    next();
  });
};

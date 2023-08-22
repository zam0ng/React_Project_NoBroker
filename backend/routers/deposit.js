var express = require("express");
var got = require("got");
var uuid = require("uuid").v4;

const { isLogin } = require("../middleware/isLogin");
const { User ,sequelize} = require("../models");

var router = express.Router();
var secretKey = process.env.TOSS_API_KEY;

router.get("/",isLogin, function (req, res) {
  console.log("드롱??");
  const {el} =req.query;
  const money = parseInt(el.money);
  const user_id = req.acc_decoded.user_id;

  res.render("index", {
    title: "입금하기",
    orderId: uuid(),
    orderName: `${user_id}님 입금`,
    price: money,
    // price: 5000,
    customerName: req.acc_decoded.user_name,
    customerKey: uuid(),
  });

});

router.get("/success", isLogin, function (req, res) {
  console.log("success 들옴ㅁ?")
  got
    .post("https://api.tosspayments.com/v1/payments/confirm", {
      headers: {
        Authorization:
          "Basic " + Buffer.from(secretKey + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      json: {
        orderId: req.query.orderId,
        amount: req.query.amount,
        paymentKey: req.query.paymentKey,
      },
      responseType: "json",
    })
    .then(function (response) {
      // console.log(response.body);
      // console.log(response.body.totalAmount);
      // TODO: 구매 완료 비즈니스 로직 구현

      // const user_id = req.acc_decoded.id;
      // console.log(user_id);

      res.render("success", {
        title: "입금 요청이 성공적으로 완료되었습니다.",
        amount: response.body.totalAmount,
      });
    })
    .catch(function (error) {
      res.redirect(
        `/fail?code=${error.response?.body?.code}&message=${error.response?.body?.message}`
      );
    });
});

router.get("/fail", function (req, res) {
  res.render("fail", {
    message: req.query.message,
    code: req.query.code,
  });
});
//...
// 웹훅 받을 엔드포인트 추가하기
router.post("/hook", async function (req,res){
  console.log("------------",req.body)
  if(req.body.data.status=='DONE'){
    console.log("hook 들어옴")
    const user_id = req.body.data.orderName.split("님")[0];

  await User.update({
      won: sequelize.literal(`won + ${req.body.data.totalAmount}`),
    }, {
      where: { user_id: user_id }
    })
  }

  /* 돌아온 웹훅 페이로드를 처리하는 코드를 추가해주세요. */
  res.status(200).end() // 성공 응답 보내기
})

module.exports = router;

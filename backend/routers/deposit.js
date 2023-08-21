var express = require("express");
var got = require("got");
var uuid = require("uuid").v4;

var router = express.Router();

var secretKey = process.env.TOSS_API_KEY;

router.get("/", function (req, res) {
  console.log("드롱??");
  console.log(secretKey);
  const {el} =req.query;
  const money = parseInt(el.money);
  console.log(money);
  console.log(typeof(money))
  res.render("index", {
    title: "입금하기",
    orderId: uuid(),
    orderName: "입금금액",
    price: money,
    // price: 5000,
    customerName: "김토스",
    customerKey: uuid(),
  });

});

router.get("/success", function (req, res) {
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
      // TODO: 구매 완료 비즈니스 로직 구현

      res.render("success", {
        title: "성공적으로 구매했습니다",
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
router.post("/hook", function (req,res){
  console.log(req.body)
  /* 돌아온 웹훅 페이로드를 처리하는 코드를 추가해주세요. */
  res.status(200).end() // 성공 응답 보내기
})

module.exports = router;

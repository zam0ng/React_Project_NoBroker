const express = require("express");
const cors = require("cors");
const dot = require("dotenv").config();
const session = require("express-session");
const path = require("path");
const cron = require("node-cron");
const uploadRouter = require("./routers/upload");
const getUserInfoRouter = require("./routers/insertpageRouter");
const MypageRouter = require("./routers/mypageRouter")
const { estateDetailRouter, estateVoteRouter, estateListRouter, loginRouter, signupRouter  } = require("./routers");
const adminRouter = require('./routers/adminRouter')

const { setEstateAccept } = require("./controllers/estateVoteController");

const app = express();
// const mine = require('mime-types')
const { sequelize } = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/estate_imgs",express.static(path.join(__dirname,"imgs","estate")));
// app.use("/img",express.static(path.join(__dirname,"uploads")));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://3.37.244.154", "http://3.37.244.154/", "http://ec2-3-37-244-154.ap-northeast-2.compute.amazonaws.com/"],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// test
const fs = require('fs');

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database Connect");

    fs.writeFile("./errtest", "database Connect", function(err){
      if (err === null) {
          console.log('success');
      } else {
          console.log('fail');
      }
    });

  })
  .catch((err) => {
    console.error(err);

    fs.writeFile("./errtest", err, function(err){
      if (err === null) {
          console.log('success');
      } else {
          console.log('fail');
      }
    });

  });

app.use("/upload", uploadRouter);
app.use("/login", loginRouter);
app.use("/insert", getUserInfoRouter);
app.use("/mypage", MypageRouter);
app.use("/signup", signupRouter);

// 유저 이미지 경로 지정
app.use("/user_imgs", express.static(path.join(__dirname, "imgs", "userImg")));
// 매물 이미지 경로 지정
app.use("/estate_imgs", express.static(path.join(__dirname, "imgs", "estate")));
app.use("/detail", estateDetailRouter);
app.use("/list", estateListRouter); // 목록 페이지 라우터
app.use("/vote", estateVoteRouter);
app.use("/admin", adminRouter);


// 투표 마감기한인 매물 처리
cron.schedule("0 0 * * *", setEstateAccept);
// cron.schedule('57 10 * * *', setEstateAccept)

const server = app.listen(8080, () => {
  console.log("Server on");
});

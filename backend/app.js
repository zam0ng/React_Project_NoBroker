#!/usr/bin/env node

/**
 * Module dependencies.
 */

var debug = require('debug')('node-sample:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

// server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
var createError = require("http-errors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routers/deposit");


const express = require("express");
const cors = require("cors");
const dot = require("dotenv").config();
const session = require("express-session");
const path = require("path");
const cron = require("node-cron");
const uploadRouter = require("./routers/upload");
const getUserInfoRouter = require("./routers/insertpageRouter");
const MypageRouter = require("./routers/mypageRouter")
const { estateDetailRouter, estateVoteRouter, estateListRouter, loginRouter } = require("./routers");

const { setEstateAccept } = require("./controllers/estateVoteController");

var app = express();
// const mine = require('mime-types')
const { sequelize } = require("./models");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/estate_imgs",express.static(path.join(__dirname,"imgs","estate")));
// app.use("/img",express.static(path.join(__dirname,"uploads")));

app.use(
  cors({
    origin: ["http://localhost:3000"],
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

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database Connect");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/", indexRouter);

app.use("/upload",uploadRouter);
app.use("/login", loginRouter);
app.use("/insert",getUserInfoRouter);
app.use("/mypage",MypageRouter);

// 매물 이미지 경로 지정
app.use("/estate_imgs", express.static(path.join(__dirname, "imgs", "estate")));
app.use("/detail", estateDetailRouter);
app.use("/list", estateListRouter);     // 목록 페이지 라우터
app.use("/vote", estateVoteRouter);

// 투표 마감기한인 매물 처리
cron.schedule("0 0 * * *", setEstateAccept);
// cron.schedule('57 10 * * *', setEstateAccept)

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("fail", {
    code: "UNKNOWN_ERROR",
    message: "알 수 없는 에러가 발생했습니다.",
  });
});

app.listen(8080, () => {
  console.log("Server on");
});

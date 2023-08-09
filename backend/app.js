const express = require("express");
const cors = require("cors");
const dot = require("dotenv").config();
const path = require("path");
const session = require("express-session");
const path =require("path");
const uploadRouter = require("./routers/upload");

const { estateDetailRouter, estateVoteRouter } = require("./routers");

const app = express();

const {sequelize} = require("./models");

app.use(express.json());
app.use(express.urlencoded({extended :false}));
app.use("/estate_imgs",express.static(path.join(__dirname,"imgs","estate")));
// app.use("/img",express.static(path.join(__dirname,"uploads")));

app.use(cors({
    origin : [
        "http://localhost:3000",
    ],
    credentials : true
}));
app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized: false,
}))

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("database Connect");
    })
    .catch((err) => {
        console.error(err);
    });

app.use("/upload",uploadRouter);

// 매물 이미지 경로 지정
app.use("/estate_imgs", express.static(path.join(__dirname, "imgs", "estate")));
app.use("/detail", estateDetailRouter);
app.use("/vote", estateVoteRouter);

const server = app.listen(8080,()=>{
    console.log("Server on");
})
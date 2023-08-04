const express = require("express");
const cors = require("cors");
const dot = require("dotenv").config();
const session = require("express-session");

const app = express();

const {sequelize} = require("./models");

app.use(express.json());
app.use(express.urlencoded({extended :false}));
app.use(cors({
    origin : [
        "http://127.0.0.1:3000",
    ],
    credentials : true
}));
app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized: false,
}))

sequelize
    .sync({ force: true })
    .then(() => {
        console.log("database Connect");
    })
    .catch((err) => {
        console.error(err);
    });


const server = app.listen(8080,()=>{
    console.log("Server on");
})
const express = require("express");
const cors = require("cors");
const dot = require("dotenv").config();
const session = require("express-session");

const { estateDetailRouter } = require("./routers");

const app = express();

const {sequelize} = require("./models");

app.use(express.json());
app.use(express.urlencoded({extended :false}));
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


app.use("/detail", estateDetailRouter);

const server = app.listen(8080,()=>{
    console.log("Server on");
})
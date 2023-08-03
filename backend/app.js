const express = require("express");
const dot = require("dotenv").config();

const app = express();

const {sequelize} = require("./models");

app.use(express.urlencoded({extended :false}));

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
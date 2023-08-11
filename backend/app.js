const express = require("express");
const dot = require("dotenv").config();

const app = express();
// const mine = require('mime-types')
const { sequelize } = require("./models");

app.use(express.urlencoded({ extended: false }));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database Connect");
  })
  .catch((err) => {
    console.error(err);
  });

const mainRouter = require("./router/main");

app.use("/", mainRouter);

const server = app.listen(8080, () => {
  console.log("Server on");
});

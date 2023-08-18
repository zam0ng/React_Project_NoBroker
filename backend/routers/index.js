const estateDetailRouter = require("../routers/estateDetailRouter");
const estateListRouter = require("../routers/estateListRouter");
const estateVoteRouter = require("../routers/estateVoteRouter");
const loginRouter = require("./loginRouter")
const signupRouter = require("./SignupRouter")
module.exports = { estateDetailRouter, estateVoteRouter, loginRouter , estateListRouter, signupRouter }
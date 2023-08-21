const estateDetailRouter = require("../routers/estateDetailRouter");
const estateListRouter = require("../routers/estateListRouter");
const estateVoteRouter = require("../routers/estateVoteRouter");
const loginRouter = require("./loginRouter")
const adminRouter = require('./adminRouter')
const signupRouter = require("./SignupRouter")
module.exports = { adminRouter , estateDetailRouter, estateVoteRouter, loginRouter , estateListRouter, signupRouter }
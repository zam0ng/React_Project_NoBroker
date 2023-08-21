const estateDetailRouter = require("../routers/estateDetailRouter");
const estateListRouter = require("../routers/estateListRouter");
const estateVoteRouter = require("../routers/estateVoteRouter");
const loginRouter = require("./loginRouter")
const adminRouter = require('./adminRouter')
module.exports = { adminRouter , estateDetailRouter, estateVoteRouter, loginRouter , estateListRouter }
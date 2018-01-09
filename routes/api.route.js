let express = require("express");

let router = express.Router();
let todos = require("./api/todos.route");

router.use("/todos", todos);

module.exports = router;

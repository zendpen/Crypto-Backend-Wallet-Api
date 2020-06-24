//front end connect test file

let express = require('express');
let router = express.Router();

router.get("/", function(req, res, next) {
    res.send("API is working properl.y");
});

module.exports = router;
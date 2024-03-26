var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  userObject = req.user ? req.user : null;

  res.render("index", { user: userObject });
});

module.exports = router;

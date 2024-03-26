var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
var passport = require("passport");
var LocalStrategy = require("passport-local");

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    let usersArray = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../data/users.json"))
    );
    let filteredArray = usersArray.filter((x) => x.username == username);
    if (filteredArray.length > 0) {
      let usersData = filteredArray[0];
      if (usersData.password == password) {
        return cb(null, usersData);
      }
    } else {
      return cb(null, false);
    }
  })
);

router.post(
  "/password",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/memes-overview",
    failureRedirect: "/login",
  })
);

router.get("/", (req, res, next) => {
  userObject = req.user ? req.user : null;

  res.render("login", { user: userObject });
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) next(err);
    res.redirect("/login");
  });
});

module.exports = router;

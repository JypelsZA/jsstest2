var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const ensureLogin = require("connect-ensure-login").ensureLoggedIn;
const ensureLoggedIn = ensureLogin();

// router.get("/:memeId",ensureLoggedIn, function (req, res, next) {
//   userObject = req.user ? req.user : null;
//   const memeDataRaw = fs.readFileSync(
//     path.resolve(__dirname, "../data/memes.json")
//   );
//   const memeData = JSON.parse(memeDataRaw);
//   const id = req.params.memeId;
//   req.session.cookie.views.push(parseInt(id));
//   const meme = memeData.filter(x=>x.id==id)[0]
//   res.render("memeDetails", {
//     user: userObject,
//     meme: meme,
//   });
// });

router.get('/',ensureLoggedIn,(req,res,next)=>{
  const userObject = req.user
  const meme = req.session.meme;
  res.render('memeDetails',{
    user:userObject,
    meme:meme
  })
})

router.post('/',ensureLoggedIn,(req,res,next)=>{
  const memeId = req.body.id;
  const memeDataRaw = fs.readFileSync(
    path.resolve(__dirname, "../data/memes.json")
  );
  const memeData = JSON.parse(memeDataRaw);
  const meme = memeData.filter((x)=>(x.id == memeId))[0];
  req.session.meme = meme;
  req.session.cookie.views.push(parseInt(req.body.id));
  res.end();
})

module.exports = router;

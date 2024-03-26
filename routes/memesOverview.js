var express = require("express");
var router = express.Router();
const axios = require("axios");
const fs = require("fs");
const path = require("path");

router.get("/", (req, res, next) => {


  const memeDataRaw = fs.readFileSync(
     path.resolve(__dirname, "../data/memes.json")
    );
  const memeData = JSON.parse(memeDataRaw);
  const regex = new RegExp('('+req.session.memeSearch+')','gmi');
  const result = req.session.memeSearch ? memeData.filter((x)=>x.name.match(regex)) : memeData;

  const userObject = req.user ? req.user : null;

  //Initialize views cookie if it does not exist
  req.session.cookie.views = req.session.cookie.views ? req.session.cookie.views : [];
  
  const views = req.session.cookie.views;
  res.render("memesOverview", {
    user: userObject,
    memeData: result,
    views:views
  });
});

router.post('/',(req, res, next)=>{
  // const memeDataRaw = fs.readFileSync(
  //   path.resolve(__dirname, "../data/memes.json")
  // );
  // const memeData = JSON.parse(memeDataRaw);

  const search = req.body.search;
  req.session.memeSearch = search;
  // const regex = new RegExp('('+search+')','gmi');
  // const result = memeData.filter((x)=>x.name.match(regex));

  res.redirect('/memes-overview');
})

module.exports = router;

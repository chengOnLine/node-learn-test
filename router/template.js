const express = require("express");
const router = express.Router();
// 加载数据模块
var blogEngine = require('../blogs.js');
var user = require("../user.js");

router.route("/").get( (req , res) => {
    res.render('index',{ title:"最近文章", entries:blogEngine.getBlogEntries()});
})

router.route("/about").get( ( req , res) => {
    res.render('about', { title:"自我介绍" , user:user.getUserInfo()});
})


router.get("/article/:id" , ( req , res) => {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{ title:entry.title , blog:entry});
})

module.exports = router
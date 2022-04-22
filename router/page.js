const express = require("express");
const router = express.Router();
var PageModel = require('../model/page');

router.post("/add" , ( req , res ) => {
    const { name, content } = req.body;
    const page = new PageModel({
        name,
        content,
    })
    page.save().then( (p) => {
        res.json({ code: 0 })
    }).catch( () => {
        res.json({ code: 10001 , msg: "添加失败" })
    })
})

module.exports = router;
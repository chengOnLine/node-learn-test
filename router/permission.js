const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js")
var User = require("../model/user.js");

router.get("/list" , (req , res) => {
    User.find().then(data => {
        res.json({
            code:0,
            list:data
        });
    })
})

router.post("/register" , (req , res) => {
    console.log("req" , req.body);
    const {name , email , password} = req.body;
    User.findOne( { email : email } , function( err , user){
        if(user){
            res.json({
                msg:"邮箱已经注册",
            })
        }else{
            const user = new User({
                name, email , password,
            })
            bcrypt.hash( decrypt(password) , 10 , function(err , hash){
                console.log("hash" , hash);
                user.password = hash;
                user.save().then( (u)=> res.json({
                    code:0,
                    msg:`${u.email} 注册成功`,
                })).catch( ()=> res.json({
                    msg:"注册失败",
                }))
            })
        }
    })
})

router.post("/login" , (req , res) => {
    console.log("req" , req.body);
    const {email , password} = req.body;
    User.findOne( {email : email} , function( err , user){
        if(user){
            const { password : hash} = user;
            bcrypt.compare( decrypt(password) , hash , function( err , result){
                result ? res.json({
                    code:0 ,
                    msg:"登录成功"
                }) : res.json({
                    msg:"密码错误"
                })
            })
        }else{
            res.json({
                msg:"账号未注册",
            })
        }
    })
})

function decrypt( ciphertext ){
    var bytes  = CryptoJS.AES.decrypt(ciphertext, '1234123412ABCDEF');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log("ciphertext",ciphertext , "originalText",originalText);   
    return originalText;
}

module.exports = router;
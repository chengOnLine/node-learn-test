const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js")
const mongoose = require("mongoose");
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
    const {name , email , password , phone , sex , birthday } = req.body;
    console.log("name" , name);
    if( !name || !email || !password ){
        res.json({
            code: 10010,
            msg: "姓名、邮箱和密码必填",
        })
        return;
    }
    User.findOne( { email : email } , function( err , user){
        if(user){
            res.json({
                msg:"邮箱已经注册",
            })
        }else{
            const user = new User({
                name, email , password, phone , sex , birthday
            })
            user.save().then( (u)=> res.json({
                code:0,
                msg:`${u.email} 注册成功`,
            })).catch( ()=> res.json({
                code: 10010,
                msg:"注册失败",
            }))
            // bcrypt.hash( decrypt(password) , 10 , function(err , hash){
            //     console.log("hash" , hash);
            //     user.password = hash;
            //     user.save().then( (u)=> res.json({
            //         code:0,
            //         msg:`${u.email} 注册成功`,
            //     })).catch( ()=> res.json({
            //         code: 10010,
            //         msg:"注册失败",
            //     }))
            // })
        }
    })
})

router.post("/edit" , (req , res) => {
    const { name , email , password , phone , sex , birthday , userId } = req.body;
    console.log("userId" , userId , name , password);
    User.findOneAndUpdate( { userId : new mongoose.Types.ObjectId(userId) } , {  name , email , phone , sex , birthday  } , { new: true } , function( err , data ){
        if(data){
            res.json({
                code: 0,
                data
            })
        }else{
            res.json({
                code: 10010,
                msg:"用户未注册"
            })
        }
    })
})

router.get("/get" , (req , res) => {
    const { userId } = req.query;
    console.log("userId" , userId);
    User.find( { userId : new mongoose.Types.ObjectId(userId) } , function( err , data ){
        if(data){
            res.json({
                code: 0,
                data: data[0],
            })
        }else{
            res.json({
                code: 10010,
                msg:"用户未注册",
            })
        }
    })
})

router.post("/login" , (req , res) => {
    console.log("req" , req.body);
    const { name , email , password} = req.body;
    console.log("name" , name);
    if( !name || !email || !password ){
        res.json({
            code: 10010,
            msg: "姓名、邮箱和密码必填",
        })
        return;
    }
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
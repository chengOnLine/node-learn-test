const express = require("express");

const router = express.Router();

router.get("/" , (req , res) => {
    res.send("hello");
})

router.post("/" , (req , res) => {
    
})

// router.route("/register").post( (req , res) => {
    
// })


module.exports = router;
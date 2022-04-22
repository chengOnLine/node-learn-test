var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    sex: {
        type: Number,
    },
    birthday: {
        type: Date,
    },
    userId: {
        type: mongoose.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    createTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = users = mongoose.model("user" , userSchema);
var mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    id:{
        type: mongoose.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

module.exports = pageModel = mongoose.model("pageModel" , pageSchema );
const mongoose =  require('mongoose');

const fileSchema = new mongoos.Schema({
    fileName: {
        type: String,
        required: true,
    },
    base64: {
        type: String,
    },
    createTime: {
        type: Date,
        default: Date.now,
    }
})

module.exports =  fileModel = mongoose.model(fileSchema)

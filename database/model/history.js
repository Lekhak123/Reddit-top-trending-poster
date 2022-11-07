const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
URL_: {
        
        type: String,
        require: true,
        unique:true,
        index: true
    }
})

module.exports = mongoose.model("History", HistorySchema)
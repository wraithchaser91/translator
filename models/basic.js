const mongoose = require("mongoose");

const basicSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Basic", basicSchema);
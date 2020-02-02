const mongoose = require("mongoose");

siteSchema = mongoose.Schema({
    hotelName:{
        type:String,
        required: true
    },
    pageList:{
        type:[String],
        default: undefined,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    text:{
        type:[[String]]
    }
});

module.exports = mongoose.model("Site", siteSchema);
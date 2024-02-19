const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema ({
    text : {type:String, required: true},
    day : {type:String, required:true},
    reminder: {type:Boolean, required:true}
});

const ChannelModel = mongoose.model("channel", channelSchema);  // Create model from schema

module.exports = ChannelModel;
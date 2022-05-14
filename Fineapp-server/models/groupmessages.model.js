const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let groupmessage = new Schema({
    message: String,
    time: Date,
    groups_id: String,
    from: String
})

module.exports = mongoose.model('groupmessages', groupmessage)
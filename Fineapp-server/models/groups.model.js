const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let groups = new Schema({
    name: String,
    user_id: [{type: String}],
    messages: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groupmessages'
        }]}
)

module.exports = mongoose.model('groups', groups)
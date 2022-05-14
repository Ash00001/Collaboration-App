const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let chat = new Schema(
    {
        name: String,
        from: String,
        to: String,
        messages: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'messages'
            }
        ]
    }
)

module.exports = mongoose.model('chats', chat)

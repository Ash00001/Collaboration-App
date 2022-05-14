const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"]
    },
    email: {
        type: String,
        unique: true,
        required:[true, "Please Enter Your Email-Id"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"]
    },
    chats: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'chats'
            }
        ]
}
);



module.exports = mongoose.model('User', User)
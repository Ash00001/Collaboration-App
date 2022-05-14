var express = require('express');
var router = express.Router();
let Chat = require('../models/chat.model')
let User = require('../models/username.model')


router.get('/', (req, res)=>{
    Chat.find({})
    .populate('messages')
    .exec((err, resp)=>{
        if(err) res.status(500).send(err)
        res.status(200).send(resp)
    })
})


router.post('/', (req, res)=>{
    console.log(req.body)
    let newChat = new Chat(req.body)
    newChat.save((err, resp)=>{
        if(err){
            res.status(500).send(err)
        }else{
        User.findById(req.body.from, (err, user)=>{
            if(err) res.status(500).send(err)
            user.chats.push(resp._id)
            user.save((err, resp)=>{
                if(err) res.status(500).send(err)
                res.status(200).send(resp)
            })
        }),
        User.findById(req.body.to, (err, user)=>{
            if(err) res.status(500).send(err)
            user.chats.push(resp._id)
            user.save((err, resp)=>{
                if(err) res.status(500).send(err)
                res.status(200).send(resp)
            })
        })
    }

    })
})


module.exports = router;

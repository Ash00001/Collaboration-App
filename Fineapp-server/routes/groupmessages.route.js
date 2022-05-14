var express = require('express');
var router = express.Router();

let Message = require('../models/groupmessages.model');
let Chat = require('../models/groups.model');
let user = require('../models/username.model')

router.get('/', (req, res)=>{
    Message.find({})
    .exec((err, resp)=>{
        if(err) res.status(500).send(err)
        res.status(200).send(resp)
    })
})

router.post('/',(req, res)=>{
    let newMessage = new Message(req.body)
    newMessage.save((err, resp)=>{
        if(err){
            res.status(500).send(err)
        }else{
            // find the chat that message belongs to
            // push message to the chat
            Chat.findById(req.body.groups_id, (err, chat)=>{
                if(err) res.status(500).send(err)
                chat.messages.push(resp._id)
                chat.save((err, resp)=>{
                    if(err) res.status(500).send(err)
                    res.status(200).send(resp)
                
                })
            })

        }
    })
})

router.get('/name', (req, res)=>{
    User.find(({ _id })=> req.body==_id)
    .then(users=>{
        console.log(users.name)
        res.status(200).json(users.name)  
    }).catch(err =>{
        res.status(500).json({error: err.message})
    })
})

module.exports = router
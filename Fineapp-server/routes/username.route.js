var express = require('express');
var router = express.Router();
let User = require('../models/username.model')


router.get('/', (req, res)=>{
    User.find().then(users =>{
        res.status(200).json(users)  
    }).catch(err =>{
        res.status(500).json({error: err.message})
    })
})

router.post('/sign-up', async (req, res)=>{
    if(await userExists(req.body.email)){
        res.status(409).json({error:"Email Already Exists"})
    }else{
        if(req.body.confirm_password==req.body.password){
            const newUser = new User(req.body)
            newUser.save().then(user =>{
                res.status(201).json(user)
            }).catch(err =>{
                res.status(500).json({error: err.message})
            })
        }else{
            res.status(401).json({error: "Password and Confirm Password doesn't match"})
        }
    }
})

router.post('/sign-in', (req, res)=>{
    User.findOne({email: req.body.email, password: req.body.password}).then(user=>{
        if(user){
            res.status(200).json(user)
        }else{
            res.status(401).json({error: "Incorrect Email or Password"})
        }
    }).catch(err =>{
            res.status(500).json({error: err.message})
        })
})

const userExists = async (email) =>{
    console.log(email)
    const user = await User.findOne({email: email.toLowerCase().trim()})

    if(user){
        return true
    }else{
        return false
    }
}


module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config/keys');
const jwt = require('jsonwebtoken');

router.get('/alluser',(req,res)=>{
    User.find().then(users=>{
        res.status(200).json(users);
    })
});

router.post('/register', (req,res)=> {
    const {name, email, password, pic} = req.body;
    if (!name || !email || !password) {
        res.status(422).json({
            error: "Details are not sufficent"
        });
        return;
    }

    User.findOne({email: email}).then((savedUser)=>{
        if (savedUser) {
            return res.status(400).json({
                error:"User already exist"
            })
        }

        bcrypt.hash(password,12).then((hashedPassword) => {
            const user = new User({name,email,password:hashedPassword,pic});
            user.save().then(user=>{
                console.log(user.body);
                let token = jwt.sign({_id: user._id}, JWT_SECRET);
                let {_id, name, email, followers, following,pic} = user
                res.json({
                    success: true,
                    token: token,
                    msg:`User successfully saved with ${user}`,
                    user: {_id,name,email,followers,following,pic}
                });
            }).catch((err)=>{
                return res.status(400).json({
                    error:`User creation failed with error: ${err}`
                });
            });
        })
        

    }).catch((err)=> {
        return res.status(400).json({
            error:`User finding failed with error: ${err}`
        });
    });
});

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    if (!email || !password)
        return res.status(422).json({
            error: "Enter email and password"
        });
    User.findOne({email: email}).then((savedUser) =>{
        if (!savedUser) {
            return res.status(400).json({error: "Enter valid email or password1"})
        }
        bcrypt.compare(password, savedUser.password).then((doMatch)=>{
            if (doMatch) {
                let token = jwt.sign({_id: savedUser._id}, JWT_SECRET);
                let {_id, name, email, followers, following, pic} = savedUser;
                res.status(201).json({
                    success: true,
                    msg: "Successfully logged in",
                    token: token,
                    user: {_id, name, email, followers, following, pic}
                })
            } else {
                res.status(401).json({
                    success: false,
                    msg: "Enter valid email or password"
                });
            }
        });
    });
});

module.exports = router;
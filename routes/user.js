const { Router } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requirelogin = require('../middleware/requirelogin');
const User = mongoose.model("User");
const Post = mongoose.model("Post");

router.get("/:id", requirelogin, (req, res) => {
    User.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            Post.find({ postedBy: req.params.id })
                .populate("postedBy", "_id name")
                .exec((err, posts) => {
                    if (err) {
                        return res.status(422).json({ error: err });
                    }
                    res.status(201).json({ user, posts });

                })
        })
});

router.put("/follow", requirelogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err });
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, {
            new: true
        })
            .select("-password")
            .then(result => {
                res.status(202).json(result);
            })
            .catch(err => {
                return res.status(401).json({ error: err });
            })
    })
})

router.put("/unfollow", requirelogin, (req, res) => {
    User.findByIdAndUpdate(req.body.unFollowId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err });
        }
        User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.unFollowId }
        }, {
            new: true
        })
            .select("-password")
            .then(result => {
                res.status(202).json(result);
            })
            .catch(err => {
                return res.status(422).json({ error: err });
            });
    })
})

router.put("/updatepic", requirelogin, (req,res) => {
    User.findByIdAndUpdate(req.user._id, {
        $set: {pic: req.body.pic}
    }, {
        new: true
    }, (err,result)=> {
        if (err) {
            return res.status(422).json({error: err});
        }
        res.status(201).json(result);
    })
})

module.exports = router;
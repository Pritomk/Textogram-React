const { Router } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requirelogin = require('../middleware/requirelogin');
const Post = mongoose.model("Post");


//Create a new post
router.post('/createpost', requirelogin, (req,res)=>{
    const {title, body, pic} = req.body;
    if (!title || !body || !pic)
        return res.status(422).json({error: "Enter all details"})
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        pic,
        postedBy:req.user
    })
    post.save().then((result)=>{
        res.status(200).json({
            result: result
        });
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    });
});


//Get all post from database
router.get("/allposts", requirelogin, (req,res)=> {
    Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .then(posts=>{
        res.status(200).json(posts);
    }).catch(err=> console.log(err));
});

router.get("/getsubposts", requirelogin, (req,res)=> {
    Post.find({postedBy: {$in: req.user.following}})
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .then(posts=>{
        res.status(200).json(posts);
    }).catch(err=> console.log(err));
});

//Get only user posts
router.get("/myposts", requirelogin, (req,res)=>{
    let user = req.user;
    Post.find({postedBy: req.user._id})
    .populate("postedBy", "_id name")
    .then(posts=>{
        res.status(200).json({user,posts});
    }).catch(err=>console.log(err));
})

router.put("/like", requirelogin, (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err,result)=> {
        if (err) {
            return res.status(422).json({
                error:err
            });
        }
        console.log(result);
        res.status(200).json(result);
    
    });
})

router.put("/unlike", requirelogin, (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err,result)=> {
        if (err) {
            return res.status(422).json({
                error:err
            });
        }
        res.status(200).json(result);

    });
})

router.put("/comment", requirelogin, (req,res)=>{
    let comment = {
        text:req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy", "_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=> {
        if (err) {
            return res.status(422).json({
                error:err
            });
        }
        res.status(200).json(result);
    });
})

router.delete("/delete/:postId", requirelogin, (req, res)=>{
    Post.findById(req.params.postId)
    .populate("postedBy", "_id")
    .exec((err, post)=>{
        if (err || !post) {
            return res.status(422).json({error:err});
        }
        if (post.postedBy._id.toString() === req.user._id.toString()) {
            return post.remove()
            .then(result=>{
                res.status(202).json(result);
            })
            .catch(err=>console.log(err));
        } else {
            return res.status(422).json({
                error: "Not the valid user"
            })
        }
    })
})


module.exports = router;
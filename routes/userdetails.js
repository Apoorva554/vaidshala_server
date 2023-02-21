const express = require("express");
var moment = require('moment');

const Post = require("../model/UserDetailsModel");
const router = express.Router();

router.get("/", async (req, res) => {
    //   res.send("Inside the post");
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      res.json({ message: err });
    }
});

// save post first time 
router.post("/", async (req, res) => {
    const post = new Post({
        uid: req.body.uid,
        name: req.body.name,
        mobile:req.body.mobile,
        email:req.body.email,
        dateofbirth:req.body.dateofbirth,
        weight:req.body.weight,
        height:req.body.height,
        gender:req.body.gender,
        payment:req.body.payment,
        notificationToken:req.body.notificationToken,
            
    });  
    try {
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (err) {
      res.json({ message: err });
    }
  });

  router.get("/:uid", async (req, res) => {
    try {
      const post = await Post.find({uid:req.params.uid});

        if (post.length >= 1) {
          
          res.json({
            message: "User is present",
            post
          });
          } else {
            res.status(200).json({
              message: "User not found",
              post
            });
          }
     
    } catch (err) {
      res.json({ message: "Not found" });
    }
  });

  router.delete("/:uid", async (req, res) => {
    try {
      const removePost = await Post.deleteOne({ uid: req.params.uid });
      res.json(removePost);
    } catch (err) {
      res.json({ message: err });
    }
  });
  
  // update post
  router.patch("/:uid", async (req, res) => {
    try {
      const updatedPost = await Post.updateOne(
        { uid: req.params.uid },
        { $set: {
            name: req.body.name,
            mobile:req.body.mobile,
            email:req.body.email,
            dateofbirth:req.body.dateofbirth,
            weight:req.body.weight,
            height:req.body.height,
            gender:req.body.gender,
            payment:req.body.payment,
            notificationToken:req.body.notificationToken,
                

        } }
      );
      res.json(updatedPost);
    } catch (err) {
      res.json({ message: err });
    }
  });
  

module.exports = router;  
const express = require("express");

const Post = require("../model/Post");
const router = express.Router();

// get all posts
router.get("/", async (req, res) => {
  //   res.send("Inside the post");
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// save post
router.post("/", async (req, res) => {
  const post = new Post({
    uid: req.body.uid,
    useremail: req.body.useremail,
    messuremnt:[
      {
        trackdate:req.body.trackdate,
        kcal:req.body.kcal,
        workoutduration:req.body.workoutduration,
        traningload:req.body.traningload,
        v2:req.body.v2,
        avghr:req.body.avghr,
        maxhr:req.body.maxhr,
        oxygenintake:req.body.oxygenintake,
        recovery:req.body.recovery,
        strain:req.body.strain,
      }
    ],
  });

  //   post
  //     .save()
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((err) => {
  //       res.json({ message: err });
  //     });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//get specific post
router.get("/:uid/:days", async (req, res) => {
  try {
    const post = await Post.find({uid:req.params.uid}).limit(req.params.days);
    res.json(post);
  } catch (err) {
    res.json({ message: "Not found" });
  }
});

/// get today
router.get("/today/:uid/", async (req, res) => {
  var start = "04-12-2022";

  try {
    const post = await Post.find({uid:req.params.uid},{trackdate:{$gte:start}});
    res.json(post);
  } catch (err) {
    res.json({ message: "Not found" });
  }
});

// delete post
router.delete("/:postId", async (req, res) => {
  try {
    const removePost = await Post.remove({ _id: req.params.postId });
    res.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

// update post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title, description: req.body.description } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
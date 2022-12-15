const express = require("express");
var moment = require('moment');

const Post = require("../model/HistoryReports");
const router = express.Router();
var current_date = moment().utcOffset(330).format("DD-MM-YYYY");
var seventhday = moment().utcOffset(330).subtract(8, 'days').format("DD-MM-YYYY");
var tomorrow = moment().utcOffset(330).add(1, 'days').format("DD-MM-YYYY");
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

// save post first time 
router.post("/", async (req, res) => {
  const post = new Post({
    uid: req.body.uid,
    useremail: req.body.useremail,
          trackdate:req.body.trackdate,
          tracktime:req.body.tracktime,
          kcal:req.body.kcal,
          workoutduration:req.body.workoutduration,
          traningload:req.body.traningload,
          v2:req.body.v2,
          avghr:req.body.avghr,
          maxhr:req.body.maxhr,
          oxygenintake:req.body.oxygenintake,
          recovery:req.body.recovery,
          strain:req.body.strain,
          
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

/// instert to todays
router.patch("/todays/:uid", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { uid: req.params.uid },
      { $push: {
        measurement:[
            {
              data:[
                {
                trackdate:req.body.trackdate,
                tracktime:req.body.tracktime,
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
            ]
                
            }
          ]
      } 
      }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//get history specific post
// router.get("/history/:uid/:days", async (req, res) => {
//   var startdate = "$"+ current_date;
//   try {
//     const post = await Post.aggregate([
//       {
//       $match:{uid:req.params.uid}
//       },{
//         $unwind: startdate
//       },{
//         $group: {
//           _id:"",
//           avgkcal:{
//             $avg:'$10-12-2022.kcal'
//           }
//         }
//       }
//   ]);
//     res.json(post);
//   } catch (err) {
//     res.json({ message: startdate });
//   }
// });

// router.get("/:uid", async (req, res) => {

//   try {
//     const post = Post.find({uid:req.params.uid}).limit(req.params.days);
//     // await Post.find(
//     //   {uid:req.params.uid},
//     // ).sort({$natural:-1}).pretty();
//     res.json(post);
//   } catch (err) {
//     res.json({ message: "startdate" });
//   }
// });

// get history specific post
router.get("/7day/:uid", async (req, res) => {
  try {
    const post = await Post.aggregate(
      [
        {
          "$match": {
            "$and": [
              {
                "uid": req.params.uid
              },
              {
                "trackdate": {
                  $gt: seventhday,
                  $lt: tomorrow
                }
              }
            ],
            
          }
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt"
              }
            },
            trackdate:{
              $first:"$trackdate"
            },
            Kcal: {
              $avg: "$kcal"
            },
            traningload: {
              $avg: "$traningload"
            },
            v2: {
              $avg: "$v2"
            },
            avghr: {
              $avg: "$avghr"
            },
            maxhr: {
              $avg: "$maxhr"
            },
            oxygenintake: {
              $avg: "$oxygenintake"
            },
            recovery: {
              $avg: "$recovery"
            },
            strain: {
              $avg: "$strain"
            },

          }
        },
        {
          $sort: {
            _id: 1
          }
        }
      ])
    res.json(post);
  }catch(err){
    res.json({ message: "not found" });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    const post = await Post.find({uid:req.params.uid});
    res.json(post);
  } catch (err) {
    res.json({ message: "Not found" });
  }
});

/// get today
router.get("/today/:uid", async (req, res) => {

  try {
    const post = await Post.aggregate(
      [
      {
        $match: {
          $and: [
            {
              uid: req.params.uid
            },
            {
              trackdate: current_date
            }
          ],
          
        }
      },
      {
        $project: {
          _id: "$_id",
          uid: "$uid",
          useremail: "$useremail",
          trackdate: "$trackdate",
          tracktime: "$tracktime",
          kcal: " $kcal",
          workoutduration: "$workoutduration",
          traningload: "$traningload",
          v2: "$v2",
          avghr: "$avghr",
          maxhr: "$maxhr",
          oxygenintake: "$oxygenintake",
          recovery: "$recovery",
          strain: "$strain",
        }
      }
    ]
      // {uid:req.params.uid},
      // {$unwind:"$measurement"},
      // {"measurement.trackdate": {$in: ['12-12-2022']}}
      // {$match:{uid:[current_date]}}
      // {$unwind:"$measurement"},
      // {$match:{
      //   $and:[
      //     {"uid":req.params.uid}
      //   ]
      // }
      //   // {{"measurement.trackdate":[current_date]}}
      // },
      // {$group:{_id:{id:"$_id"}, measurement:{$push:"$measurement"}}},
      // {$project:{_id:0, measurement:1}} 
      // {trackdate:{$elemMatch:current_date}}
      // { "measurement.trackdate": {$lte: 13-12-2022}  } 
      // { "measurement": { $elemMatch: { trackdate: { $gt: 11-12-2022, $lte: 13-12-2022 } } } },
  //     {'vitamins': {'measurement.trackdate':{$gte:"11-12-2022",$lte:"13-12-2022"}}
  //  }
   );
    res.json(post);
  } catch (err) {
    res.json({ message: "Not found" });
  }
});

// delete post
router.delete("/:uid", async (req, res) => {
  try {
    const removePost = await Post.remove({ uid: req.params.uid });
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
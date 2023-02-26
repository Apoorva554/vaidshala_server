const express = require("express");
var moment = require('moment');
const moment_tz = require('moment-timezone');
const { now } = require("mongoose");

const Post = require("../model/HistoryReports");
const router = express.Router();
var current_date = moment_tz.tz(Date.now(), "Asia/Kolkata").format("DD-MM-YYYY");
var seventhday = moment().utcOffset(330).subtract(8, 'days').format("DD-MM-YYYY");
var tomorrow = moment().utcOffset(330).add(1, 'days').format("DD-MM-YYYY");

//function
function format(inputDate) {
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

    date = date
        .toString()
        .padStart(2, '0');

    month = month
        .toString()
        .padStart(2, '0');

  return `${date}-${month}-${year}`;
}


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
          from:req.body.from,
          maxhrzone:req.body.maxhrzone,
          anaerobiczone:req.body.anaerobiczone,
          muscleczone:req.body.muscleczone,
          fatburnzone:req.body.fatburnzone,
          warmupzone:req.body.warmupzone,
          kcal:req.body.kcal,
          fatburn:req.body.fatburn,
          heartratelist:req.body.heartratelist,
          workoutduration:req.body.workoutduration,
          traningload:req.body.traningload,
          v2:req.body.v2,
          v1:req.body.v1,
          minhr:req.body.minhr,
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
                from:req.body.form,
                maxhrzone:req.body.maxhrzone,
                anaerobiczone:req.body.anaerobiczone,
                muscleczone:req.body.muscleczone,
                fatburnzone:req.body.fatburnzone,
                warmupzone:req.body.warmupzone,
                kcal:req.body.kcal,
                workoutduration:req.body.workoutduration,
                traningload:req.body.traningload,
                v2:req.body.v2,
                v1:req.body.v1,
                minhr:req.body.minhr,
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

  const d = new Date(now());
  d.setDate(d.getDate() - 7);
  const FormatSeventhday = d.toLocaleDateString('en-US', {timeZone: 'Asia/Kolkata'});
  const FinalSeventhday = format(new Date(FormatSeventhday));

  d.setDate(d.getDate() + 8);
  const FormaTomorrow = d.toLocaleDateString('en-US', {timeZone: 'Asia/Kolkata'});
  const FinalTomorrow = format(new Date(FormaTomorrow));


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
                  $gt: FinalSeventhday,
                  $lt: FinalTomorrow
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
            fatburn:{
              $avg: "$fatburn"
            },
            maxhrzone: {
              $avg: "$maxhrzone"
            },
            anaerobiczone: {
              $avg: "$anaerobiczone"
            },
            muscleczone: {
              $avg: "$muscleczone"
            },
            fatburnzone: {
              $avg: "$fatburnzone"
            },
            warmupzone: {
              $avg: "$warmupzone"
            },

            traningload: {
              $avg: "$traningload"
            },
            v2: {
              $avg: "$v2"
            },
            v1: {
              $avg: "$v1"
            },
            minhr:{
              $avg:"$minhr"
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
      if (post.length >= 1) {
          
        res.json({
          lastSevenDay : FinalSeventhday,
          tomorrow: FinalTomorrow,
          message: "History found",
          post
        });
        } else {
          res.status(200).json({
            lastSevenDay : FinalSeventhday,
          tomorrow: FinalTomorrow,
            message: "History not found",
            post
          });
        }
  }catch(err){
    res.json({ message: "not found" });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    const post = await Post.find({uid:req.params.uid},
      );
    if (post.length >= 1) {
          
      res.json({
        message: "History found",
        post
      });
      } else {
        res.status(200).json({
          message: "History not found",
          post
        });
      }
  } catch (err) {
    res.json({ message: "Not found" });
  }
});

/// get today
router.get("/today/:uid", async (req, res) => {

  const d = new Date(now());
  
  const CurrentDate = d.toLocaleDateString('en-US', {timeZone: 'Asia/Kolkata'});
  const FinalCurrentDay = format(new Date(CurrentDate));

  
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
              trackdate: FinalCurrentDay
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
          from:"$from",
          maxhrzone:"$maxhrzone",
          anaerobiczone:"$anaerobiczone",
          muscleczone:"$muscleczone",
          fatburnzone:"$fatburnzone",
          warmupzone:"$warmupzone",
          kcal: "$kcal",
          heartratelist:"$heartratelist",
          fatburn: "$fatburn",
          workoutduration: "$workoutduration",
          traningload: "$traningload",
          v2: "$v2",
          v1:"$v1",
          minhr:"$minhr",
          avghr: "$avghr",
          maxhr: "$maxhr",
          oxygenintake: "$oxygenintake",
          recovery: "$recovery",
          strain: "$strain",
          createdAt: "$createdAt",
        }
      },
      {
        $sort: {
          createdAt: - 1
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
   if (post.length >= 1) {
          
    res.status(200).json(
      {current: FinalCurrentDay,message: "History found",post}
    );
    } else {
      res.status(200).json({
        current: FinalCurrentDay,
        message: "History not found",
        post
      });
    }
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
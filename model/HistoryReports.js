const mongoose = require("mongoose");
var moment = require('moment');
const moment_tz = require('moment-timezone');
var current_date = moment().utcOffset(330).format("DD-MM-YYYY");
const dateIndia = moment_tz.tz(Date.now(), "Asia/Kolkata");

const PostSchema = mongoose.Schema({
  uid:{
    type: String,
    required: true,
  },
  useremail:{
    type: String,
    required: true,
  }, 

          trackdate:{
            type: String,
            required: true
          },
          tracktime :{
            type: String,
            required: true},
          
          from :{
            type: String,
            required: true}, 
          
          maxhrzone:{
            type: Number,
          }, 

          anaerobiczone:{
            type: Number,
          },

          muscleczone:{
            type: Number,
          },

          fatburnzone:{
            type: Number,
          },

          warmupzone:{
            type: Number,
          },

          kcal:{
            type: Number,
          },

          fatburn:{
            type: Number,
          },

          heartratelist:{
            type: Array,
          },
  
          workoutduration : {
            type: Number,
          },
  
          traningload:{
            type: Number,
          },
  
          v2:{
            type: Number,
          },
          
          v1:{
            type: Number,
          },

          minhr:{
            type: Number,
            required: true,
          },
  
          avghr:{
            type: Number,
            required: true,
          },
  
          maxhr:{
            type: Number,
            required: true,
          },
  
          oxygenintake:{
            type: Number,
          },
  
          recovery:{
            type: Number,
          },
  
          strain:{
            type: Number,
          },
          createdAt: { type: Date, default: current_date }
        }
//     [current_date]:[
//       {
//         trackdate:{
//           type: String,
//           required: true
//         },
//         tracktime :{
//           type: String,
//           required: true},

//         kcal:{
//           type: Number,
//         },

//         workoutduration : {
//           type: Number,
//         },

//         traningload:{
//           type: Number,
//         },

//         v2:{
//           type: Number,
//         },

//         avghr:{
//           type: Number,
//           required: true,
//         },

//         maxhr:{
//           type: Number,
//           required: true,
//         },

//         oxygenintake:{
//           type: Number,
//         },

//         recovery:{
//           type: Number,
//         },

//         strain:{
//           type: Number,
//         },

//       }    
// ],     
);

module.exports = mongoose.model("history", PostSchema);
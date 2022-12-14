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
  
          kcal:{
            type: Number,
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
          createdAt: { type: Date, default: dateIndia }
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

module.exports = mongoose.model("users", PostSchema);
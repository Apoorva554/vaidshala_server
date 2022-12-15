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
    name:{
        type: String,
        required: true,
      },
      mobile:{
        type: String,
        required: true,
      },
      email:{
        type: String,
        required: true,
      },
      dateofbirth:{
        type: String,
        required: true,
      },
      weight:{
        type: String,
        required: true,
      },
      height:{
        type: String,
        required: true,
      },
      gender:{
        type: String,
        required: true,
      },
      payment:{
        type: Boolean,
        default: false
      },
      notificationToken:{
        type: String,
        required: true,
      },
      createdAt: { type: Date, default: dateIndia }
});

module.exports = mongoose.model("userdetails", PostSchema);
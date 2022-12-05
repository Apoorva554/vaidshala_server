const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  uid:{
    type: String,
    required: true,
  },
  useremail:{
    type: String,
    required: true,
  },
  messuremnt:[
    {
      trackdate :{
        type: String,
        required: true},
        kcal:{
            type: String,
          },
          workoutduration : {
            type: String,
          },
          traningload:{
            type: String,
          },
          v2:{
            type: String,
          },
          avghr:{
            type: String,
            required: true,
          },
          maxhr:{
            type: String,
            required: true,
          },
          oxygenintake:{
            type: String,
          },
          recovery:{
            type: String,
          },
          strain:{
            type: String,
          },
    },
  ],
    },
);

module.exports = mongoose.model("users", PostSchema);
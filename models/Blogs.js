const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogsSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "logUser"
  },
  title:{
  type:String,
  },
  details:{
    type:String,
  },
  link:{
    type:String,
  },
  tags:{
    type:String
  },
  date:{
    type:String
  }
});

module.exports = mongoose.model("blogs", BlogsSchema);

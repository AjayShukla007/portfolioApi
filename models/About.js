const mongoose = require("mongoose");
const { Schema } = mongoose;

const AboutSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "logUser"
  },
  intro: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  color: {
    type: String,
  },
  loginDate: {
    type: Date,
    default: Date.now
  }
});
const CertSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "logUser"
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  learned: {
    type: String
  },
  provider:{
    type: String
  },
  loginDate: {
    type: Date,
    default: Date.now
  }
});
const EduSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "logUser"
  },
  collage: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  loginDate: {
    type: Date,
    default: Date.now
  }
});

// module.exports = mongoose.model("about", AboutSchema);
module.exports = {
  AboutSchema: mongoose.model('about', AboutSchema),
  CertSchema: mongoose.model('certification', CertSchema),
  EduSchema: mongoose.model('education', EduSchema),
};
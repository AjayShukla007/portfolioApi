const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "logUser",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  activityType: {
    type: String,
    enum: ['contribution', 'project', 'learning', 'achievement', 'other'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  relatedProject: {
    type: String,
  },
  link: {
    type: String,
  },
  icon: {
    type: String, // Store an icon identifier or name
  }
});

module.exports = mongoose.model("activities", ActivitySchema);

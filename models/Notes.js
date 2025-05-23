const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
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
  tags: {
    type: String,
    required: true,
  },
  source: {
    type: String,
  },
  live: {
    type: String,
  },
  image: {
    type: String,
  },
  grade: {
    type: String,
  },
  projectType: {
    type: String,
    enum: ['personal', 'professional', 'open'],
    required: true
  },
  company: {
    type: String,
    // Only required if projectType is professional
  },
  lastEdited: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("projects", NotesSchema);
// module.exports = mongoose.model('projectImage', ImageSchema);

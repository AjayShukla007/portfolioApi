const mongoose = require("mongoose");
const { Schema } = mongoose;

const CaseStudiesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "logUser"
  },
  title: {
    type: String
  },
  id: {
    type: String
  },
  description: {
    type: String
  },
  flow: {
    type: String
  },
  techUsed: {
    type: String
  },
  feature: {
    type: String
  },
  motivation: {
    type: String
  },
  conclusion: {
    type: String
  }
});

module.exports = mongoose.model("caseStudies", CaseStudiesSchema);

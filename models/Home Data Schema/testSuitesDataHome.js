const mongoose = require('mongoose');

const testSuitesSchema = new mongoose.Schema({
  
  runId: {
    type: String,
    required: true
  },
  parentRunId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  namespaceName: {
    type: String,
    required: true
  },
  pass_fail: {
    pass: {
      type: Number,
      required: true
    },
    fail: {
      type: Number,
      required: true
    }
  },
  resourcesGroup: {
    type: String,
    required: true
  },
  sasKey: {
    type: String,
    required: true
  },
  sasValue: {
    type: String,
    required: true
  },
  subscriptionId: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  }
});

const testSuitesDataHomeSchema = mongoose.model('testsuites_home', testSuitesSchema);

module.exports = testSuitesDataHomeSchema;

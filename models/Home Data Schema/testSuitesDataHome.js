const mongoose = require('mongoose');

const testSuitesSchema = new mongoose.Schema({
  runId: {
    type: String,
    required: true
  },
  parentRunId: {
    type: String,
    required: false
  },
  testSuiteName: {
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
  nameSpace: {
    type: String,
    required: true
  },
  testsPassedCount: {
    type: Number,
    required: true
  },
  testsFailedCount: {
    type: Number,
    required: true
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
    required: false
  }
});

const testSuitesDataHomeSchema = mongoose.model('testsuites_home', testSuitesSchema);

module.exports = testSuitesDataHomeSchema;

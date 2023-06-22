const mongoose = require('mongoose');

const testGroupsSchema = new mongoose.Schema({
  runId: {
    type: String,
    required: true
  },
  parentRunId: {
    type: String,
    required: false
  },
  testRunName: {
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
  isCurrentlyExecuting: {
    type: Boolean,
    required: true
  },
  testGroupName: {
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
  nameSpace: {
    type: String,
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
    required: true
  }
});



const testGroupDataHomeSchema = mongoose.model('testgroups_home', testGroupsSchema);

module.exports = testGroupDataHomeSchema;

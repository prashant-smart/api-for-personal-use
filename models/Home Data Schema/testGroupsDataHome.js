const mongoose = require('mongoose');

const testGroupsSchema = new mongoose.Schema({
  runId: {
    type: String,
    required: true
  },
  parentRunId: {
    type: String,
    required: true
  },
  testRunName: {
    type: String,
    required: true
  },
  startDate: {
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  endDate: {
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  isCurrentlyExecuting: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
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
  }
});


const testGroupDataHomeSchema = mongoose.model('testgroups_home', testGroupsSchema);

module.exports = testGroupDataHomeSchema;

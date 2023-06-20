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
  }
});

const testSuitesDataHomeSchema = mongoose.model('testsuites_home', testSuitesSchema);

module.exports = testSuitesDataHomeSchema;

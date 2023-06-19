const mongoose = require('mongoose');

const testGroupsSchema = new mongoose.Schema({
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
  testGroupName: {
    type: String,
    required: true
  },
  testsPassed: {
    type: Number,
    required: true
  },
  testsFailed: {
    type: Number,
    required: true
  }
});

const testGroupHome = mongoose.model('testgroups_home', testGroupsSchema);

module.exports = testGroupHome;

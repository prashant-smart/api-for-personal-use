const mongoose = require('mongoose');

const testSuitesSchema = new mongoose.Schema({
  runId: {
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
  }
});

const testSuitesHome = mongoose.model('testsuites_home', testSuitesSchema);

module.exports = testSuitesHome;

const mongoose = require('mongoose');

const TestSchemaExplorer = new mongoose.Schema({
  testName: {
    type: String,
    required: true
  },
  workload: {
    workloadName: {
      type: String,
      required: true
    },
    workloadURL: {
      type: String,
      required: true
    }
  },
  testDriver: {
    testDriverName: {
      type: String,
      required: true
    },
    testDriverURL: {
      type: String,
      required: true
    }
  },
  configuredThresholds: {
    pAvgLatency: {
      type: Number,
      required: true
    },
    p95Latency: {
      type: Number,
      required: true
    },
    p9999Latency: {
      type: Number,
      required: true
    },
    expectedThroughput: {
      type: Number,
      required: true
    }
  },
  testSuiteName:{
    type:String,
    require:true
  }
});

const TestDataExplorerSchema = mongoose.model('Test_explorer', TestSchemaExplorer);

module.exports = TestDataExplorerSchema;

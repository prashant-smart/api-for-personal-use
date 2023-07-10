const mongoose=require('mongoose');

const testHomeSchema=new mongoose.Schema({
    parentRunId: {
      type: String,
      required: false
    },
    runId: {
      type: String,
      required: true
    },
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
    isFailed: {
      type: Boolean,
      required: true
    },
    reason: {
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
    testSuiteName:{
      type:String,
      require:false
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
      required: false
    }
  });
const testDataHomeSchema=mongoose.model('test_home',testHomeSchema)
module.exports=testDataHomeSchema
const mongoose=require('mongoose');
const { stringify } = require('querystring');
const { boolean } = require('webidl-conversions');

const testHomeSchema=new mongoose.Schema({
    parentRunId: {
      type: String,
      required: true
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
    testSuiteName:{
      type:String,
      require:true
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
const testDataHomeSchema=mongoose.model('test_home',testHomeSchema)
module.exports=testDataHomeSchema
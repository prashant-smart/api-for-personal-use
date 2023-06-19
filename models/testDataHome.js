const mongoose=require('mongoose');
const { stringify } = require('querystring');
const { boolean } = require('webidl-conversions');

const testDataHomeSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        workload:{
            type:String,
            require:true
        },
        isTestFailed:{
            type:Boolean,
            require:true
        },
        testFailedReason:{
            type:String,
            require:true
        }
    }
)

const testDataHome=mongoose.model('test_home',testDataHomeSchema)
module.exports=testDataHome
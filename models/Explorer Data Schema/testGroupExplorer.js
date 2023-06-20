const mongoose = require('mongoose');

const TestGroupSchemaExplorer = new mongoose.Schema({
  testGroupID: {
    type: String,
    required: true
  },
  testGroupName: {
    type: String,
    required: true
  },
  testSuiteList: {
    type: [String],
    required: true
  }
});

const TestGroupDataExplorerSchema = mongoose.model('TestGroup_explorer', TestGroupSchemaExplorer);

module.exports = TestGroupDataExplorerSchema;

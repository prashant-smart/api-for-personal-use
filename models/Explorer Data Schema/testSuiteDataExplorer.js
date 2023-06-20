const mongoose = require('mongoose');

const TestSuiteSchemaExplorer = new mongoose.Schema({
  testSuiteName: {
    type: String,
    required: true
  },
  ConfiguredTest: {
    type: [String],
    required: true
  }
});

const TestSuiteDataExplorerSchema = mongoose.model('TestSuite_explorer', TestSuiteSchemaExplorer);

module.exports = TestSuiteDataExplorerSchema;

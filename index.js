const { error } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const TestDataHomeSchema = require("./models/Home Data Schema/testDataHome");
const TestSuitesDataHomeSchema = require("./models/Home Data Schema/testSuitesDataHome");
const TestGroupDataHomeSchema = require("./models/Home Data Schema/testGroupsDataHome");

const TestDataExplorerSchema = require("./models/Explorer Data Schema/testDataExplorer");
const TestGroupDataExplorerSchema = require("./models/Explorer Data Schema/testGroupExplorer");
const TestSuiteDataExplorerSchema = require("./models/Explorer Data Schema/testSuiteDataExplorer");

const { v4: uuidv4 } = require("uuid");
const { Date } = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// routes for explorer section

app.get("/v1/tests/", async (req, res) => {
  try {
    const { testName, page, limit, testSuiteName } = req.query;

    var query;
    if (testName && testSuiteName) {
      query = { testName: testName, testSuiteName: testSuiteName };
    } else query = testName ? { testName: testName.split("|") } : {};

    const data = await TestDataExplorerSchema.find(query);

    let paginatedData = data;
    if (page && limit) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      paginatedData = data.slice(startIndex, endIndex);
    }

    res.status(200).json(paginatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/v1/testSuites/", async (req, res) => {
  try {
    const { testSuiteName, page, limit, testGroupName } = req.query;

    var query;

    if (testGroupName) {
      const data = await TestGroupDataExplorerSchema.find({
        testGroupName: testGroupName.split("|"),
      });
      const name = data.flatMap((suite) => suite.testSuiteList);
      query = { testSuiteName: name };
    } else
      query = testSuiteName ? { testSuiteName: testSuiteName.split("|") } : {};

    const data = await TestSuiteDataExplorerSchema.find(query);

    let paginatedData = data;
    if (page && limit) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      paginatedData = data.slice(startIndex, endIndex);
    }

    res.status(200).json(paginatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/v1/testGroups/", async (req, res) => {
  try {
    const { testGroupName, page, limit } = req.query;
    const query = testGroupName
      ? { testGroupName: testGroupName.split("|") }
      : {};

    const data = await TestGroupDataExplorerSchema.find(query);

    let paginatedData = data;
    if (page && limit) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      paginatedData = data.slice(startIndex, endIndex);
    }

    res.status(200).json(paginatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post request

async function addTestsuites(
  testSuiteNames,
  parentRunId,
  pass,
  fail
) {

  for (const key in testSuiteNames) {
    if (testSuiteNames.hasOwnProperty(key)) {
      const value = testSuiteNames[key];
      const runId = uuidv4();

      const newTestSuites = new TestSuitesDataHomeSchema({
        runId,
        parentRunId: parentRunId,
        name:key,
        startDate: Date.now,
        endDate: Date.now,
        namespaceName: value.nameSpace,
        pass_fail: {
          pass,
          fail,
        },
        resourcesGroup:value.resourcesGroup,
        sasKey:value.sasKey,
        sasValue:value.sasValue,
        subscriptionId:value.subscriptionId,
        tags:value.tags
      });

      var query = { testSuiteName: key };
      const data = await TestSuiteDataExplorerSchema.find(query);

      if (data.length) {
        var testsNames = data[0].ConfiguredTest;
        await addTests(
          runId,
          testsNames,
          value.nameSpace,
          value.resourcesGroup,
          value.sasKey,
          value.sasValue,
          value.subscriptionId,
          value.tags,
          key
        );
      }
      await newTestSuites.save();
    }
  }
  console.log("TEstSuites")
  
}

function getRandomBoolean() {
  // Generate a random number between 0 and 1
  const randomValue = Math.random();

  // Set a threshold value (0.5 in this case) to determine true or false
  const threshold = 0.5;

  // Compare the random value with the threshold
  return randomValue >= threshold;
}

async function addTests(
  parentRunId,
  testsNames,
  nameSpace,
  resourcesGroup,
  sasKey,
  sasValue,
  subscriptionId,
  tags,
  testSuiteName
) {
  
    testsNames.forEach(async (testName) => {
      const newTests = new TestDataHomeSchema({
        parentRunId,
        runId: uuidv4(),
        testName: testName,
        workload: {
          workloadName: "Workload4",
          workloadURL: "https://example.com/workload4",
        },
        isFailed: getRandomBoolean(),
        reason:
          "An unexpected error occurred while processing your request. Please try again later or contact support for assistance. Error code: 123456789",
        testSuiteName,
        nameSpace,
        resourcesGroup,
        sasKey,
        sasValue,
        subscriptionId,
        tags
      });
      await newTests.save();
    });
    console.log("test")
}





app.post("/v1/tests", async (req, res) => {
  try {
    const {
      testData
    } = req.body;

    const firstEntry = Object.entries(testData)[0];
  const firstKey = firstEntry[0];
  const firstValue = firstEntry[1];

    const newTests = new TestDataHomeSchema({
      runId: uuidv4(),
      testName: firstKey,
      workload: {
        workloadName: "Workload4",
        workloadURL: "https://example.com/workload4",
      },
      isFailed: getRandomBoolean(),
      reason:
        "An unexpected error occurred while processing your request. Please try again later or contact support for assistance. Error code: 123456789",
      nameSpace:firstValue.nameSpace,
      resourcesGroup:firstValue.resourcesGroup,
      sasKey:firstValue.sasKey,
      sasValue:firstValue.sasValue,
      subscriptionId:firstValue.subscriptionId,
      tags:firstValue.tags
    });
    await newTests.save();

    res.status(201).json({ message: "saved!!!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/v1/testSuites", async (req, res) => {
  try {
    const {
      testSuiteName,
      testSuiteMetaData,
      testNames
    } = req.body;

    
    const runId = uuidv4();
    var val = Math.floor(Math.random() * 30) + 1;
    const value=testSuiteMetaData[`${testSuiteName}`];
    const newTestSuites = new TestSuitesDataHomeSchema({
      runId,
      name:testSuiteName,
      startDate: Date.now,
      endDate: Date.now,
      namespaceName: value.nameSpace,
      pass_fail: {
        pass:val,
        fail:30-val
      },
      resourcesGroup:value.resourcesGroup,
      sasKey:value.sasKey,
      sasValue:value.sasValue,
      subscriptionId:value.subscriptionId,
      tags:value.tags
    });
    await addTests(runId,testNames,value.nameSpace,value.resourcesGroup,value.sasKey,value.sasValue,value.subscriptionId,value.tags,value.testSuiteName);
    await newTestSuites.save();
    res.status(201).json({ message: "saved!!!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/v1/testGroups", async (req, res) => {
  try {
    const {
      testRunName,
      testGroupName,
      testSuteMetaData,
      isCurrentlyExecuting
    } = req.body;

    var val = Math.floor(Math.random() * 30) + 1;
    var runId = uuidv4();
    var startDate = endDate = Date.now;

    const newTestGroup = new TestGroupDataHomeSchema({
      runId,
      testRunName,
      startDate,
      endDate,
      isCurrentlyExecuting,
      testGroupName,
      testsPassedCount: val,
      testsFailedCount: 30 - val
    });

    await addTestsuites(
      testSuteMetaData,
      runId,
      val,
      30 - val
    );
    console.log("testGroups")
    await newTestGroup.save();

    res.status(201).json(runId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// routes for home section

app.get("/v1/run/tests/", async (req, res) => {
  try {
    const { testName, page, limit, parentRunId, runId } = req.query;

    var query;
    if (parentRunId) {
      query = { parentRunId: parentRunId.split("|") };
    } else if (runId) {
      query = { runId: runId.split("|") };
    } else {
      query = testName ? { testName: testName.split("|") } : {};
    }
    const data = await TestDataHomeSchema.find(query);
    let paginatedData = data;
    if (page && limit) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      paginatedData = data.slice(startIndex, endIndex);
    }

    res.status(200).json(paginatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/v1/run/testSuites/", async (req, res) => {
  try {
    const { testSuiteName, page, limit, runId, parentRunId } = req.query;
    var query;

    if (parentRunId) {
      query = { parentRunId: parentRunId.split("|") };
    } else if (runId) {
      query = { runId: runId.split("|") };
    } else {
      query = testSuiteName ? { name: testSuiteName.split("|") } : {};
    }
    const data = await TestSuitesDataHomeSchema.find(query);
    let paginatedData = data;
    if (page && limit) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      paginatedData = data.slice(startIndex, endIndex);
    }

    res.status(200).json(paginatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/v1/run/testGroups/", async (req, res) => {
  try {
    const { testGroupName, page, limit, runId, isCurrentlyExecuting } =
      req.query;
    var query;

    if (isCurrentlyExecuting) {
      query = { isCurrentlyExecuting: isCurrentlyExecuting };
    } else if (runId) {
      query = { runId: runId };
    } else {
      query = testGroupName ? { testGroupName: testGroupName.split("|") } : {};
    }

    const data = await TestGroupDataHomeSchema.find(query);

    let paginatedData = data;
    if (page && limit) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      paginatedData = data.slice(startIndex, endIndex);
    }
    res.status(200).json(paginatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://Kartik224blue:Kartik224blue@cluster0.kzkycvs.mongodb.net/apis?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
    app.listen(PORT, () => {
      console.log(`node running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(error);
  });

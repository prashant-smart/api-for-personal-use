const { error } = require('console');
const express = require('express')
const mongoose = require('mongoose');
const TestDataHomeSchema = require('./models/Home Data Schema/testDataHome')
const TestSuitesDataHomeSchema = require('./models/Home Data Schema/testSuitesDataHome')
const TestGroupDataHomeSchema = require('./models/Home Data Schema/testGroupsDataHome')

const TestDataExplorerSchema =require('./models/Explorer Data Schema/testDataExplorer')
const TestGroupDataExplorerSchema =require('./models/Explorer Data Schema/testGroupExplorer')
const TestSuiteDataExplorerSchema =require('./models/Explorer Data Schema/testSuiteDataExplorer');

const app = express()

const PORT = process.env.PORT || 3000;



// routes for explorer section

app.get('/v1/tests/', async (req, res) => {
    try {
        const { testName, page, limit,testSuiteName} = req.query;

        var query;
        
        if(testSuiteName){
            const data = await TestSuiteDataExplorerSchema.find({ testSuiteName: testSuiteName.split('|') });
            const name = data.flatMap(suite => suite.ConfiguredTest);
            query= { testName: name }
        }
        else query = testName ? { testName: testName.split('|') } : {};

        const data = await TestDataExplorerSchema.find(query);

        let paginatedData = data;
        if (page && limit) {
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            paginatedData = data.slice(startIndex, endIndex);
        }

        res.status(200).json(paginatedData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.get('/v1/testSuites/', async (req, res) => {
    try {
        const { testSuiteName, page, limit,testGroupName } = req.query;

        var query;
        
        if(testGroupName){
            const data = await TestGroupDataExplorerSchema.find({ testGroupName: testGroupName.split('|') });
            const name = data.flatMap(suite => suite.testSuiteList);
            query= { testSuiteName: name }
        }
        else  query = testSuiteName ? { testSuiteName: testSuiteName.split('|') } : {};

        const data = await TestSuiteDataExplorerSchema.find(query);

        let paginatedData = data;
        if (page && limit) {
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            paginatedData = data.slice(startIndex, endIndex);
        }

        res.status(200).json(paginatedData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/v1/testGroups/', async (req, res) => {
    try {
        const { testGroupName, page, limit } = req.query;
        const query = testGroupName ? { testGroupName:  testGroupName.split('|')  } : {};

        const data = await TestGroupDataExplorerSchema.find(query);

        let paginatedData = data;
        if (page && limit) {
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            paginatedData = data.slice(startIndex, endIndex);
        }

        res.status(200).json(paginatedData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// routes for home section

app.get('/v1/run/tests/', async (req, res) => {
    try {
        const { testName, page, limit, testSuiteIds,runId} = req.query;
        
        var query;
        
        if(testSuiteIds){
            
            query= { parentRunId: testSuiteIds.split('|')}
        }else if (runId){
            query={runId:runId.split('|')}
        }
        else{
            query = testName ? { testName: testName.split('|') } : {};
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
        res.status(500).json({ message: error.message })
    }
})


app.get('/v1/run/testSuites/', async (req, res) => {
    try {
        const { testSuiteName, page, limit,runId,testGroupIds } = req.query;
        var query;
        
        if(testGroupIds){
            
            query= { parentRunId: testGroupIds.split('|')}
        }else if (runId){
            query={runId:runId.split('|')}
        }
        else{
            query = testSuiteName ? { name: testSuiteName.split('|') } : {};
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
        res.status(500).json({ message: error.message })
    }

})

app.get('/v1/run/testGroups/', async (req, res) => {
    try {
        const { testGroupName, page, limit,runId } = req.query;
        var query;

        if(runId){
            query = {runId:runId};
        }else{
            query = testGroupName ? { testGroupName: testGroupName.split('|') } : {};
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
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect("mongodb+srv://Kartik224blue:Kartik224blue@cluster0.kzkycvs.mongodb.net/apis?retryWrites=true&w=majority").then(() => {
    console.log("connected");
    app.listen(PORT, () => {
        console.log(`node running on port ${PORT}`)
    })
}).catch((err) => {
    console.log(error)
})
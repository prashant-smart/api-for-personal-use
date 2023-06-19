const { error } = require('console');
const express= require('express')
const mongoose = require('mongoose');
const testDataHome=require('./models/testDataHome')
const testSuitesHome=require('./models/testSuitesDataHome')
const testGroupHome =require('./models/testGroupsDataHome')
const app= express()

const PORT = process.env.PORT || 3000;

app.get('/home/tests',async(req,res)=>{
    try{
        const data=await testDataHome.find({});
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

app.get('/home/tests/:testName', async(req, res) =>{
    try {
        const {testName} = req.params;
        const data = await testDataHome.find({name:testName});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



app.get('/home/testSuites',async(req,res)=>{
    try{
        const data=await testSuitesHome.find({});
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

app.get('/home/testSuites/:testSuiteName', async(req, res) =>{
    try {
        const {testSuiteName} = req.params;
        const data = await testSuitesHome.find({name:testSuiteName});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/home/testGroups',async(req,res)=>{
    try{
        const data=await testGroupHome.find({});
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

app.get('/home/testGroups/:testGroupName', async(req, res) =>{
    try {
        const {testGroupName} = req.params;
        const data = await testGroupHome.find({name:testGroupName});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
                         
mongoose.connect("mongodb+srv://Kartik224blue:Kartik224blue@cluster0.kzkycvs.mongodb.net/apis?retryWrites=true&w=majority").then(()=>{
    console.log("connected");
    app.listen(PORT,()=>{
        console.log(`node running on port ${PORT}`)
    })
}).catch((err)=>{
    console.log(error)
})
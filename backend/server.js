const express = require('express')
var path = require('path')
var fs = require('fs')
var cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectId

const app = express()
app.use(express.json())
app.set('port', 3000)
const port = 3000
let db

// middleware for cors
app.use(cors())

app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

// logger middleware
app.use((req,res,next)=> {
    console.log("In comes a: " + req.method + " request to: " + req.url)
    next()
})


// connect mongodb 
MongoClient.connect('mongodb+srv://riazzx:Riazzx.1121@cluster0.ygr7yjf.mongodb.net/?retryWrites=true&w=majority', (err,client) => {
    db = client.db('afterschool')
})


app.get('/', (req,res)=> {
    res.send("go to a collection, for ex. collection/collectionName")
})

// callback trigger
app.param('collectionName', (req,res,next,collectionName) => {
    req.collection  = db.collection(collectionName)
    return next()
})


// get all lessons
app.get('/collection/:collectionName', (req,res,next)=>{
    req.collection.find({}).toArray((e, results) =>{
        if (e) return next(e)
        res.send(results)
    })
})

// post order to orders collection
app.post('/collection/:collectionName', (req,res,next) => {
    req.collection.insertOne(req.body, (e, results) => {
        if (e) return next(e)
        res.send(results.ops)
    })
})

// put request to update available lessons
app.put('/collection/:collectionName/:id', (req,res,next)=>{
    req.collection.updateOne(
        {_id: new ObjectID(req.params.id)},
        {$set: req.body},
        {safe: true, multi: false},
        (e,results) => {
        if (e) return next(e)
        res.send( (results.modifiedCount === 1)  ? {msg: 'success'} : {msg: 'error'})
    })
})

// search
app.get('/collection/:collectionName/:searchValue', (req,res) => {
    const { searchValue } = req.params
    req.collection.find({}).toArray((err,results) => {
        if (err) return next(err)
        const lessons = results.filter(lesson => {
            return (
                lesson.title.toLowerCase().match(searchValue.toLowerCase()) 
                ||
                lesson.location.toLowerCase().match(searchValue.toLowerCase())
            )
        })
        res.send(lessons)
    }) 
})

// static file middleware
app.use(function(req,res, next) {
    var filePath = path.join(__dirname, "static", req.url)
    fs.stat(filePath, function(err, fileInfo){
        if(err) {
            next()
            return
        }

        if(fileInfo.isFile()){
            res.sendFile(filePath)
        } else {
            next()
        }
    })
})
// middleware for not found
app.use(function(req,res){
    res.status(404)
    res.send("Error! Not found!")
})



// start server
app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`)
})
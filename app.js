var express = require('express')
var hbs = require('hbs')
var bodyParser = require('body-parser')
require('./db/mongodb')
var Student = require('./Models/studentModel')
var course = require('./Models/courseModel')

var connectionUrl = 'mongodb://127.0.0.1:27017';

var {MongoClient, ObjectID} = require('mongodb')

var app = express()

app.set('view engine', 'hbs')
//app.set('views', __dirname)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/addStudent', (req, res)=>{
    res.render('addStudent', {})
})

app.post('/addStudent', (req, res)=>{
    res.send(req.body);
    res.end();

    var student = new Student(req.body);
    student.save().then((result)=>{
        console.log("Success")
    }).catch((error)=>{
        console.log(error);
    })
})

app.get('/addCourse', (req, res)=>{
    res.render('addCourse', {})
})

app.post('/addCourse', (req, res)=>{
    res.send(req.body);
    res.end();

    var Course = new course(req.body);
    Course.save().then((result)=>{
        console.log('success')
        }).catch((error)=>{
            console.log(error)
    })
})

app.get('/checkStudent', (req, res)=>{
    res.render('checkStudent', {})
})

app.post('/checkStudent', (req, res)=>{

    console.log(req.body)

    MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (err, client)=>{
        if(err){
            console.log(err);
            return;
        }
    
        var db = client.db('theMITPost')
        db.collection('students').find(req.body).toArray((err, result)=>{
            if(err) throw err
    
            res.send(result);
        })
        
    
    })  
})

app.get('/checkCourse', (req, res)=>{
    res.render('checkCourse', {})
})

app.post('/checkCourse', (req, res)=>{
    console.log(req.body)

    MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (err, client)=>{
        if(err){
            console.log(err);
            return;
        }
    
        var db = client.db('theMITPost')
        db.collection('courses').find(req.body).toArray((err, result)=>{
            if(err) throw err
    
            res.send(result);
        })
        
    
    }) 
})

app.listen(3000)
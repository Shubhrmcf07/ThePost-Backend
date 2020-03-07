var express = require('express')
var hbs = require('hbs')
var bodyParser = require('body-parser')
require('./db/mongodb')
var Student = require('./Models/studentModel')
var course = require('./Models/courseModel')

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

app.listen(3000)
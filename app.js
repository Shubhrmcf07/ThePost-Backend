var express = require('express')
var hbs = require('hbs')
var bodyParser = require('body-parser')
require('./db/mongodb')
var Student = require('./Models/studentModel')
var course = require('./Models/courseModel')

var connectionUrl = "mongodb+srv://shubham:shubhrmcf@cluster0-utlbk.mongodb.net/theMITPosttest?retryWrites=true&w=majority";

var {MongoClient, ObjectID} = require('mongodb')

var app = express()

app.set('view engine', 'hbs')
//app.set('views', __dirname)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res)=>{
	
	res.send({"routes": ["/addStudent", "/checkStudent", "/studentDetails", "/addCourse", "/checkCourse", "/courseDetails", "/admit"]})
})

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
        var reg = "/" + req.body.name + "/"
        db.collection('students').find({name: {$regex: req.body.name, $options: "i"}}).toArray((err, result)=>{
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
        db.collection('courses').find({name : {$regex : req.body.name, $options : "i"}}).toArray((err, result)=>{
            if(err) throw err
    
            res.send(result);
        })
    }) 
})

app.post('/courseDetails', (req, res)=>{

    MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (err, client)=>{
        if(err){
            console.log(err);
            return;
        }
    
        var db = client.db('theMITPost')
        db.collection('courses').find({}).toArray((err, result)=>{
            if(err) throw err
    
            res.send(result);
        })
        
    
    }) 
})

app.post('/studentDetails', (req, res)=>{

    MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (err, client)=>{
        if(err){
            console.log(err);
            return;
        }
    
        var db = client.db('theMITPost')
        db.collection('students').find({}).toArray((err, result)=>{
            if(err) throw err
    
            res.send(result);
        })   
    }) 
})

app.get('/admit', (req, res)=>{
    res.render('admit', {});
})

app.post('/admit', (req, res)=>{
    MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (err, client)=>{
        if(err){
            console.log(err);
            return;
        }
    
        var db = client.db('theMITPost')

        var studYr
        var courseYr

        db.collection('students').find({regno : req.body.regno}).toArray((err, response)=>{
            if(err) throw err

            studYr = response[0].year

            db.collection('courses').find({name: req.body.name}).toArray((err, result)=>{
                if(err) throw err
    
                courseYr = result[0].year
    
                if(courseYr !== studYr)
                {
                    res.send("Invalid Admission")
                }

                else {
                    var course = {name : req.body.name}
                    db.collection('courses').findOneAndUpdate({name: req.body.name}, {$inc : {numStuds : 1}})
                    db.collection('students').findOneAndUpdate({regno: req.body.regno}, {$push : {Courses : course}})
                }
            })
        })

        // db.collection('students').findOneAndUpdate({regno : req.body.regno}, {$set : {Courses : req.body.name}})

        // db.collection('students').find({}).toArray((err, result)=>{
        //     if(err) throw err

        //     res.send(result)
        // })
    }) 
})

var port = 3000 || process.env.PORT

app.listen(port)

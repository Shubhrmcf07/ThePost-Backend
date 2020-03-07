var express = require('express')
var hbs = require('hbs')
var bodyParser = require('body-parser')

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
})

app.get('/addCourse', (req, res)=>{
    res.render('addCourse', {})
})

app.post('/addCourse', (req, res)=>{
    res.send(req.body);
    res.end();
})

app.listen(3000)
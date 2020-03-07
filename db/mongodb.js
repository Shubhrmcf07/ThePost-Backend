var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/theMITPost', {
    useNewUrlParser: true,
    useCreateIndex: true
})
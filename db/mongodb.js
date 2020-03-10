var mongoose = require('mongoose')

mongoose.connect("mongodb+srv://shubham:shubhrmcf@cluster0-utlbk.mongodb.net/theMITPost?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true
})

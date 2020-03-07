var mongoose = require('mongoose')

var Course = mongoose.model('Course', {
    id : {
        type: Number
    },


    Name: {
        type: String, 
        required: true
    }, 

    Year : {
        type: Number
    }, 

    numStuds : {
        type: Number
    }
})

module.exports = Course
var mongoose = require('mongoose')

var Course = mongoose.model('Course', {
    name: {
        type: String, 
        required: true
    }, 

    year : {
        type: Number
    }, 

    numStuds : {
        type: Number
    }
})

module.exports = Course
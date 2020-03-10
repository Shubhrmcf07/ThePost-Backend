var mongoose = require('mongoose')

var Course = mongoose.model('Course', {
    name: {
        type: String, 
        required: true
    }, 

    year : {
        type: Number,
	required: true
    }, 

    numStuds : {
        type: Number,
	required: true
    }
})

module.exports = Course

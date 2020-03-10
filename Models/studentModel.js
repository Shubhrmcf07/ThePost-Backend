var mongoose = require('mongoose')

var Student = mongoose.model('Student', {
    name: {
        type: String, 
        required: true,
        trim: true
    }, 

    year: {
        type: Number,
	required: true
    },

    regno: {
        type: String,
        required: true
    }, 
    
    Courses: {
        type: [{name : String}]
    }
})

module.exports = Student

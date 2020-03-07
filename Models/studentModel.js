var mongoose = require('mongoose')

var Student = mongoose.model('Student', {
    Name: {
        type: String, 
        required: true,
        trim: true
    }, 

    Year: {
        type: Number
    },

    Registration: {
        type: String,
        required: true
    }, 
    
    Courses: {
        type: Array
    }
})

module.exports = Student
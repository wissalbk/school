const mongoose= require('mongoose');

const courSchema = mongoose.Schema({
    name : String,
    description :String,
    duration : String,
    teacherID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
   
});

const course = mongoose.model('Course',courSchema);
module.exports = course;
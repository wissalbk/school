const mongoose = require('mongoose');

const evaluationSchema = mongoose.Schema({
    note : Number ,
    courId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    },
    studentId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    teacherId : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'User'
    },
    
    
});
const evaluation = mongoose.model('Evaluation',evaluationSchema);
module.exports = evaluation;
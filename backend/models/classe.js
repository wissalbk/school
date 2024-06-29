const mongoose = require('mongoose');

const classeSchema = mongoose.Schema({
    name : String,
 
    coursID : {
        type :mongoose.Schema.Types.ObjectId,
        ref :'Course'
    },
    studentsID : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }

    ]
});

const classe = mongoose.model('Classe',classeSchema);
module.exports = classe;

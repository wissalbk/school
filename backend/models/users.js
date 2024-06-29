//import mongoose module
const mongoose = require('mongoose');


//create user Schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    tel: Number,
    adresse: String,
    pwd: String,
    fileUser: String,
    phoneChild: Number,
    speciality: String,
    statut: String,
    role: String,
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe'
    },
    // note : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'Evaluation'
    // }

});

const user = mongoose.model('User', userSchema);
//make user exportable
module.exports = user;
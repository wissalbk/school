const express = require('express'); // import module ewpress
const bodyParser = require('body-parser');//import body-parser
const mongoose = require('mongoose');//import module mongoose 
mongoose.connect('mongodb://127.0.0.1:27017/schoolDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const axios = require('axios');
const multer = require('multer')
const path = require('path');
const app = express(); // creation d'application BE express


// bodyParser configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );

    next();
});



//session configuration
const secretKey = 'wissal';
app.use(session({
    secret: secretKey,
}));

//configuration image
// /shortCutPath == backend/images utiliser avec BD
app.use('/shortCutPath', express.static(path.join('backend/images')))
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf'
}
const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        if (isValid) {
            cb(null, 'backend/images')
        }
    },
    //nameFile
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-wissal-' + '.' + extension;
        cb(null, imgName);
    }
});

//import models
const User = require('./models/users');
const Course = require('./models/cour');
const Classe = require('./models/classe');
const evaluation = require('./models/evaluation');




//Here into BL : Signup
app.post("/api/users/signup", multer({ storage: storage }).single('userFile'), (req, res) => {
    console.log("here into add user :", req.body);
    console.log("here into add user :", req.file);

    User.findOne({ tel: req.body.tel }).then((doc) => {
        if (doc) {
            res.json({ message: 'phone Number already exist' })
        } else {

            bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
                console.log("here crypted pwd", cryptedPwd);
                req.body.pwd = cryptedPwd;
                // req.body.fileuser:declarer dansle model
                req.body.fileUser = `http://localhost:3000/shortCutPath/${req.file.filename}`;
                let userObj = new User(req.body);
                userObj.save();
                res.json({ message: "signup with success" });
            });

        }
    })

});

//here into BL update profile
app.put("/api/users/editProfile", (req, res) => {
    console.log("Here into BL update profile :", req.body);
    User.findOne({ _id: req.body.userId }).then((doc) => {
        console.log("Here doc profile :", doc);
        if (!doc) {
            res.json({ message: "user not found" })
        } else {
            bcrypt.compare(req.body.oldPwd, doc.pwd).then((pwdResult) => {
                console.log("Here result check pwd", pwdResult);
                if (!pwdResult) {
                    res.json({ message: "check your old password" })
                } else {
                    bcrypt.hash(req.body.newPwd, 10).then((cryptedPwd) => {
                        console.log("here cryptedPwd :", cryptedPwd);
                        User.updateOne({ _id: req.body.userId }, { pwd: cryptedPwd }).then((editResult) => {
                            console.log("here edit result : ", editResult);
                            if (editResult.nModified == 1) {
                                res.json({ message: "edited with success" })
                            } else {
                                res.json({ message: "error" })
                            }
                        })
                    })
                }
            })
        }

    })

});
//Here into BL getAllUsersbyAdmin
app.get('/api/users', (req, res) => {
    User.find({ role: { $in: ['teacher', 'student'] } }).then((docs) => {
        console.log('Here BL getAllUsers :', docs);
        res.json({ users: docs });

    })
})

//here into BL get all teachersByAdmin
app.get('/api/users/teachers', (req, res) => {
    User.find({ role: 'teacher' }).then((docs) => {
        console.log("here into BL get Teachers:", docs)
        res.json({ teachers: docs })
    });
})
//here into BL get all StudentsByadmin
app.get('/api/users/students', (req, res) => {
    User.find({ role: 'student' }).then((docs) => {
        console.log("here into BL get Students:", docs)
        res.json({ students: docs });
    })
})

// //Here into BL add classes
app.post("/api/classes", (req, res) => {
    console.log("here into BL : add courses ", req.body);

    Course.findById(req.body.coursID).then(
        async (courseObj) => {
            console.log("courseObj", courseObj);
            if (!courseObj) {
                res.json({ message: "Course Not Found" })
            } else {
                // 
                const users = await Promise.all(req.body.studentsID.map(id => User.findOne({ _id: id })));
                let studentsID = users.map(user => user._id);
                let classObj = new Classe({
                    name: req.body.name,
                    coursID: courseObj._id,
                    studentsID: studentsID
                });
                console.log("studentsID", studentsID);
                classObj.save((err, doc) => {
                    if (err) {
                        res.json({ message: "Classe Not Saved" })
                    } else {
                        // loop studentsID
                        User.updateMany({ _id: studentsID }, { classId: doc._id }).then((res) => {
                            console.log(res);
                            res.json({ message: "OK" })
                        })
                    }
                })

            }
        }
    )




});

//Here into BL getAllCoursesbyAdmin
app.get('/api/courses', (req, res) => {
    Course.find().populate("teacherID").then((docs) => {
        console.log('Here into BL getallCourses :', docs)
        res.json({ courses: docs });
    });
});

// //getUserByIdByadmin
app.get("/api/users/:id", (req, res) => {
    console.log("here into BL get user by id", req.params.id);
    User.findById(req.params.id).then((doc) => {
        console.log('here doc:', doc);
        res.json({ user: doc })
    })
})

//delete UserByAdmin
app.delete('/api/users/:id', (req, res) => {
    console.log("here into BL delete User By Id", req.params.id);
    User.deleteOne({ _id: req.params.id }).then((deleteResponse) => {
        console.log("here response after delete", deleteResponse);
        if (deleteResponse.deletedCount == 1) {
            res.json({ message: 'Delete with Success' })
        } else {
            res.json({ message: 'Error' })
        }
    });
});

//delete coursebyadmin
app.delete('/api/courses/:id', (req, res) => {
    console.log("here into delete course by admin:", req.params.id);
    Course.deleteOne({ _id: req.params.id }).then((deleteResponse) => {
        console.log("here response of delete :", deleteResponse);
        if (deleteResponse.deletedCount == 1) {
            res.json({ message: 'Delete with Success' });
        } else {
            res.json({ message: 'Error' });
        }
    })
});

//getCourByIdByadmin
app.get("/api/courses/:id", (req, res) => {
    console.log("here into BL get cour by id", req.params.id);
    Course.findById(req.params.id).then((doc) => {
        console.log('here doc:', doc);
        res.json({ cours: doc })
    })
})

//  //getCoursesbyteachers
app.get("/api/courses/coursesTeachers/:id", (req, res) => {
    console.log("here into BL getAllCourse by teachers:", req.params.id);
    Course.find({ teacherID: req.params.id }).then((docs) => {
        console.log("here docs teachers :", docs)
        res.json({ coursesTeachers: docs })
    })
});


//Here into BL add courses
app.post('/api/courses', (req, res) => {
    console.log('Here into BL add courses :', req.body);
    let courseObj = new Course(req.body);
    courseObj.save();
    res.json({ message: 'courses added with success' })
});

//Here into BL delete cour by Teacher
app.delete('/api/courses/deletebyTeacher/:id', (req, res) => {
    console.log("here into BL delete cour by teacher :", req.params.id);
    Course.deleteOne({ _id: req.params.id }).then((deleteResponse) => {
        console.log("here response of delete :", deleteResponse);
        if (deleteResponse.deletedCount == 1) {
            res.json({ message: 'Delete with Success' });
        } else {
            res.json({ message: 'Error' });
        }
    })
})
//here into BL get cour by teacher
app.get("/api/courses/getCourByTeacher/:id", (req, res) => {
    console.log("here into get cour by teacher:", req.params.id);
    Course.findById(req.params.id).then((doc) => {
        console.log("here doc of cour:", doc);
        res.json({ cour: doc });
    })
})
//Here into BL edit cour by teacher
app.put('/api/courses/editCourByTeacher', (req, res) => {
    console.log("here into edit cour:", req.body);
    Course.updateOne({ _id: req.body._id }, req.body).then((updateResponse) => {
        console.log("here update response :", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ message: 'Edited with Success' });
        } else {
            res.json({ message: 'Error' });
        }
    })
});

//Here into BL : get courses with Teacher informations
// app.get("/api/courses/teacherCourses", (req, res) => {
//     console.log("Hereinto BL : Get all courses with Teachers");
//     Course.find().populate("teachersID").then((TeachersDocs) => {
//         console.log("here players with Team : ", TeachersDocs);
//         res.json({ courses: TeachersDocs });
//     })
// })


//here into BL : login 
app.post('/api/users/login', (req, res) => {
    console.log('here into BL login :', req.body);
    User.findOne({ tel: req.body.tel }).then((doc) => {
        console.log("here doc :", doc);
        if (!doc) {
            res.json({ message: 'check your phone number' })
        } else {
            if (doc.statut == 'invalid') {
                res.json({ message: 'wait the accept of admin' })
            } else {
                bcrypt.compare(req.body.pwd, doc.pwd).then((pwdResult) => {
                    console.log("here pwdResult", pwdResult);
                    if (!pwdResult) {
                        res.json({ message: 'check your pwd' });
                    } else {
                        //user found 
                        let userFound = {
                            id: doc._id,
                            role: doc.role,
                            firstName: doc.firstName,
                            lastName: doc.lastName,
                            tel: doc.tel,
                            classId: doc.classId,
                        }
                        //encoder userTosend
                        //sign fonction predefinie de jsonwebtoken
                        //session = 1h
                        const token = jwt.sign(userFound, secretKey, { expiresIn: '1h' });
                        //token user encoder
                        res.json({ message: "welcome", user: token })
                    }
                })
            }

        }
    })
})

//valider teacherBYADMIN
app.put('/api/users/:id', (req, res) => {
    console.log("here into BL valider teacher :", req.params.id)
    User.updateOne({ _id: req.params.id }, { statut: 'valid' }).then((updateResponse) => {
        if (updateResponse.nModified == 1) {
            res.json({ message: 'statut updated' })
        } else {

            res.json({ message: "error" });
        }

    })
});

//HERE into BL get all classe with classteachers:
app.get("/api/users/courseTeacher/:id", async (req, res) => {
    try {
        const teacherId = req.params.id;

        // Trouver tous les cours enseignés par l'enseignant avec teacherID
        const docsTeacher = await Course.find({ teacherID: teacherId }).populate("teacherID");

        // Récupérer classes correspondant aux cours
        const doclasse = await Classe.find({ coursID: { $in: docsTeacher.map(course => course._id) } })
            .populate("coursID")
            .populate("studentsID");
        console.log("here docclasse:", doclasse)
        // Envoyer les résultats sous forme de réponse JSON
        res.json({ courseOfTeacher: doclasse });

    } catch (err) {
        console.error("Error fetching teacher courses:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// //here get student by cour (note)
// app.get("/api/courses/courbystudentNote/:id",(req,res)=>{
//     console.log("here cour selected:",req.params.id);
//     Course.find(req.params.id).then((docs)=>{
//         console.log("here docs studentCourNote",docs);
//         res.json({noteCour:docs});
//     })

// })

//here into getStudentwithhCourses:myCourses
// app.get("/api/users/CoursesStudent/:id", (req, res) => {
//     console.log("Hereinto BL : Get student with class",req.params.id);
//      User.findById(req.params.id).populate({path: 'classId',populate :[ {path : 'coursID',model:'Course'},{path : 'classId.coursID.teacherID',model:'User'}]}).then((studentDocs)=>{
//         console.log("here course with student : ", studentDocs);
//         res.json({ coursesStudent: studentDocs});
//      })

// });

//Here into get course of student 
app.get("/api/users/CoursesStudent/:id", (req, res) => {
    console.log("Here into BL : Get My Courses Student", req.params.id);
    Classe.find({ studentsID: req.params.id }).populate('coursID').then((myCourses) => {
        console.log("here course with student : ", myCourses);
        res.json({ coursesStudent: myCourses });
    });

})
//Here BL search child by parent
app.post('/api/users/searchChild', (req, res) => {
    console.log("here into BL search by parent :", req.body);
    User.findOne({ tel: req.body.phoneNumber }).then((resultChild) => {
        console.log("here result child :", resultChild)
        Classe.find({studentsID:resultChild._id}).populate('coursID').then((childInfo) => {
            console.log("here child info :", childInfo);
            res.json({ resultSearch: childInfo });
        })
    })

})

//Here into searchTeacher by speciality
app.post('/api/users/searchTeacher', (req, res) => {
    console.log("here into search teacher by speciality :", req.body);
    User.find({ speciality: req.body.speciality }).then((resultTeacher) => {
        console.log("here result of search Teacher:", resultTeacher);
        res.json({ resultSearch: resultTeacher });
    })
});

//note Service 
app.post('/api/notes', (req, res) => {
    console.log("here object Note :", req.body);
    let newNote = new evaluation({
        note: req.body.note,
        courId: req.body.courId,
        studentId: req.body.studentId,
        teacherId: req.body.teacherId
    });
    newNote.save();
    res.json({ message: "add with success" })
})
// here into BL afficher Note
app.get('/api/notes/:id',(req,res)=>{
    console.log("here into BL get Note ",req.params.id)
    const studentId = req.params.id;
    evaluation.find({studentId}).populate('courId').populate('teacherId').then((docsEvaluation)=>{
        res.json({noteDocs : docsEvaluation})
    })
})
module.exports = app; // make app exportable
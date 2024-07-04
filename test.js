// const multer = require('multer');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User'); // Assumption: User model includes all roles
// const mongoose = require('mongoose');

// // Configuration de multer pour gérer les fichiers uploadés
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads'); // Dossier où les fichiers seront sauvegardés
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // Nom du fichier original
//     }
// });

// // Route pour l'inscription d'un utilisateur
// app.post("/api/users/signup", multer({ storage: storage }).single('userFile'), (req, res) => {
//     console.log("here into add user :", req.body);
//     console.log("here into add user :", req.file);

//     // Vérification si le rôle est 'parent'
//     if (req.body.role === 'parent') {
//         // Vérification si le numéro de téléphone de l'enfant existe dans la liste des étudiants
//         User.findOne({ tel: req.body.phoneChild, role: 'student' }).then((student) => {
//             if (!student) {
//                 return res.json({ message: 'Phone number of child not found in student records' });
//             }

//             // Vérification si le numéro de téléphone du parent existe déjà dans la base de données
//             User.findOne({ tel: req.body.tel }).then((existingUser) => {
//                 if (existingUser) {
//                     return res.json({ message: 'Phone number already exists' });
//                 }

//                 // Hashage du mot de passe avant de le sauvegarder dans la base de données
//                 bcrypt.hash(req.body.pwd, 10).then((hashedPwd) => {
//                     console.log("here hashed pwd", hashedPwd);
//                     req.body.pwd = hashedPwd;
//                     req.body.fileUser = `http://localhost:3000/shortCutPath/${req.file.filename}`;

//                     // Création d'un nouvel objet utilisateur avec les données de la requête
//                     let userObj = new User(req.body);
//                     userObj.save().then(() => {
//                         res.json({ message: "Signup successful" });
//                     })
//                 })
//             })
//         })
//     } else {
//         res.status(400).json({ message: "Cannot signup. Invalid role or missing role information." });
//     }
// });

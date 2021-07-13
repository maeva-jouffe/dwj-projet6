const express = require('express');
const router = express.Router();
const passwordSchema = require('../middleware/passwordValidator')
const userCtrl = require('../controllers/user');

//Inscription de l'utilisateur
router.post('/signup',passwordSchema, userCtrl.signup);

//Connexion de l'utilisateur
router.post('/login', userCtrl.login);

module.exports = router;
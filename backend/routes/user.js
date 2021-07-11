const express = require('express');
const router = express.Router();
const passwordSchema = require('../middleware/passwordValidator')
const userCtrl = require('../controllers/user');

router.post('/signup',passwordSchema, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
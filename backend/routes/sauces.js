const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Enregistrer une sauce
router.post('/', auth, multer, sauceCtrl.createSauce );

//Modifier une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

//Supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//Récupérer une sauce spécifique
router.get('/:id', auth, sauceCtrl.getOneSauce);

//Récupérer la liste de sauces
router.get('/', auth, sauceCtrl.getAllSauce);

//Liker ou Disliker une sauce
router.post('/:id/like', auth, sauceCtrl.sauceLike);

module.exports = router;
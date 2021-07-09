const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');

//Enregistrer une sauce
router.post('/', auth, sauceCtrl.createSauce );

//Modifier une sauce
router.put('/:id', auth, sauceCtrl.modifySauce);

//Supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//Récupérer une sauce spécifique
router.get('/:id ', auth, sauceCtrl.getOneSauce);

//Récupérer la liste de sauces
router.get('/', auth, sauceCtrl.getAllSauce);

module.exports = router;
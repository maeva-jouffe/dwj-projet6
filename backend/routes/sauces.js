const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');

//Enregistrer une sauce
router.post('/api/sauces', auth, sauceCtrl.createSauce );

//Modifier une sauce
router.put('/api/sauces/:id', auth, sauceCtrl.modifySauce);

//Supprimer une sauce
router.delete('/api/sauces/:id', auth, sauceCtrl.deleteSauce);

//Récupérer une sauce spécifique
router.get('/api/sauces/:id ', auth, sauceCtrl.getOneSauce);

//Récupérer la liste de sauces
router.get('/api/sauces', auth, sauceCtrl.getAllSauce);

module.exports = router;
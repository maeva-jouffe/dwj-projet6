const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//Modules pour la sécurité
const dotenv = require('dotenv').config();
const urlMasquee = process.env.MONGODB_URL;
const mongoSanitize = require('express-mongo-sanitize');

//Paramètres des routes
const sauceRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user');

//Initialisation d'express
const app = express();

//connexion à la base de données
mongoose.connect(urlMasquee,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Configuration des headers CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

//Ajout du gestionnaire de routage pour rendre le dossier images statique
app.use('/images', express.static(path.join(__dirname, 'images')));

//Ajout du module mongoSanitize
app.use(mongoSanitize());


//Routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);




module.exports = app;
//Importation des modules de base
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//Importation des modules pour la sécurité
const dotenv = require('dotenv').config();
const urlConnexionMongoDB = process.env.MONGODB_URL;
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const rateLimit = require("./middleware/rate-limit");

//Importation des routeurs
const sauceRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user');

//Initialisation d'express
const app = express();

//connexion à la base de données
mongoose.connect(urlConnexionMongoDB,
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

//Transformation du corps de la requête en objet JSON
app.use(bodyParser.json());

//Ajout du gestionnaire de routage pour rendre le dossier images statique
app.use('/images', express.static(path.join(__dirname, 'images')));

//Ajout du module mongoSanitize qui supprimera dans les requêtes tous les clés commençant par $
app.use(mongoSanitize());

//Ajout du module helmet qui configure les en-têtes HTTP
app.use(helmet());

//Ajout du module rate-limit qui limite le nombre de requêtes par utilisateur
app.use(rateLimit);

//Routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
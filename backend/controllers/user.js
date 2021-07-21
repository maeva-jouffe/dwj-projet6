const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const tokenMasque = process.env.TOKEN;
const chaineMasque = process.env.CRYPTOJS
const cryptojs = require("crypto-js");


//Inscription de l'utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
        email: cryptojs.HmacSHA256(req.body.email, chaineMasque).toString(),
        password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

//Connexion de l'utilisateur
exports.login = (req, res, next) => {
    const decrypterEmail = cryptojs.HmacSHA256(req.body.email, chaineMasque).toString();
    User.findOne({email: decrypterEmail})
        .then(user => {
            if(!user) {
                return res.status(401).json({error: 'Pas de compte existant'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({error: 'Mot de passe incorrect'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            tokenMasque,
                            {expiresIn: '24h'}
                        )
                    });
                    next();
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));   
};
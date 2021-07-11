const passwordSchema = require("../models/passwordValidator");

module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)){
        res.status(400).json({error : "le mot de passe n'est pas assez sécurisé : "});
    }
    else{
        next();
    }
}
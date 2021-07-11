const passwordValidator  = require ('password-validator');
const passwordSchema = new passwordValidator();

passwordSchema
//Doit contenir minimum 5 caractères
.is().min(5)
//Doit contenir maximum 20 caractères
.is().max(20)
//Doit contenir au moins une lettre majuscule
.has().uppercase()
//Doit contenir au moins une lettre minuscule
.has().lowercase()
//Doit contenir au moins un chiffre
.has().digits(1)
//Ne doit pas contenir d'espaces
.has().not().spaces()

module.exports = passwordSchema;
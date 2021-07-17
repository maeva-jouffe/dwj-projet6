const rateLimit = require("express-rate-limit");

//On limite chaque Utilisateur à 1000 requêtes toutes les 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});

module.exports = limiter;
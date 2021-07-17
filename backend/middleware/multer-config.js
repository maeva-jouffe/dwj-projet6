const multer = require('multer');

//"Dictionnaire" pour créer l'extension du fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//On indique à Multer où enregistrer les fichiers entrants(images)
const storage = multer.diskStorage({
    destination: (req, file, callback)=> {
        callback(null, 'images');
    },
    //On indique à Multer  d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp comme nom de fichier
    filename: (req, file,callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage}).single('image');
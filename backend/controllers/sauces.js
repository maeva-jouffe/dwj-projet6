const Sauce = require('../models/sauces');
const fs = require('fs');

//Enregistrer une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Votre sauce est enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
};

//Modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body};
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
};

//Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error }));
      })
    })
    .catch(error => res.status(500).json({error})); 
};

//Récupérer une sauce spécifique
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

//Récupérer la liste de sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
};

//Like
 exports.sauceLike = (req, res, next) => {
  const avis = req.body.like;
  switch(avis){
      case 1 :
        Sauce.updateOne({_id : req.params.id}, {$inc : {likes : +1 },
        $push : { usersLiked : req.body.userId}
        })
            .then(() => res.status(201).json({message : "J'aime ajouté"}))   
            .catch(error => res.status(500).json({error}))       
        break;

        case -1 :
          Sauce.updateOne({_id : req.params.id}, {
            $push : { usersDisliked : req.body.userId}, $inc : {dislikes : +1 }
          })
              .then(() => res.status(201).json({message : "je n'aime pas ajouté"}))
              .catch(error => res.status(500).json({ error }))
        break;

        case 0 :  
          Sauce.findOne({_id : req.params.id})
              .then(sauce => {
                  if (sauce.usersLiked.includes(req.body.userId)){
                    Sauce.updateOne({_id : req.params.id}, {
                      $pull : { usersLiked : req.body.userId}, $inc : {likes : -1 }
                    })
                      .then(() => res.status(201).json({message : "votre j'aime a été retiré !"}))
                      .catch(error => res.status(500).json({error}))
                  }
                  else{
                    Sauce.updateOne({_id : req.params.id}, {
                      $pull : { usersDisliked : req.body.userId}, $inc : {dislikes : -1 }
                    })
                      .then(() => res.status(201).json({message : "Votre je n'aime pas été retiré !"}))
                      .catch(error => res.status(500).json({ error }))
                  }
              }) 
              .catch(error => res.status(500).json({ error}))
        break;  
    } 
}
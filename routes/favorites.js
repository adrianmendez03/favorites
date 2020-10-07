const router = require('express').Router();
let Favorite = require('../models/favorite.model');

router.route('/').get((req, res) => {
    Favorite.find()
        .populate('fans')
        .exec()
        .then(favorites => {
            res.json(favorites)
        })
        .catch(err => {
            res.status(400).json('Error: ' + err)
        }) 
})

// router.route('/').get((req, res) => {
//     Favorite.find()
//         .then(favorites => res.json(favorites))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/add').post((req, res) => {

    const id = req.body.locationId;
    const name = req.body.name;
    const coord = req.body.coord;
    const location = req.body.location;
    const description = req.body.description;
    
    const newFavorite = new Favorite({
        name,
        coord,
        location,
        description 
    });

    console.log(newFavorite)

    newFavorite._id = id;

    newFavorite.save()
        .then(() => res.json('Favorite created'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Favorite.findById(req.params.id)
        .then(favorite => res.json(favorite))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:locationId').post((req, res) => {
    console.log("body: ", req.body)
    const favoriteId = req.body.locationId;
    const userId = req.body.id;
     if(req.body.delete) {
       Favorite.findOneAndUpdate(
         { _id: favoriteId }, 
         { $pull: { fans: userId } },
        function (error, success) {
              if (error) {
                  res.status(400).json('Error: ', error);
              } else {
                  res.json('Favorite deleted');
              }
            }
      )
     } else {
       Favorite.findOneAndUpdate(
         { _id: favoriteId }, 
         { $push: { fans: userId } },
        function (error, success) {
              if (error) {
                  res.status(400).json(error);
              } else {
                  res.json('Favorite added');
              }
            }
      )
     }
  });

// router.route('/update/:id').post((req, res) => {
//     Favorite.findById(req.params.id)
//         .then(favorite => {
//             favorite.username = req.body.username;
//             favorite.name = req.body.name;
//             favorite.location = req.body.location;

//             favorite.save()
//                 .then(() => res.json('Favorite updated!'))
//                 .catch(err => res.status(400).json('Error: ' + err));
//         })

//         .catch(res.status(400).json('Error: ' + err));
// })

module.exports = router;
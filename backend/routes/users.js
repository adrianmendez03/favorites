const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const id = req.body.id;
    const username = req.body.username;

    const newUser = new User({username});

    newUser._id = id;

    newUser.save()
        .then(() => res.json('User created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  const id = req.body.id;
  const coord = [req.body.coord[0], req.body.coord[1]];
  const newFavorites = {
    coord: coord, 
    name: req.body.name, 
    location: req.body.location, 
    description: req.body.description 
  };
  User.findOneAndUpdate(
     { _id: id }, 
     { $push: { favorites: newFavorites  } },
    function (error, success) {
          if (error) {
              res.status(400).json('Error: ', error);
          } else {
              res.json('Favorite Updated!');
          }
        }
  )
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
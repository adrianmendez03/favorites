const router = require('express').Router();
let User = require('../models/user.model');
const { isValidObjectId } = require('mongoose');

// Path to get Users

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Path to get a single User

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})

// Path to Add a User
// is called with => const newUser = { id: userId, username: userName };

router.route('/add').post((req, res) => {
    const id = req.body.id;
    const username = req.body.username;

    const newUser = new User({username});

    newUser._id = id;

    newUser.save()
        .then(() => res.json('User created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Path to add a favorite 
// is called with =>
// const newFavorite =  {
//     id: this.props.signedInUserId,
//     coord: this.state.coord,
//     name: this.state.name,
//     location: this.state.location,
//     description: this.state.description
// }

router.route('/update/:id').post((req, res) => {
  const id = req.body.id;

  if(req.body.delete) {
    User.findOneAndUpdate(
      { _id: id }, 
      { $pull: { favorites: { _id: req.body.favoriteId} } },
     function (error, success) {
           if (error) {
               res.status(400).json('Error: ', error);
           } else {
               res.json('Favorite Updated!');
           }
         }
   )
  } else {

    const coord = [req.body.coord[0], req.body.coord[1]]
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
  }
});

// Path to delete
// is passed signed in user id 

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
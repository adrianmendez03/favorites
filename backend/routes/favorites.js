const router = require('express').Router();
let Favorite = require('../models/favorite.model');

router.route('/').get((req, res) => {
    Favorite.find()
        .then(favorites => res.json(favorites))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const location = req.body.location;

    const newFavorite = new Favorite({
        username, 
        name, 
        location,
    });

    newFavorite.save()
        .then(() => res.json('Favorite added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req, res) => {
    Favorite.findById(req.params.id)
        .then(favorite => res.json(favorite))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Favorite.findByIdAndDelete(req.params.id)
        .then(() => res.json('Favorite deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Favorite.findById(req.params.id)
        .then(favorite => {
            favorite.username = req.body.username;
            favorite.name = req.body.name;
            favorite.location = req.body.location;

            favorite.save()
                .then(() => res.json('Favorite updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })

        .catch(res.status(400).json('Error: ' + err));
})

module.exports = router;
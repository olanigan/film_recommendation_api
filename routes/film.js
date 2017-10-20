var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/:id/recommendations', function(req, res) {
  models.Film.findById(req.params.id).then((films) => {
    res.json(films);
  });
});

module.exports = router;
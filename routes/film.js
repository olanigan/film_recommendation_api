const db  = require('../models'),
      express = require('express'),
      router  = express.Router();
      Sequelize = db.Sequelize,
      sequelize = db.sequelize,
      Op = Sequelize.Op,
      moment = require('moment');

router.get('/:id/recommendations',  getFilmRecommendations);

// ROUTE HANDLER
function getFilmRecommendations(req, res) {
  getFilm(req, res);
}

function getFilm(req, res){
  console.info("GET FILMS ID: ", req.params.id)
  db.Film.findById(req.params.id).then((filmObj) => {
    if(filmObj == null){
      res.send({"msg":"Film not found"});
    }else{
      getRecommendations(filmObj, res);
    }
  });
}

function getRecommendations(filmObj, res){
  console.info("GET RECOMMENDATION ID: ", filmObj.id, typeof filmObj.release_date, filmObj.release_date)
  if(filmObj.id == undefined){
    res.send({"msg":"Recommendations not found"})
  }
  else{
      db.Film.findAll({
        attributes:['id', 'title', 'release_date'],
        where: {
          id: {
            [Op.ne]: filmObj.id
          },
          release_date: {
            [Op.gte]: moment(filmObj.release_date).subtract('15', 'years'),
            [Op.lte]: moment(filmObj.release_date).add('15', 'years')
          },
          genre_id: filmObj.genre_id
        },
        limit: 10,
        include: [ db.Genre ],
        order: db.Film.id
      }).then((films) => {
        res.json(films);
      });
    }  
}

module.exports = router;
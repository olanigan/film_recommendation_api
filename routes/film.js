const db  = require('../models'),
      express = require('express'),
      router  = express.Router();
      http = require('request-promise-json'),
      request = require('request'),
      Sequelize = db.Sequelize,
      sequelize = db.sequelize,
      Op = Sequelize.Op,
      moment = require('moment'),
      _ = require('underscore'),
      reviewsApi = 'http://credentials-api.generalassemb.ly/4576f55f-c427-4cfc-a11c-5bfe914ca6c1?films=';

    //ROUTES
    router.get('/:id/recommendations',  getFilmRecommendations);

    // ROUTE HANDLER
    function getFilmRecommendations(req, res) {
      getFilm(req, res);
    }

    function getFilm(req, res){
      db.Film.findById(req.params.id)
        .then((filmObj) => {
          if(filmObj == null){
            res.send({"msg":"Film not found"});
          }else{
            getRecommendations(filmObj,req, res);
          }
        })
        .catch((err) => {
          res.status(404).send({"message":err});
        });
    }

    function getRecommendations(filmObj,req, res){

      if(filmObj.id == undefined){
        res.send({"msg":"Recommendations not found"});
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
            include: [ db.Genre ],
            order: db.Film.id
          }).then((films) => {
            getReviews(films, res);
          })
          .catch((err) => {
            res.status(404).send({"message":err});
          });
        }  
    }

    function getReviews(filmList, res){
      let newList = [];
      let json = [],
      ratingsList = [],
      averageRating = 0,
      size = 0;
      
      //Iterate through Film List
      _.each(filmList, function(filmObj, index){

        http.get(reviewsApi + filmObj.id)
        .then(function(repos) {
            json = repos[0];
            ratingsList = _.pluck(json.reviews,'rating');
            averageRatings = _.reduce(ratingsList, function(memo, obj){return memo+obj})/ratingsList.length;
            size = _.size(json.reviews);
          
          //Apply API criteria
          if(size > 5 && averageRatings.toFixed(1) > 4.0){
              var film = {};
              film.id = filmObj.id;
              film.title = filmObj.title;
              film.releaseDate = filmObj.release_date;
              film.genre = filmObj.genre.name;
              film.averageRating = averageRatings.toFixed(1);
              film.reviews = size;
              //Add new film if not exist
              if(_.indexOf(filmList, film) == -1){
                  newList.push(film);
              }
          }
          //End of iteration, Output result
          if(index == filmList.length-1){
              if(size > 0){
                res.status(200).json(newList);
              }
              else{
                res.status(404).send({"message":"No Recommendation found with at least 4.0 average rating and within 15 years"});
              }
          }
          
        })
        .catch((err) => {
          res.status(404).send({"message":err});
        });
      });

    }
module.exports = router;
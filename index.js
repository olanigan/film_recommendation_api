const sqlite = require('sqlite'),
      Sequelize = require('sequelize'),
      request = require('request'),
      express = require('express'),
      app = express();
  
const { PORT=3001, NODE_ENV='development', DB_PATH='./db/database.db' } = process.env;

const sequelize = new Sequelize(DB_PATH, '', '', {dialect: 'sqlite'})

// MODELS
const Film = sequelize.define('films', 
{
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: Sequelize.STRING,
    releaseDate: Sequelize.DATE,
    tagline: Sequelize.STRING,
    revenue: Sequelize.BIGINT,
    budget: Sequelize.BIGINT,
    runtime: Sequelize.INTEGER,
    originalLanguage: Sequelize.STRING,
    status: Sequelize.STRING,
    genreId: Sequelize.INTEGER,
});

const Genre = sequelize.define('genres', 
{
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
});


  // START SERVER
  Promise.resolve()
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => { if (NODE_ENV === 'development') console.error(err.stack); });

  // ROUTES
  app.get('/films/:id/recommendations', getFilmRecommendations);

  // ROUTE HANDLER
  function getFilmRecommendations(req, res) {
    res.status(500).send('Not Implemented');
  }

module.exports = app;

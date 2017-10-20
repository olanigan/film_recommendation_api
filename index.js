const sqlite = require('sqlite'),
      Sequelize = require('sequelize'),
      request = require('request'),
      express = require('express'),
      path = require('path'),
      app = express();
  
const { PORT=3001, NODE_ENV='development', DB_PATH='./db/database.db' } = process.env;
const config = { dialect: 'sqlite', storage: path.join(__dirname, DB_PATH) }
const sequelize = new Sequelize(DB_PATH, '', '', config)

// MODELS
const Film = sequelize.define('films', 
{
    id: { type: Sequelize.INTEGER, primaryKey: true },
    title: Sequelize.STRING,
    release_date: Sequelize.DATE,
    tagline: Sequelize.STRING,
    revenue: Sequelize.BIGINT,
    budget: Sequelize.BIGINT,
    runtime: Sequelize.INTEGER,
    original_language: Sequelize.STRING,
    status: Sequelize.STRING,
    genre_id: Sequelize.INTEGER,
},
{
  timestamps: false
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
    //Sample call to test database connection
    Film.findById(req.params.id)
      .then(film => {res.json(film)})
      .catch(err => {
        console.error(err.stack)
        res.status(404).send('Film not found')
      })
  }

module.exports = app;

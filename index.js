const sqlite = require('sqlite'),
      Sequelize = require('sequelize'),
      request = require('request'),
      express = require('express'),
      path = require('path'),
      app = express(),
      films = require('./routes/film');
 
const { PORT=3001, NODE_ENV='development'} = process.env;

  // START SERVER
  Promise.resolve()
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => { if (NODE_ENV === 'development') console.error(err.stack); });

  // ROUTES
  app.use('/films', films);

module.exports = app;

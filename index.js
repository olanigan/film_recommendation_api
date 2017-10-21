const express = require('express'),
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

  app.get('*', unimplementedHandler);

  //Handles unimplemented routes
  function unimplementedHandler(req, res){
    res.status(504).send('Route is not implemented')
  }
module.exports = app;

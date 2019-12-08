const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//== Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public');
const partialsPath = path.join(__dirname, '../views/layouts');
//const viewsPath = path.join(__dirname, '..', 'templates')

//== Setup handlebars engine and views location
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);
//app.set('views', viewsPath)

//== Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', function(req, res) {
  res.render('index', {
    title: 'Weather',
    name: 'Shanioob'
  });
});

app.get('/about', function(req, res) {
  res.render('about', {
    title: 'About Me',
    name: 'Shanioob'
  });
});

app.get('/help', function(req, res) {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Shanioob'
  });
});

app.get('/weather', function(req, res) {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  geocode(address, function(error, { latitude, longitude, location } = {}) {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, function(error, forecastData) {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

app.get('/products', function(req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', function(req, res) {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Help article not found.'
  });
});

app.get('*', function(req, res) {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Page not found.'
  });
});

app.listen(port, function() {
  console.log(`listening to http://localhost:${port}/ or http://127.0.0.1:${port}/`);
});

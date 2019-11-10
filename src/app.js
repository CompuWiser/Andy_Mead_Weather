const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

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
  res.send({
    forecast: 'It is snowing',
    location: 'Philadelphia'
  });
});

app.get('/help/*', function(req, res) {
  res.render('404', {
      title: '404',
      name: 'Andrew Mead',
      errorMessage: 'Help article not found.'
  })
})

app.get('*', function(req, res) {
  res.render('404', {
      title: '404',
      name: 'Andrew Mead',
      errorMessage: 'Page not found.'
  })
})

app.listen(3000, function() {
  console.log('listening to http://localhost:3000/ or http://127.0.0.1:3000/');
});

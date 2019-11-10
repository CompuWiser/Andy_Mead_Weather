const express = require('express');
const path = require('path');

const app = express();

const publicDirectoryPath = path.join(__dirname, '..', 'public');
console.log(publicDirectoryPath);

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

app.get('', function(req, res) {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew Mead'
  });
});

app.get('/about', function(req, res) {
  res.render('about', {
    title: 'About Me',
    name: 'Andrew Mead'
  });
});

app.get('/help', function(req, res) {
  res.render('help', {
    helpText: 'This is some helpful text.'
  });
});

app.get('/weather', function(req, res) {
  res.send({
    forecast: 'It is snowing',
    location: 'Philadelphia'
  });
});

app.listen(3000, function() {
  console.log('listening to http://localhost:3000/ or http://127.0.0.1:3000/');
});

const express = require('express');

const app = express();

app.get('', function(req, res) {
  res.send('Hello express!');
});

app.get('/help', function(req, res) {
  res.send('Help page');
});

app.get('/about', function(req, res) {
  res.send('About');
});

app.get('/weather', function(req, res) {
  res.send('Your weather');
});

app.listen(3000, function () {
  console.log('listening to http://localhost:3000/ or http://127.0.0.1:3000/')
})

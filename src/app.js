const express = require('express');
const path = require('path');
const app = express();

const publicDirectoryPath = path.join(__dirname, '..', 'public');
console.log(publicDirectoryPath);

app.use(express.static(publicDirectoryPath));

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'It is snowing',
    location: 'Philadelphia'
  });
});

app.listen(3000, function() {
  console.log('listening to http://localhost:3000/ or http://127.0.0.1:3000/');
});

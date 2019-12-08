const request = require('request');
const API_KEY = 'f352a70f89ed00ed68178eab9b1268c6';
const language = 'en';
const units = 'si';

const forecast = function(latitude, longitude, callback) {
  const url = `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}?lang=${language}&units=${units}`;

  request({ url, json: true }, function(error, { body }) {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const summary = body.daily.data[0].summary;
      const { temperature, precipProbability } = body.currently;

      callback(
        undefined,
        `${summary}\nIt is currently ${temperature}° degress out.\nThere is a ${precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;

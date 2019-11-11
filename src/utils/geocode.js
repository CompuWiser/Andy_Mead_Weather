const request = require('request');
const ACCESS_TOKEN = `pk.eyJ1Ijoic2hhbmlvb2IiLCJhIjoiY2sycGl1NG43MDRmMjNqbnluamxtM2VybSJ9.DkFdQOQ9ZUPdyB5pfPJ-Eg`;

const geocode = function(address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${ACCESS_TOKEN}&limit=1`;

  request({ url, json: true }, function(error, {body}) {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      let [longitude, latitude] = body.features[0].center;
      let location = body.features[0].place_name;

      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;

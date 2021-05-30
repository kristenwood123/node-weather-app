const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3Jpc3Rlbndvb2QxMjMiLCJhIjoiY2twNG01NXp3MDJsMzJ1bW5xY2FlMThzbiJ9.ut-RST3j31yLWN1imeraIw&limit=1'
  
    request({ url, json: true }, (err, { body }) => {
      if(err) {
        callback('Unable to connect to location services')
      } 
      else if (body.features.length === 0) {
        callback('Unable to find location')
      }  
      else {
        callback(undefined, {
          latitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
          location: body.features[0].place_name
        })
      }
    })
}

module.exports = geocode;

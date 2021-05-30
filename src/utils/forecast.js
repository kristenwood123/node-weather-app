const request = require('request')

const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=3581d49e833b2b7d42ec91f492164bf6&query=' + latitude + ',' + longitude + '&units=f'

  request({ url, json: true}, (err, { body }) => {

    if(err) {
      callback('Unable to connect to location services', undefined)

    } else if(body.err) {
      console.log('Unable to find location', undefined);

    } else {
       callback(
         undefined, 
        `It is currently ${body.current.temperature} degrees out. There is ${body.current.precip}% chance of rain.`)
      }
    })
}

module.exports = forecast


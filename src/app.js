const path = require('path')
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()
const port = process.env.PORT || 3000


//Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up status directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Kristen Woodward'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Must provide address'
    })
  }

  geocode(req.query.address, (err, {latitude, longitude, location } = {} ) => {
    if(err) {
      return res.send({ err })
    } 

    forecast(latitude, longitude, (err, forecastData) => {
      if(err) { 
        return res.send({ err })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    }) 
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Kristen Woodward'
  })
})

app.get('/help',(req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Kristen'
  })
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Weather',
    name: 'Kristen',
    errorMessage: 'Help page not found'
  })
})


app.get('*', (req, res) => {
  res.render('404', {
    title: 'Weather',
    name: 'Kristen',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log(chalk.bgGreen('server is running on ' + port));
})
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ashutosh Sahu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ashutosh Sahu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ashutosh Sahu'
    })
})

app.get('/weather', (req, res) => {
    const sendInvalidLocationResponse = (message = "Empty location parameter") => {
        return res.send({
            error: "Unable to fetch weather details",
            message
        })
    }
    if (!req.query.location) {
        return sendInvalidLocationResponse()
    }
    geocode(req.query.location, (error, data) => {
        if (error) {
            return sendInvalidLocationResponse(error)
        } else {
            forecast(data, (error, response) => {
                if(error) {
                    return sendInvalidLocationResponse(error)
                }
                res.send({
                    Place: data.location,
                    WeatherDetails: response,
                })
            })
        }
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Ashutosh Sahu',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Ashutosh Sahu',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log(`Server is up on port 3000`)
})

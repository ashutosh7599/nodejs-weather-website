const request = require('request')

const forecast = ({longitude, latitude}, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=2fc65b7424887f067c1674a221a0ae31`
    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Could not connect to the server')
        } else if (response.body.message) {
            callback('No such location')
        } else {
            callback(undefined, response.body)
        }
    })
}

module.exports = forecast
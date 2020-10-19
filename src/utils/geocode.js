const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?&limit=1&access_token=pk.eyJ1IjoibW9zY293bXVsZSIsImEiOiJja2dnN3RseGsweTZ2MnRuYTRzMDE4NTllIn0.GxwtZKXT502zQ0QwpOK-3w"
    request({
        url, json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Cannot find any location with the given search query', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
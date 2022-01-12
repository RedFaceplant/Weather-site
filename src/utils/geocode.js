const request = require("request")
//Follows lecture because this API still exists.

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiYWtpbmc0MTciLCJhIjoiY2t5YWFvYm03MDNxMjJ2bnVvYWtpN3M5biJ9.sqVkRg7OdXIYBPxCkXtlZQ"

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to conncet to location service", undefined)
        }else if(body.features.length === 0){
            callback("Unable to find location", undefined)
        }else{
            callback(undefined, {
                lat:  body.features[0].center[1],
                long: body.features[0].center[0],
                name: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
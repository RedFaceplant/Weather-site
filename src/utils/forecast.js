const request = require("request")
//Weatherstack uses .current, not .currently

const forecast = (lat, long, callback) => {
    const url  = "http://api.weatherstack.com/current?access_key=cf539b6fe10abdeec52b9329790203d3&query="+lat+","+long+"&units=f"

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to conncet to weather service", undefined)
        }else if(body.error){
            callback("Unable to find location", undefined)
        }else{
            callback(undefined, {
                disc: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feel: body.current.feelslike
            })
        }
    })
}

module.exports = forecast
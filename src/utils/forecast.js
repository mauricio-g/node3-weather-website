const request = require('postman-request')


const forecast =  (longitude, latitude,callback) => {

const url = 'http://api.weatherstack.com/current?access_key=c501ca63479c9f8cf605482a6dd1f43d&query=' + longitude +','+ latitude +'&units='

request({url, json:true},(error,{body}) => {   
    if (error) {
        callback('Unable to connect to weather service',undefined)
    }
    else if (body.error){
        callback('Unable to find location ',undefined)

    }
    
    else {
        callback(undefined,{
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        humidity: body.current.humidity,
        })
    }
})

}

module.exports = forecast
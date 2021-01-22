const request = require('postman-request')

const geocode = (address,callback) =>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibW9ycmlzZyIsImEiOiJja2p0bmpnZGIxcnp4MnNsMW02bWF2Y3I0In0.7V_O5CFg5uRDIBphZw5uKA&limit=1'
    
    request({url,json:true}, (error,{body}) => {
        if (error) {
            callback ('Unable to connect',undefined)

        }
        else if (body.features.length === 0) {
            callback ('Unable to find location', undefined)

        }else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name 
            })
        }

    })
}

module.exports = geocode
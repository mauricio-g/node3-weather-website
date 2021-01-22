const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars location and views location 
app.set('view engine','hbs')
app.set('views',viewsPath,)
hbs.registerPartials(partialsPath)

//Setup active directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Mauricio Goncalves'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Mauricio Goncalves'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title: 'Help',
        name: 'Mauricio Goncalves',
        helpMessage: 'This is a help message'
    })
})


app.get ('/weather',(req,res) => {
    
    if (!req.query.address) {
        return res.send({
            errorMessage: 'You must provide an address'
        })
    }else{
        geocode (req.query.address, (error,{latitude,longitude ,location} = {})=>{
            if (error){
                return res.send({error})
            }
            forecast(latitude,longitude, (error, {temperature,description,feelslike}) => {
                
                if (error){
                    return res.send({
                        error:error
                    })
                }   
                res.send({
                    location:location,
                    temperature:temperature,
                    feelslike:feelslike,
                    description: description

                })
              })
        })
    }
    
})

app.get('/help/*',(req,res) =>{

    res.render('404',{
        title:'404',
        name: 'Mauricio Goncalves',
        errorMessage: 'Help Article not found' 
    })

})

app.get('*',(req,res) => {

    res.render('404',{
        title:'404',
        name: 'Mauricio Goncalves',
        errorMessage: 'Page not found' 
    })
})

app.listen(3000,() => {
    console.log('Server is up on port 3000')
})
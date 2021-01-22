const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const  messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector ('#message-2')

messageOne.textContent = 'Weather Forecast Loading'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Weather Forecast Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location ).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            console.log(data.error)
        }else if (data.errorMessage){
            messageOne.textContent = data.errorMessage
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = 'The current temperature is ' + data.temperature + ' and it is ' + data.description +
            '.It feels like ' + data.feelslike
        }
        
    })
})

})
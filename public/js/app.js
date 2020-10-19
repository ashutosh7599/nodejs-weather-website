console.log('Client side')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    fetch(`/weather?location=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msg1.textContent = 'Error: ' + data.error
                msg2.textContent = 'Message: ' + data.message
            } else {
                msg1.textContent = 'Location: '+ data.Place
                msg2.textContent = 'Temperature: ' + data.WeatherDetails.current.temp
            }
        })
    })
})


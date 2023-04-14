let cityChoice;

if ('geolocation' in navigator) {
    // watchPosition with 'position' as parameter is a method used
    // each time the location of the device changes.
    navigator.geolocation.watchPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + long + '&lat=' + lat + '&appid=dc7f65cfc963a0105bb137a39b73dbf4&units=metric';

        // Instance AJAX object for interact with the server
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'json';
        request.send();

        request.onload = function() {

            // Check that the response of the server has been received in its entirety.
            // 200 corresponds to a successful answer.
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    let response = request.response;
                    let city = response.name;
                    let temperature = response.main.temp;

                    document.querySelector('#temperature_label').textContent = temperature;
                    document.querySelector('#city').textContent = city;
                } else {
                    alert('Sorry, an error has occured!');
                }
            }
        }
    }, options);
} else {
    cityChoice = 'Paris';
    getTemp(cityChoice);
}

var options = {
    enableHighAccuracy: true
}

function getTemp(city) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

    let request = new XMLHttpRequest(); 
    request.open('GET', url);
    request.responseType = 'json';
    request.send(); 

    request.onload = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let response = request.response;
                let temperature = response.main.temp;
                let city = response.name;

                document.querySelector('#temperature_label').textContent = temperature;
                document.querySelector('#city').textContent = city;
            } else {
                alert('Please, retry later.');
            }
        }
    }
}

let changeCity = document.querySelector('#change');

changeCity.addEventListener('click', () => {
    cityChoice = prompt('Which city do you want the temperature:');
    getTemp(cityChoice);
});

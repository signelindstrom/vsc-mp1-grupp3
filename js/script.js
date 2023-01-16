//get the latitude and longitude of users device
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition, displayError);
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  console.log(`Latitude ${latitude}, Longitude ${longitude}`);

  getCityName(latitude, longitude)
  getWeather(latitude, longitude);

}


// get location name
function getCityName(lat, long) {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=a2de5014979b69e8f9f100296b649487`;

  fetch(url)
    .then(response => response.json())
    .then(locationData)
}

function locationData(locationName){
  const name = document.querySelector('#current-location');
  console.log(locationName[0].name)
  name.innerText = locationName[0].name
}


// get weather data
function getWeather(lat, long) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a2de5014979b69e8f9f100296b649487`;

  fetch(url)
    .then(response => response.json())
    .then()
}


//if getCurrentPosition failed
function displayError() {
  console.log('Geolocation is not supported by this browser');
}

getLocation();
getLocation();

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

function locationData(location){
  const name = document.querySelector('#current-location');
  console.log(location[0].name)
  name.innerText = location[0].name
}


// get weather data
function getWeather(lat, long) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a2de5014979b69e8f9f100296b649487`;

  fetch(url)
    .then(response => response.json())
    .then(weatherData)
}

function weatherData(weather){
  const temp = document.querySelector('#current-temp');
  temp.innerText = kelvinToCelsius(weather.main.temp) + ' ºC';
  console.log('Kelvin', weather.main.temp);
  console.log('Celsius', kelvinToCelsius(weather.main.temp));

  const img = document.querySelector('#weather-icon');
  const icon = weather.weather[0].icon
  img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  console.log(weather.main.humidity)
  const humidity = document.querySelector('#humidity');
  humidity.innerText = `Humidity: ${weather.main.humidity}%`;

  //get times for sunset/sunrise
  console.log('UTC', weather.sys.sunset);
  console.log('UTC', weather.sys.sunrise);

  console.log('Sunrise:', UTCToDate(weather.sys.sunrise));
  console.log('Sunset:', UTCToDate(weather.sys.sunset));
}

function UTCToDate(utc){
  let options = { hour: '2-digit', minute: '2-digit', hour12: false };
  return new Date(utc).toLocaleTimeString([], options);
}

//if getCurrentPosition failed
function displayError() {
  console.log('Geolocation is not supported by this browser');
}

//Converts kelvins to celsius returns a number with one decimal
function kelvinToCelsius(kelvin){
  return Math.round((kelvin-273.15)*10)/10;
}

function openNav(){
    document.querySelector('.sideNav').style.width = '95vw';
}

function closeNav(){
  document.querySelector('.sideNav').style.width = '0';
}
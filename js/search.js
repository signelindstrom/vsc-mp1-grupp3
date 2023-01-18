//Search
const searchInput = document.getElementById('city-search-input');
const searchBtn = document.getElementById('city-search-button');
const searchInfoContainer = document.querySelector('.info-container');
searchInfoContainer.style.display = 'none';

searchBtn.addEventListener('click', e =>{
    e.preventDefault();
    const searchValue = searchInput.value.toLowerCase();
    console.log(searchValue);
    getCity(searchValue);
});


// get city info
function getCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a2de5014979b69e8f9f100296b649487`;

  fetch(url)
    .then(response => response.json())
    .then(getCityData);
}

function getCityData(cityData){
    console.log(cityData);
    const cityLat = cityData.coord.lat;
    const cityLon = cityData.coord.lon;
    const cityName = cityData.name;

    const cityNameTag = document.getElementById('city-name');
    cityNameTag.innerText = cityName;

    console.log('Name', cityName);
    console.log('Lat ',cityLat);
    console.log('Lon ',cityLon)
    getWeather(cityLat, cityLon);
    searchInfoContainer.style.display = 'block';
}

// get weather data
function getWeather(lat, long) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a2de5014979b69e8f9f100296b649487`;

  fetch(url)
    .then(response => response.json())
    .then(weatherData)
}

function weatherData(weather) {
  const temp = document.querySelector('#current-temp');
  temp.innerText = kelvinToCelsius(weather.main.temp) + ' ºC';
  console.log('Kelvin', weather.main.temp);
  console.log('Celsius', kelvinToCelsius(weather.main.temp));

  const img = document.querySelector('#weather-icon');
  const icon = weather.weather[0].icon
  img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  // get humidity
  console.log('Humidity ',weather.main.humidity)
  const humidity = document.querySelector('#humidity');
  humidity.innerText = `${weather.main.humidity}%`;

  // get wind speed
  const wind = document.querySelector('#wind')
  console.log('Wind ',weather.wind.speed)
  wind.innerText = `${weather.wind.speed} m/s`

  // get temp feels like
  const tempFeelsLike = document.querySelector('#temp-feels-like');
  console.log('Feels like ',kelvinToCelsius(weather.main.feels_like))
  tempFeelsLike.innerText = `${kelvinToCelsius(weather.main.feels_like)} ºC`
}

//if getCurrentPosition failed
function displayError() {
  console.log('Geolocation is not supported by this browser');
}

//Converts kelvins to celsius returns a number with one decimal
function kelvinToCelsius(kelvin) {
  return Math.round((kelvin - 273.15) * 10) / 10;
}

function openNav() {
  document.querySelector('.sideNav').style.width = '95vw';
}

function closeNav() {
  document.querySelector('.sideNav').style.width = '0';
}

function UTCToDate(utc) {
  let options = { hour: '2-digit', minute: '2-digit', hour12: false };
  return new Date(utc).toLocaleTimeString([], options);
}
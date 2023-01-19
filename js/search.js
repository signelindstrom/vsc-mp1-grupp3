//Search
const searchInput = document.getElementById('city-search-input');
const searchBtn = document.getElementById('city-search-button');
const searchInfoContainer = document.querySelector('.info-container');

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  const searchValue = searchInput.value.toLowerCase();
  getCity(searchValue);
});

getCity('wellington');
getCity('bangkok');
getCity('new york');
getCity('paris');

// get city info
function getCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a2de5014979b69e8f9f100296b649487`;

  fetch(url)
    .then(response => response.json())
    .then(getCityData);
}


function getCityData(cityData) {
  const cityLat = cityData.coord.lat;
  const cityLon = cityData.coord.lon;

  getWeather(cityLat, cityLon, cityData);
}

// get weather data
function getWeather(lat, long, cityData) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a2de5014979b69e8f9f100296b649487`;

  fetch(url)
    .then(response => response.json())
    .then(data => weatherData(data, cityData));
}

function weatherData(weather, cityData) {
  // make divs
  const cityDiv = document.querySelector('#city-container');
  const infoDiv = document.createElement('div');
  cityDiv.prepend(infoDiv);
  infoDiv.classList.add("info-container")
  const searchBoxDiv = document.createElement('div');
  infoDiv.appendChild(searchBoxDiv);
  searchBoxDiv.classList.add("search-box");

  // get city name
  const cityName = document.createElement('h4');
  searchBoxDiv.appendChild(cityName);
  cityName.innerText = cityData.name;

  // get temp
  const temp = document.createElement('h3');
  searchBoxDiv.appendChild(temp);
  temp.innerText = kelvinToCelsius(weather.main.temp) + ' ºC';

  // get icon
  const img = document.createElement('img');
  searchBoxDiv.appendChild(img);
  const icon = weather.weather[0].icon
  img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  // get feels like
  const feelsLikeDiv = document.createElement('div');
  infoDiv.appendChild(feelsLikeDiv);
  const feelsLikeSpanText = document.createElement('span');
  feelsLikeDiv.appendChild(feelsLikeSpanText);
  feelsLikeSpanText.innerText = 'Feels like';
  const feelsLikeSpanTemp = document.createElement('span');
  feelsLikeDiv.appendChild(feelsLikeSpanTemp);
  feelsLikeSpanTemp.innerText = `${kelvinToCelsius(weather.main.feels_like)} ºC`;

  // get humidity
  const humidityDiv = document.createElement('div');
  infoDiv.appendChild(humidityDiv);
  const humidityText = document.createElement('span');
  humidityDiv.appendChild(humidityText);
  humidityText.innerText = 'Humidity';
  const humidityPercentage = document.createElement('span');
  humidityDiv.appendChild(humidityPercentage);
  humidityPercentage.innerText = `${weather.main.humidity}%`;

  // get wind speed
  const windDiv = document.createElement('div');
  infoDiv.appendChild(windDiv);
  const windText = document.createElement('span');
  windDiv.appendChild(windText);
  windText.innerText = 'Wind';
  const windSpeed = document.createElement('span');
  windDiv.appendChild(windSpeed);
  windSpeed.innerText = `${weather.wind.speed} m/s`;
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
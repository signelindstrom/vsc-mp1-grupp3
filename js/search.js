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


// get first city (paris)
cityOne()
function cityOne(){
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=paris&appid=a2de5014979b69e8f9f100296b649487';

  fetch(url)
  .then(response=> response.json())
  .then(cityOneInfo)
}

function cityOneInfo(paris){
  const temp = document.querySelector('#current-temp1');
  temp.innerText = kelvinToCelsius(paris.main.temp) + ' ºC';
  console.log('Kelvin', paris.main.temp);
  console.log('Celsius', kelvinToCelsius(paris.main.temp));

  const img = document.querySelector('#weather-icon1');
  const icon = paris.weather[0].icon
  img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  // get humidity
  console.log('Humidity ',paris.main.humidity)
  const humidity = document.querySelector('#humidity1');
  humidity.innerText = `${paris.main.humidity}%`;

  // get wind speed
  const wind = document.querySelector('#wind1')
  console.log('Wind ',paris.wind.speed)
  wind.innerText = `${paris.wind.speed} m/s`

  // get temp feels like
  const tempFeelsLike = document.querySelector('#temp-feels-like1');
  console.log('Feels like ',kelvinToCelsius(paris.main.feels_like))
  tempFeelsLike.innerText = `${kelvinToCelsius(paris.main.feels_like)} ºC`
}


// get second city (new york)
cityTwo()
function cityTwo(){
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=new%20york&appid=a2de5014979b69e8f9f100296b649487';

  fetch(url)
  .then(response=> response.json())
  .then(cityTwoInfo)
}

function cityTwoInfo(newYork){
  const temp = document.querySelector('#current-temp2');
  temp.innerText = kelvinToCelsius(newYork.main.temp) + ' ºC';
  console.log('Kelvin', newYork.main.temp);
  console.log('Celsius', kelvinToCelsius(newYork.main.temp));

  const img = document.querySelector('#weather-icon2');
  const icon = newYork.weather[0].icon
  img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  // get humidity
  console.log('Humidity ',newYork.main.humidity)
  const humidity = document.querySelector('#humidity2');
  humidity.innerText = `${newYork.main.humidity}%`;

  // get wind speed
  const wind = document.querySelector('#wind2')
  console.log('Wind ',newYork.wind.speed)
  wind.innerText = `${newYork.wind.speed} m/s`

  // get temp feels like
  const tempFeelsLike = document.querySelector('#temp-feels-like2');
  console.log('Feels like ',kelvinToCelsius(newYork.main.feels_like))
  tempFeelsLike.innerText = `${kelvinToCelsius(newYork.main.feels_like)} ºC`
}


// get third city (wellington)
cityThree()
function cityThree(){
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=wellington&appid=a2de5014979b69e8f9f100296b649487';

  fetch(url)
  .then(response=> response.json())
  .then(cityThreeInfo)
}

function cityThreeInfo(wellington){
  const temp = document.querySelector('#current-temp3');
  temp.innerText = kelvinToCelsius(wellington.main.temp) + ' ºC';
  console.log('Kelvin', wellington.main.temp);
  console.log('Celsius', kelvinToCelsius(wellington.main.temp));

  const img = document.querySelector('#weather-icon3');
  const icon = wellington.weather[0].icon
  img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  // get humidity
  console.log('Humidity ',wellington.main.humidity)
  const humidity = document.querySelector('#humidity3');
  humidity.innerText = `${wellington.main.humidity}%`;

  // get wind speed
  const wind = document.querySelector('#wind3')
  console.log('Wind ',wellington.wind.speed)
  wind.innerText = `${wellington.wind.speed} m/s`

  // get temp feels like
  const tempFeelsLike = document.querySelector('#temp-feels-like3');
  console.log('Feels like ',kelvinToCelsius(wellington.main.feels_like))
  tempFeelsLike.innerText = `${kelvinToCelsius(wellington.main.feels_like)} ºC`
}


// get fourth city (shanghai)
cityFour()
function cityFour(){
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=shanghai&appid=a2de5014979b69e8f9f100296b649487';

  fetch(url)
  .then(response=> response.json())
  .then(cityFourInfo)
}

function cityFourInfo(shanghai){
  const temp = document.querySelector('#current-temp4');
  temp.innerText = kelvinToCelsius(shanghai.main.temp) + ' ºC';
  console.log('Kelvin', shanghai.main.temp);
  console.log('Celsius', kelvinToCelsius(shanghai.main.temp));

  const img = document.querySelector('#weather-icon4');
  const icon = shanghai.weather[0].icon
  img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  // get humidity
  console.log('Humidity ',shanghai.main.humidity)
  const humidity = document.querySelector('#humidity4');
  humidity.innerText = `${shanghai.main.humidity}%`;

  // get wind speed
  const wind = document.querySelector('#wind4')
  console.log('Wind ',shanghai.wind.speed)
  wind.innerText = `${shanghai.wind.speed} m/s`

  // get temp feels like
  const tempFeelsLike = document.querySelector('#temp-feels-like4');
  console.log('Feels like ',kelvinToCelsius(shanghai.main.feels_like))
  tempFeelsLike.innerText = `${kelvinToCelsius(shanghai.main.feels_like)} ºC`
}
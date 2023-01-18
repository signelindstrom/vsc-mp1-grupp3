getLocation();

//get the latitude and longitude of users device
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition, displayError);
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  console.log(`Latitude ${latitude}, Longitude ${longitude}`);

  getCityName(latitude, longitude);
  getWeather(latitude, longitude);
  getDailyForecast(latitude, longitude);

}


// get location name
function getCityName(lat, long) {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=a2de5014979b69e8f9f100296b649487`;

  fetch(url)
    .then(response => response.json())
    .then(locationData)
}

function locationData(location) {
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

function weatherData(weather) {
  const temp = document.querySelector('#current-temp');
  temp.innerText = kelvinToCelsius(weather.main.temp) + ' ºC';
  console.log('Kelvin', weather.main.temp);
  console.log('Celsius', kelvinToCelsius(weather.main.temp));

  const img = document.querySelector('#weather-icon');
  const icon = weather.weather[0].icon
  img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  // get humidity
  console.log(weather.main.humidity)
  const humidity = document.querySelector('#humidity');
  humidity.innerText = `${weather.main.humidity}%`;

  //get times for sunset/sunrise
  console.log('Sunrise:', UTCToDate(weather.sys.sunrise * 1000));
  console.log('Sunset:', UTCToDate(weather.sys.sunset * 1000));
  const sunInfo = document.querySelector('#sunset-sunrise');
  sunInfo.innerText = `${UTCToDate(weather.sys.sunrise * 1000)} / ${UTCToDate(weather.sys.sunset * 1000)}`;

  // get wind speed
  const wind = document.querySelector('#wind')
  console.log(weather.wind.speed)
  wind.innerText = `${weather.wind.speed} m/s`

  // get temp feels like
  const tempFeelsLike = document.querySelector('#temp-feels-like');
  console.log(kelvinToCelsius(weather.main.feels_like))
  tempFeelsLike.innerText = `${kelvinToCelsius(weather.main.feels_like)} ºC`
}

// get daily forecast
function getDailyForecast(lat, long) {
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=a2de5014979b69e8f9f100296b649487`;

  fetch(url)
    .then(response => response.json())
    .then(dailyData)
}

// dagens datum
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
if (month < 10) {
  month = "0" + (date.getMonth() + 1);
}
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${year}-${month}-${day}`;
console.log(currentDate); // "17-6-2022"

function dailyData(dailyForecast) {
  dailyForecast.list.forEach(element => {
    if (!(element.dt_txt.includes(`${currentDate}`))) {

      if (element.dt_txt.includes('12:00:00')) {
        console.log(element.dt_txt)
        console.log(kelvinToCelsius(element.main.temp))

        // 4-day date
        const dayContainer = document.querySelector('#day-container');
        const dayDate = document.createElement('span');
        dayContainer.appendChild(dayDate);
        dayDate.innerText = element.dt_txt;

        // 4-day temp
        const tempContainer = document.querySelector('#temp-container');
        const dayTemp = document.createElement('span');
        tempContainer.appendChild(dayTemp);
        dayTemp.innerText = kelvinToCelsius(element.main.temp);
      }
    }
  });
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
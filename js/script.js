getLocation();

//get the latitude and longitude of users device
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition, displayError);
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  getCityName(latitude, longitude);
  getWeather(latitude, longitude);
  getDailyForecast(latitude, longitude);

}


//if getCurrentPosition failed
function displayError() {
  console.log('Geolocation is not supported by this browser');

  const errorMessage = document.createElement('h3');
  errorMessage.innerText = 'Sorry, something went wrong! Try changing your settings for geolocation permission in your browser.';
  
  const errorImg = document.createElement('img');
  errorImg.src = '../images/sad-sun.png';

  const errorContainer = document.createElement('div');
  errorContainer.classList.add('error-container');
  errorContainer.appendChild(errorMessage);
  errorContainer.appendChild(errorImg);

  const mainContainer = document.getElementById('main-container');
  mainContainer.innerHTML = '';
  mainContainer.appendChild(errorContainer);
}


// get location name
function getCityName(lat, long) {
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=a2de5014979b69e8f9f100296b649487`;

  fetch(url)
    .then(response => response.json())
    .then(locationData)
}

function locationData(location) {
  const name = document.querySelector('#current-location');
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

  const img = document.querySelector('#weather-icon');
  const icon = weather.weather[0].icon
  img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  // get humidity
  const humidity = document.querySelector('#humidity');
  humidity.innerText = `${weather.main.humidity}%`;

  //get times for sunrise/sunset
  const sunInfo = document.querySelector('#sunrise-sunset');
  sunInfo.innerText = `${UTCToDate(weather.sys.sunrise * 1000)} / ${UTCToDate(weather.sys.sunset * 1000)}`;

  // get wind speed
  const wind = document.querySelector('#wind')
  wind.innerText = `${weather.wind.speed} m/s`

  // get temp feels like
  const tempFeelsLike = document.querySelector('#temp-feels-like');
  tempFeelsLike.innerText = `${kelvinToCelsius(weather.main.feels_like)} ºC`
}

// get daily forecast
function getDailyForecast(lat, long) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=a2de5014979b69e8f9f100296b649487`;

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

let currentDate = `${year}-${month}-${day}`;

function dailyData(dailyForecast) {
  dailyForecast.list.forEach(element => {
    if (!(element.dt_txt.includes(`${currentDate}`))) {

      if (element.dt_txt.includes('12:00:00')) {

        // 4-day date
        const dayContainer = document.querySelector('#day-container');
        const dayDate = document.createElement('span');
        dayContainer.appendChild(dayDate);
        const dateString = element.dt_txt.split(' ');
        const dateStringFinal = dateString[0].split('-')
        dayDate.innerText = `${dateStringFinal[2]}/${dateStringFinal[1]}`;

        // 4-day icons
        const dayIconContainer = document.querySelector('#day-icon-container');
        const dayIcon = document.createElement('img');
        dayIconContainer.appendChild(dayIcon);
        dayIcon.src = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`;

        // 4-day temp
        const tempContainer = document.querySelector('#temp-container');
        const dayTemp = document.createElement('span');
        tempContainer.appendChild(dayTemp);
        dayTemp.innerText = `${kelvinToCelsius(element.main.temp)} ºC`;
      }
    }
  });

  // get 3-hour span temp
  for (let i = 0; i < 4; i++) {
    const hourlyTempContainer = document.querySelector('#hourly-temp-container');
    const hourlyTemp = document.createElement('span');
    hourlyTempContainer.appendChild(hourlyTemp);
    hourlyTemp.innerText = `${kelvinToCelsius(dailyForecast.list[i].main.temp)} ºC`

    // 3-hour span icons
    const hourlyIconContainer = document.querySelector('#hourly-icon-container');
    const hourlyIcon = document.createElement('img');
    hourlyIconContainer.appendChild(hourlyIcon);
    hourlyIcon.src = `https://openweathermap.org/img/wn/${dailyForecast.list[i].weather[0].icon}@2x.png`;

    // 3-hour time-stamp
    const tempTime = dailyForecast.list[i].dt_txt.split(' ')
    const tempTimeCompressed = tempTime[1].split(':')
    const timeContainer = document.querySelector('#time-container');
    const timeHour = document.createElement('span');
    timeContainer.appendChild(timeHour);
    timeHour.innerText = `${tempTimeCompressed[0]}:${tempTimeCompressed[1]}`
  }
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

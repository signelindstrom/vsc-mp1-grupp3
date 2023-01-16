//get the latitude and longitude of users device
function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition, displayError);
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(`Latitude ${latitude}, Longitude ${longitude}`);

    function getCityName(event){
      const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=a2de5014979b69e8f9f100296b649487`;

      fetch(url)
      .then(response=> response.json)
      .then()
    }
}

//if getCurrentPosition failed
function displayError(){
    console.log('Geolocation is not supported by this browser');
}

getLocation();
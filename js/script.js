function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log('Geolocation is not supported by this browser');
  }
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

getLocation();
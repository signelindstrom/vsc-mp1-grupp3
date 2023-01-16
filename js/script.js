//get the latitude and longitude of users device
function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition, displayError);
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(`Latitude ${latitude}, Longitude ${longitude}`);
}

//if getCurrentPosition failed
function displayError(){
    console.log('Geolocation is not supported by this browser');
}

getLocation();
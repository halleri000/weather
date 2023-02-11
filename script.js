 
   const options = {
    enabledHighAccuracy: true,
}


let watchId = navigator.geolocation.getCurrentPosition(success, error, options);


function success(pos) {
    console.log(pos.coords.latitude + " " + pos.coords.longitude);
    navigator.geolocation.clearWatch(watchId);
    var latLon = [pos.coords.latitude, pos.coords.longitude]
    locationSearch(latLon);
}
const fallBackLocation = { latitude: 48.8575, longitude: 2.2982 };
function error() {
}


function locationSearch(coords){
    var input = document.getElementById("cityInput").value;
    if(!input.length){
        input = coords;
        console.log(input)
    }
        console.log('yo',input);
    currentWeather(input);           
}
searchBtn = document.getElementById('submit');
searchBtn.addEventListener('click',function(event){
    locationSearch();
    event.preventDefault()
})


function currentWeather(input){
    let fetchedPromise = fetch("http://api.weatherapi.com/v1/current.json?key=bc2c013159814f248ca140427230302&q=" + input);


    fetchedPromise.then(function (response) {
        let responsePromise = response.json();
        responsePromise.then(function (dataObj) {
            console.log(dataObj);
            console.log(response.json())
            var condition = dataObj.current?.condition?.text,
                icon = dataObj.current?.condition?.icon,
                temp = dataObj.current?.temp_f,
                location = {
                    city: dataObj.location?.name,
                    state: dataObj.location?.region,
                    country: dataObj.location?.country,
                    localtime: dataObj.location?.localtime
                };
            printWeatherIcon(icon);
            printLocation(location);
            printWeather(temp, condition);
        });
    });
};


function printWeatherIcon(url){
    const image = document.getElementById('icon');
    image.src = url;
};


function printLocation(locObj){
    var local = document.getElementById('location');
    var textNode = document.createTextNode(locObj.city + ', ' + locObj.state);
    local.appendChild(textNode);
};


function printWeather(temperature, weatherCondition){
    var tempDiv = document.getElementById('tempBlock');
    var textNode = document.createTextNode(temperature + '°F');
    tempDiv.appendChild(textNode)


    var conditionP = document.getElementById('condition');
    var conditionNode = document.createTextNode(weatherCondition);
    conditionP.appendChild(conditionNode);
};


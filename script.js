var searchForm = $("#search-form");
var searchTermEl = $("#search-term");
var weatherContainerEl = $("#weather-container");
var localWeatherEl = $("#local-weather");
var fiveDayEl = $("#five-day-forecast");
var fiveDayContainer = $("#five-day-container");
var today = moment().format("M/DD/YYYY");
var cities = [];

searchForm.on("submit", function (event) {
    event.preventDefault();
    //Grab the search term out of the input.
    var searchTerm = searchTermEl.val();
    cities.push(searchTerm);
    //convert the response from JSON
    localStorage.setItem("citiesArray", JSON.stringify(cities));
    //.val allows you to pull info from form input
    //start by console logging the data
    console.log(searchTerm);
    getWeather(searchTerm);
})

function getWeather(city) {
    //store the API key in a variable
    var apiKey = "32529dfed4bea5888fb05111a3006541";
    //build the API URL with search term and API key for local weather
    var localURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
    //Make an API call for local weather using fetch
    fetch(localURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //create today's weather elements and assign content
            var displayCityName = $('<h2>').addClass('col-sm-12').text(city + " " + today);
            var tempEl = $('<li>').text("Temperature: " + data.main.temp + " °F");
            var humidEl = $('<li>').text("Humidity: " + data.main.humidity + " %");
            var windSpeedEl = $('<li>').text("Wind Speed: " + data.wind.speed + " MPH");
            //append today's weather elements to the page
            weatherContainerEl.append(displayCityName);
            localWeatherEl.append(tempEl);
            localWeatherEl.append(humidEl);
            localWeatherEl.append(windSpeedEl);
            //TODO: find uv index console.log(data.);

            //make an API call for 5 Day forecast using fetch
            fetch(fiveDayURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var fiveDayHeading = $('<h2>').text("5-Day Forecast:")
                    fiveDayContainer.append(fiveDayHeading);
                    fiveDayEl.removeClass("d-none")
                    for (i = 0; i < data.list.length; i++) {

                        if (data.list[i].dt_txt.includes("12:00:00")) {
                            var fiveDayDateEl = $('<h4>').text((moment.unix(data.list[i].dt).format("M/DD/YYYY")));
                            fiveDayEl.append(fiveDayDateEl);
                            var fiveDayTempEl = $('<div>').addClass('card-body bg-primary text-white').text("Temp: " + data.list[i].main.temp);
                            fiveDayEl.append(fiveDayTempEl);
                            //TODO: add if else statement for icons
                            var fiveDayHumidEl = $('<div>').addClass('card-body bg-primary text-white').text("Humidity: " + data.list[i].main.humidity + "%");
                            fiveDayEl.append(fiveDayHumidEl);
                        }
                    }

                })

        });

}


function getStorage() {
    if (localStorage.getItem("citiesArray")) {
        cities = JSON.parse(localStorage.getItem("citiesArray"));
        //TODO: loop through and append to a button for each city that will run getWeather when clicked
        console.log(cities);
    }
}

getStorage();


//TODO: Remaining:
//add search buttons
//fix formatting
//add weather symbols with if statement

//If time:
//find UV index and color code
//color code UV index


//variables
var searchForm = $("#search-form");
var searchTermEl = $("#search-term");
var weatherContainerEl = $("#weather-container");
var localWeatherEl = $("#local-weather");
var localIconContainer = $('#local-icon');
var fiveDayContainer = $("#five-day-container");
var fiveDayHeadingContainer = $("#five-day-heading");
var buttonContainer = $('#button-container');
var today = moment().format("M/DD/YYYY");
var cities = [];

//functions

//this function pulls info from the API and displays the weather data on the page
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
            var localIcon = data.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + localIcon + ".png"
            var displayCityName = $('<h2>').addClass('col-12').text(city + " " + today);
            var localIconEl = $('<img>').attr("src", iconURL);
            var tempEl = $('<li>').addClass("m-2").text("Temperature: " + data.main.temp + " °F");
            var humidEl = $('<li>').addClass("m-2").text("Humidity: " + data.main.humidity + " %");
            var windSpeedEl = $('<li>').addClass("m-2").text("Wind Speed: " + data.wind.speed + " MPH");
            //append today's weather elements to the page
            weatherContainerEl.append(displayCityName);
            localIconContainer.append(localIconEl);
            localWeatherEl.append(tempEl);
            localWeatherEl.append(humidEl);
            localWeatherEl.append(windSpeedEl);

            //define information for UV Index
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var uvIndexURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
            fetch(uvIndexURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var uvIndexEl = $('<li>').addClass("m-2").text("UV Index: " + data.current.uvi);
                    localWeatherEl.append(uvIndexEl);
                })


            //make an API call for 5 Day forecast using fetch
            fetch(fiveDayURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var fiveDayHeading = $('<h2>').addClass("ml-3 mr-4 mb-3").text("5-Day Forecast:")
                    fiveDayHeadingContainer.append(fiveDayHeading);
                    for (i = 0; i < data.list.length; i++) {

                        if (data.list[i].dt_txt.includes("12:00:00")) {
                            var fiveDayIcon = (data.list[0].weather[0].icon);
                            var fiveDayIconURL = "http://openweathermap.org/img/w/" + fiveDayIcon + ".png"
                            var fiveDayIconEl = $('<img>').attr("src", fiveDayIconURL);
                            var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                            var cardBody = $("<div>").addClass("card-body p-2");
                            var fiveDayDateEl = $('<h4>').addClass('card-title').text((moment.unix(data.list[i].dt).format("M/DD/YYYY")));
                            var fiveDayTempEl = $('<div>').addClass('card-text').text("Temp: " + data.list[i].main.temp + " °F");
                            var fiveDayHumidEl = $('<div>').addClass('card-text').text("Humidity: " + data.list[i].main.humidity + "%");
                            cardBody.append(fiveDayDateEl, fiveDayTempEl, fiveDayIconEl, fiveDayHumidEl);
                            card.append(cardBody);
                            fiveDayContainer.append(card);
                        }
                    }

                })

        });

}

//get items from local storage
function getStorage() {
    if (localStorage.getItem("citiesArray")) {
        cities = JSON.parse(localStorage.getItem("citiesArray"));
        for (i = 0; i < cities.length; i++) {
            var button = $('<button>').addClass("btn btn-outline-secondary text-left p-2").text(cities[i]);
            buttonContainer.append(button);
        };
    }
}

//call functions
getStorage();

//event listeners
searchForm.on("submit", function (event) {
    event.preventDefault();
    //Grab the search term out of the input.
    var searchTerm = searchTermEl.val();
    cities.push(searchTerm);
    //convert the response from JSON
    localStorage.setItem("citiesArray", JSON.stringify(cities));
    getWeather(searchTerm);
})

var searchForm = $("#search-form");
var searchTermEl = $("#search-term");
var weatherContainerEl = $("#weather-container");
var localWeatherEl = $("#local-weather");
var fiveDayEl = $("#five-day-forecast");
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

    //Make an API call using fetch
    fetch(localURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //create today's weather elements and assign content
            var displayCityName = $('<h2>').addClass('col-sm-12').text(city);
            //TODO: add today's date with moment to .text(data) above
            var tempEl = $('<li>').text("Temperature: " + data.main.temp + " °F");
            var humidEl = $('<li>').text("Humidity: " + data.main.humidity + " %");
            var windSpeedEl = $('<li>').text("Wind Speed: " + data.wind.speed + " MPH");
            //append today's weather elements to the page
            weatherContainerEl.append(displayCityName);
            localWeatherEl.append(tempEl);
            localWeatherEl.append(humidEl);
            localWeatherEl.append(windSpeedEl);
            //TODO: find uv index console.log(data.);
            fetch(fiveDayURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data.list);
                    for (i = 0; i < data.list.length; i++) {

                        if (data.list[i].dt_txt.includes("12:00:00")) {
                            console.log(data.list[i])
                            var fiveDayTempEl = $('<div>').addClass('card-body bg-primary text-white').text("Temp: " + data.list[i].main.temp);
                            fiveDayEl.append(fiveDayTempEl);
                            //if the date time includes 1200
                            //then we will assume that object has the weather we want
                            //use dom manipulation to append to page
                        }
                    }

                    // for (i = 0; i < 37; i + 4) {
                    // console.log[data.list[i]]
                    // }
                    // var dayOne = data.list[4];
                    // var dayTwo = data.list[12];
                    // var dayThree = data.list[20];
                    // var dayFour = data.list[28];
                    // var dayFive = data.list[36];
                    // console.log(dayOne.dt_txt);
                    // console.log(dayOne.clouds);
                    // console.log(dayOne.main.temp);
                    // console.log(dayOne.main.humidity);
                    // console.log(dayTwo);

                })

        });
    // 

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
//NEED DIFF ENDPOINT: find UV index
//EASY: add today's date with moment.JS
//MEDIUM: fix formatting 
//MEDIUM: append search results to buttons that will run getWeather when clicked
//HARD: append 5 day forecast info to cards and format appropriately with icons for temp
//ANNOYING: color code UV index

//QUESTIONS:
//How do you get those icons on the five day forecast?
//need a second look: Why is atlanta below?

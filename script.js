var searchForm = $("#search-form");
var searchTermEl = $("#search-term");
var cities = [];

searchForm.on("submit", function (event) {
    event.preventDefault();
    //Grab the search term out of the input.
    var searchTerm = searchTermEl.val();
    // var storageArray = JSON.parse(localStorage.getItem("citiesArray"));
    // for (i = 0; i < storageArray.length; i++) {
    //     console.log(storageArray[i])
    //     if (storageArray[i].toLowerCase() === searchTerm.toLowerCase()) {
    //         console.log("found city");
    //         return;
    //         //write alert "city already entered" in a <p> 
    //     }
    // }
    cities.push(searchTerm);
    localStorage.setItem("citiesArray", JSON.stringify(cities));
    //.val allows you to pull info from form input
    console.log(searchTerm);
    getWeather(searchTerm);
})

function getWeather(city) {
    //store the API key in a variable
    var apiKey = "32529dfed4bea5888fb05111a3006541";
    //build the API URL with search term and API key for local weather
    var localURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    //Make an API call using fetch
    fetch(localURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
    //convert the response from JSON
    //start by console logging the data
}


function getStorage() {
    if (localStorage.getItem("citiesArray")) {
        cities = JSON.parse(localStorage.getItem("citiesArray"))
        //loop through and append to a button for each city
        console.log(cities);
    }
}

getStorage();
var searchForm = $("#search-form");
var searchTermEl = $("#search-term");

searchForm.on("submit", function (event) {
    event.preventDefault();
    //Grab the search term out of the input.
    var searchTerm = searchTermEl.val();
    //.val allows you to pull info from form input
    console.log(searchTerm);
    //store the API key in a variable
    var apiKey = "32529dfed4bea5888fb05111a3006541";
    //build the API URL with search term and API key
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + apiKey;
    //Make an API call using fetch
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
    //convert the response from JSON
    //start by console logging the data
})
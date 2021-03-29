var searchForm = $("#search-form");
var searchTermEl = $("#search-term");

searchForm.on("submit", function(event) {
    event.preventDefault();
    //Grab the search term out of the input.
    var searchTerm = searchTermEl.val();
    console.log(searchTerm);
    //build the API URL with search term and API key
    //store the API key in a variable
    //Make an API call using fetch
    //convert the response from JSON
    //start by console logging the data
})
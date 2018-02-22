// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#searchDate");
var $cityInput = document.querySelector("#searchCity");
var $stateInput = document.querySelector("#searchState");
var $countryInput = document.querySelector("#searchCountry");
var $shapeInput = document.querySelector("#searchShape");
var $searchBtn = document.querySelector("#search");

var startingIndex = 0;
var resultsPerPage = 50;

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredDataSet to dataSet initially
var filteredDataSet = dataSet;

// renderTable renders the filteredDataSet to the tbody
function renderTable() {
    $tbody.innerHTML = "";
    for (var i = 0; i < filteredDataSet.length; i++) {

        var endingIndex = startingIndex + resultsPerPage;
        
        var sightingSubset = dataSet.slice(startingIndex, endingIndex);

        for (var i = 0; i < sightingSubset.length; i++) {

        // Get get the current sighting object and its fields
        var sighting = filteredDataSet[i];
        var fields = Object.keys(sighting);
        // Create a new row in the tbody, set the index to be i + startingIndex
        var $row = $tbody.insertRow(i);
        for (var j = 0; j < fields.length; j++) {
            // For every field in the address object, create a new cell at set its inner text to be the current value at the current sighting's field
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = sighting[field];
        }
    }
}}

function handleSearchButtonClick() {

    startingIndex += resultsPerPage;
    renderTable();
     
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterDateTime = $datetimeInput.value.trim().toLowerCase();
    var filterCity = $cityInput.value.trim().toLowerCase();
    var filterState = $stateInput.value.trim().toLowerCase();
    var filterCountry = $countryInput.value.trim().toLowerCase();
    var filterShape = $shapeInput.value.trim().toLowerCase();

    // Set filteredDataSet to an array of all addresses whose "datetime" matches the filter
    filterDateTime = dataSet.filter(function (sighting) {
        var newDateTime = sighting.datetime.toLowerCase();
        var newCity = sighting.city.toLowerCase();
        var newState = sighting.state.toLowerCase();
        var newCountry = sighting.country.toLowerCase();
        var newShape = sighting.shape.toLowerCase();
        if (newDateTime === filterDateTime && 
            newCity === filterCity && 
            newState === filterState &&
            newCountry === filterCountry &&
            newShape === filterShape ) {
                return true;
            }
            return false;
        });
    renderTable();
}

// Render the table for the first time on page load
renderTable();

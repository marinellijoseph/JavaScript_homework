// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredDataSet to dataSet initially
var filteredDataSet = dataSet;

// renderTable renders the filteredDataSet to the tbody
function renderTable() {
    $tbody.innerHTML = "";
    for (var i = 0; i < filteredDataSet.length; i++) {
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
}

function handleSearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterDateTime = $datetimeInput.value.trim().toLowerCase();

    // Set filteredDataSet to an array of all addresses whose "datetime" matches the filter
    filterDateTime = dataSet.filter(function (sighting) {
        var newDateTime = sighting.datetime.toLowerCase();

        // If true, add the sighting to the filteredDataSet, otherwise don't add it to filteredDataSet
        return newDateTime === filterDateTime;
    });
    renderTable();
}

// Render the table for the first time on page load
renderTable();

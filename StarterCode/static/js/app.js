// from data.js
var tableData = data;

// YOUR CODE HERE!
// Use D3 to select the table
const table = d3.select("table");
table.attr("class", "table table-striped");
let tbody = d3.select("tbody");
console.log(data);
data.forEach(function(ufoSightings) {
    console.log(ufoSightings);
  });
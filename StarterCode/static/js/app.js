// from data.js

var tableData = data;

// YOUR CODE HERE!
// Use D3 to select the table

let tbody = d3.select("tbody");
var $dateTimeInput = document.querySelector("#date_time");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $search = document.querySelector("#search");
var $recordCounter = document.querySelector("#recordCounter");
var $pages = document.querySelector("#pages");
var $load = document.querySelector("#load");
var $next = document.querySelector("#next");
var $prev = document.querySelector("#prev");
 
$search.addEventListener("click", SearchBtnClick);
$load.addEventListener("click", ReloadBtnClick);
$next.addEventListener("click", NextBtnClick);
$prev.addEventListener("click", PrevBtnClick);
$pages.addEventListener("click", PagesBtnClick);

var Data = DataSet;
var count = 0;

function NextBtnClick() {
    count++;
    renderTable();
}

function PrevBtnClick() {
    count--;
    renderTable();
}

function ChangePages() {
    renderTable();
}

function SearchBtnClick() {
    var filterDate = $dateTimeInput.value.trim();
    var filterCity = $cityInput.value.trim().toLowerCase();
    var filterState = $stateInput.value.trim().toLowerCase();
    var filterCountry = $countryInput.value.trim().toLowerCase();
    var filterShape = $shapeInput.value.trim().toLowerCase();
}

if (filterDate !=""){
    Data=Data.filter(function (date){
        var dataDate = date.datetime;
        return dataDate === filterDate
    });
}

if (filterCity != "") {
    Data = Data.filter(function (city) {
    var dataCity = city.city;
    return dataCity === filterCity;
});
}

if (filterState != "") {
    Data = Data.filter(function (state) {
        var dataState = state.state;
        return dataState === filterState;
    });
}

if (filterCountry != "") {
    Data = Data.filter(function (country) {
        var dataCountry = country.country;
        return dataCountry === filterCountry;
    });
}

if (filterShape != "") {
    Data = Data.filter(function (shape) {
        var dataShape = shape.shape;
        return dataShape === filterShape;
    });
}

renderTable();


function ReloadBtnClick() {
    count = 0;
    Data = DataSet;
    $dateTimeInput.value = '';
    $cityInput.value = '';
    $stateInput.value = '';
    $countryInput.value = '';
    $shapeInput.value = '';

    renderTable();
}

function renderTable() {
    $tbody.innerHTML = "";
    var pages = Number(document.getElementById("pages").vlaue);
    var start = count * pages +1;
    var end = count + pages -1;
    var btn;
    if (end > Data.length) {
        end = Data.length;
        btn = document.getElemendById("next");
        btn.disabled = true;
    } else{
        btn = document.getElementById("next");
        btn.disabled = false;
    }
    if (start == 1) {
        btn = document.getElementById("prev");
        btn.disabled = true;
      } else {
        btn = document.getElementById("prev");
        btn.disabled = false;
      }
      $recordCounter.innerText = "From Record: " + start + " to" + end + " of" + Data.length;
      for (var i=0; i < pages; i++){
          var item = Data[i+(count * pages)];
          var fields = Object.keys(item);
          var $row = $tbody.insertRow(i);
          for (var j=0; j < fields.length; j++){
              var field = fields[j];
              var $cell = $row.insertCell(j);
              $cell.innerText = item[field];
          }
      }
}

renderTable();
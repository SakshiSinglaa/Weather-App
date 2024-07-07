var APIKEY = "ffcfd30d179f4f4b9a7184304241706";

var cityInput = document.getElementById("cityInput");
var searchBtn = document.getElementById("searchBtn");

var cityname = document.getElementById("cityname");
var countryname = document.getElementById("countryname");
var temp = document.getElementById("temp");
var loc_time = document.getElementById("loc-time");
var sup = document.getElementById('sup');

async function getData(APIKEY, cityname) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${cityname}&aqi=yes`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

searchBtn.addEventListener('click', async () => {
    const input = cityInput.value;
    document.getElementById('outputCard').style.visibility = 'visible';
    try {
        const result = await getData(APIKEY, input);
        console.log(result);
        if (result.location && result.current) {
            cityname.innerText = `${result.location.name}, ${result.location.region}`;
            countryname.innerText = `${result.location.country}`;
            temp.innerText = `${result.current.temp_c}`;
            sup.innerText = "°C";
            loc_time.innerText = `${result.location.localtime}`;
        } else {
            console.error("Invalid response structure", result);
        }
    } catch (error) {
        console.error("Error fetching data", error);
        alert("An error occurred while fetching the weather data. Please try again.");
    }
});

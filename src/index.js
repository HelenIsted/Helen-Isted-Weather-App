//Location Time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = days[date.getDay()];

  return `${today}  ${hour}:${minute}`;
}
//Search Bar
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".day-time").innerHTML = formatDate(
    response.data.dt * 1000
  );
  celsiusTemp = Math.round(response.data.main.temp);
  document.querySelector("#tempNow").innerHTML = celsiusTemp;
  document.querySelector(".units").innerHTML = "°C";
  document.querySelector("#weatherNow").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#precipitation").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = "ead5bcbff0822544c11251df60c000c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchCurrent(position) {
  let apiKey = "ead5bcbff0822544c11251df60c000c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrent);
}

let currentLocationUser = document.querySelector("#currentLocation");
currentLocationUser.addEventListener("click", findLocation);

//button
let searchButton = document.querySelector("#pressButton");
searchButton.addEventListener("click", cityInput);

search("warrington");

//Celsius

//
let celsiusTemp = null;
function farenheitConvert(event) {
  event.preventDefault();
  let farenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  document.querySelector("#tempNow").innerHTML = `${farenheitTemp}`;
  document.querySelector(".units").innerHTML = "°F";
}
let farenheitButton = document.querySelector("#farenheit");
farenheitButton.addEventListener("click", farenheitConvert);

//

let tempUnit = document.querySelector("#tempNow");
function celsiusConvert(event) {
  event.preventDefault();
  document.querySelector("#tempNow").innerHTML = `${celsiusTemp}`;
  document.querySelector(".units").innerHTML = "°C";
}
let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", celsiusConvert);

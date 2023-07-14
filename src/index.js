//Correct Day and Time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}
let currentTime = `${today}  ${hour}:${minute}`;
let currentDate = document.querySelector(".day-time");
currentDate.innerHTML = `${currentTime}`;

//Search Bar
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tempNow").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weatherNow").innerHTML =
    response.data.weather[0].main;
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

let celsiusTemp = 23;
let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
farenheitTemp = Math.round(farenheitTemp);
let tempUnit = document.querySelector(".temperature");
function celsius(event) {
  event.preventDefault();
  tempUnit.innerHTML = `${celsiusTemp}°C`;
}
let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", celsius);
//
function farenheit(event) {
  event.preventDefault();
  tempUnit.innerHTML = `${farenheitTemp}°F`;
}
let farenheitButton = document.querySelector("#farenheit");
farenheitButton.addEventListener("click", farenheit);

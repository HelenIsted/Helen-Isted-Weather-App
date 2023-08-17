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
//forecast

function showForecast(response) {
  console.log(response.data.daily);
  let forecastHTML = `<div class="row">`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col mon">
              <div class="day">${day}</div>
              <img
                src="https://dictionary.cambridge.org/images/thumb/circle_noun_001_02738.jpg?version=5.0.332"
                alt="weather"
                width="48"
              />
              <div class="temp mon-temp">
                <span class="mon-high high">10</span>
                <span class="mon-low">5</span>
              </div>
            </div>`;
  });

  let showForecast = document.querySelector("#forecast");
  showForecast.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "41aob4b0d9c63f894f5ae29a4ce68ta0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
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
  getForecast(response.data.coord);
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
function fahrenheitConvert(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  document.querySelector("#tempNow").innerHTML = `${fahrenheitTemp}`;
  document.querySelector(".units").innerHTML = "°F";
}
let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", fahrenheitConvert);

//

let tempUnit = document.querySelector("#tempNow");
function celsiusConvert(event) {
  event.preventDefault();
  document.querySelector("#tempNow").innerHTML = `${celsiusTemp}`;
  document.querySelector(".units").innerHTML = "°C";
}
let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", celsiusConvert);

//

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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function showForecast(response) {
  console.log(response.data);
  let forecastHTML = `<div class="row">`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col mon">
              <div class="day">${formatDay(forecastDay.time)}</div>
              <img
                src=${forecastDay.condition.icon_url}
                alt="weather"
                width="48"
              />
              <div class="temp mon-temp">
                <span class="mon-high high">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span>
                <span class="mon-low">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
              </div>
            </div>`;
    }
  });

  let showForecast = document.querySelector("#forecast");
  showForecast.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "41aob4b0d9c63f894f5ae29a4ce68ta0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=41aob4b0d9c63f894f5ae29a4ce68ta0&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
//Search Bar
function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector(".day-time").innerHTML = formatDate(
    response.data.time * 1000
  );
  celsiusTemp = Math.round(response.data.temperature.current);
  document.querySelector("#tempNow").innerHTML = celsiusTemp;
  document.querySelector(".units").innerHTML = "°C";
  document.querySelector("#weatherNow").innerHTML =
    response.data.condition.description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#pressure").innerHTML =
    response.data.temperature.pressure;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "41aob4b0d9c63f894f5ae29a4ce68ta0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchCurrent(position) {
  let apiKey = "41aob4b0d9c63f894f5ae29a4ce68ta0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coordinates.latitude}&lon=${position.coordinates.longitude}&key=${apiKey}&units=metric`;
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

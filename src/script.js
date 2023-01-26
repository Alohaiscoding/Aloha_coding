let now = new Date();
let day = now.getDate();
let month = now.getMonth() + 1;
let year = now.getFullYear();
let hour = now.getHours();
let minute = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}
let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${month}/${day}/${year} ${hour}:${minute}`;

function displayWeatherCondition(response) {
  document.querySelector(".heading").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "49002f3131c4a8bda1d6a4fbf7c3bcf0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-enter-city").value;
  searchCity(city);
}
function currentPosition(position) {
  let apiKey = "49002f3131c4a8bda1d6a4fbf7c3bcf0";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let showCurrentPosition = document.querySelector("#latitude-longtitude");
  showCurrentPosition.innerHTML = `Latitude: ${lat} Longtitude:${lon}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function showGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let currentLocate = document.querySelector("#currentBtn");
currentLocate.addEventListener("click", showGeoLocation);

let searchForm = document.querySelector("#entercity");
searchForm.addEventListener("submit", search);

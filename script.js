const searchEl = document.querySelector(".search-container");
const inputEl = document.getElementById("city_name");
const cityName = document.getElementById("weather-city");
const dataTimeEl = document.getElementById("weather-date--time");
const w_forecastEl = document.getElementById("weather-forecast");
const w_iconEl = document.querySelector(".weather-icon");
const W_tempEL = document.querySelector(".temperature");
const minEL = document.getElementById("min");
const maxEl = document.getElementById("max");
const FeelLikeEl = document.querySelector(".weather_feelsLike");
const w_humidityEl = document.querySelector(".weather_humidity");
const w_WindsEl = document.querySelector(".weather_winds");
const w_pressure = document.querySelector(".weather_pressure");

const getCountryCode = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

let city = "kannauj";
searchEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = inputEl.value;
  console.log(name);
  city = name;
  getWeatherData();
  inputEl.value = "";
});

const getDateTime = (dt) => {
  const currentDate = new Date(dt * 1000);
  console.log(currentDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  console.log(formatter);
  return formatter.format(currentDate);
};

//
const getWeatherData = async (name) => {
  const api_key = "213e4a185f3d5454846627a8c2753b12";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=213e4a185f3d5454846627a8c2753b12`;

  try {
    const res = await fetch(url);
    const data = await res.json(res);
    console.log(data);

    const { main, name, sys, weather, dt, visibility, wind } = data;
    cityName.innerHTML = `${name},${getCountryCode(sys.country)}`;

    w_forecastEl.innerHTML = weather[0].main;
    w_iconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`;
    dataTimeEl.innerHTML = getDateTime(dt);
    W_tempEL.innerHTML = (main.temp - 273.15).toFixed(0);
    minEL.innerHTML = (main.temp_min - 273.15).toFixed(0);
    maxEl.innerHTML = (main.temp_max - 273.15).toFixed(0);
    FeelLikeEl.innerHTML = `${(main.feels_like - 273.15).toFixed()}&#176`;
    w_humidityEl.innerHTML = `${main.humidity}%`;
    w_WindsEl.innerHTML = ` ${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load", getWeatherData());

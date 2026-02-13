import {
  setSunInfo,
  updateWindDirection,
  calculateSunPosition,
  updateSunPosition,
} from "../helpers/index.js";
const currentCity = document.querySelector(".city");
const currentTemperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels");
const currentDescription = document.querySelector(".description");
const currentWeatherIcon = document.querySelector(".weather-icon img");
const currentWind = document.querySelector(".wind");
const currentVisibility = document.querySelector(".visibility");
const currentHumidity = document.querySelector(".humidity");
const currentPressure = document.querySelector(".pressure");
const humidityScaleParameter = document.querySelector(".parameter");

export const renderCurrentWeather = (weatherData, city) => {
  currentCity.textContent = city || "Неизвестно";

  currentTemperature.textContent = `${Math.floor(weatherData.main?.temp) || 0}°C`;

  feelsLike.textContent = `Ощущается как : ${Math.floor(weatherData.main?.feels_like) || 0}°C`;

  currentDescription.textContent =
    `${weatherData.weather[0].description}` || "Неизвестно";

  currentWeatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather?.[0]?.icon || "o1d"}.png`;

  currentWind.textContent = `${Math.round(weatherData.wind.speed)} м/c`;

  currentVisibility.textContent = `${(weatherData.visibility || 0) / 1000} км`;

  currentHumidity.textContent = `${weatherData.main?.humidity || 0}%`;

  currentPressure.textContent = `${Math.round((weatherData.main?.pressure || 0) * 0.750062)} мм рт.ст.`;

  humidityScaleParameter.style.width = `${weatherData.main?.humidity || 0}%`;
  updateWindDirection(weatherData.wind.deg);
  setSunInfo(
    weatherData.sys.sunrise,
    weatherData.sys.sunset,
    weatherData.timezone,
  );
  const sunPosition = calculateSunPosition(
    weatherData.sys.sunrise,
    weatherData.sys.sunset,
  );
  updateSunPosition(sunPosition);
  console.log(weatherData);
};

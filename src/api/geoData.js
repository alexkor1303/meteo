import { baseUrl, apikey } from "./ApiKeyAndHost.js";
import { getWeatherData, getForecastData } from "./getWeatherAndForecast.js";
import {
  cityInput,
  showError,
  renderCurrentWeather,
} from "../components/index.js";
import {
  isCyrillic,
  replaceAbbreviation,
  saveCityToLocalStorage,
} from "../helpers/index.js";

export async function getGeoData() {
  let cityName = cityInput.value.trim();
  if (!cityName) {
    return;
  }
  if (!isCyrillic(cityName)) {
    showError("Проверьте название города");
    return;
  }
  cityName = replaceAbbreviation(cityName);
  try {
    const geoUrl = `${baseUrl}/geo/1.0/direct`;
    const queryParams = new URLSearchParams({
      q: cityName,
      limit: 1,
      appid: apikey,
    });
    const response = await fetch(`${geoUrl}?${queryParams.toString()}`);
    const data = await response.json();
    if (!response.ok || !data.length) {
      throw new Error(`Город не найден, статус ответа : ${response.status}`);
    }
    const { lon, lat } = data[0];
    saveCityToLocalStorage(cityName);
   
    const weatherData = await getWeatherData(lat, lon);
    const forecastData = await getForecastData(lat, lon);
    renderCurrentWeather(weatherData, cityName);
  } catch (error) {
    showError(`Данные не получены`);
    console.error(`Ошибка при получении геопозиции города : ${error.message}`);
  }
}

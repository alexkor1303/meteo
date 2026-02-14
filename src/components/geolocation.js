import { apikey, baseUrl } from "../api/ApiKeyAndHost.js";
import {
  getWeatherData,
  getForecastData,
} from "../api/getWeatherAndForecast.js";
import {
  renderCurrentWeather,
  renderHourlyForecast,
  renderDailyForecast,
  showError,
} from "./index.js";

export const geolocation = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      //Получаем данные о широте и долготе
      const { latitude, longitude } = await getBrowserGeolocation();
      //Получаем название населенного пункта
      const locationName = await geolocationName(latitude, longitude);
      //Проброс данных для получения прогноза,рендеринг
      await fetchWeatherByCoords(latitude, longitude, locationName);
      console.log(latitude, longitude);
    } catch (error) {
      console.error(`Ошибка при получении геолокации : ${error.message}`);
    }
  });
};

function getBrowserGeolocation() {
  return new Promise((res, rej) => {
    if (!navigator.geolocation) {
      rej(new Error("Геолокация не поддерживается браузером"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          res({ latitude, longitude });
        },
        (error) => {
          rej(error);
        },
      );
    }
  });
}

async function geolocationName(lat, lon) {
  const reverseGeocodingUrl = new URL(`${baseUrl}/geo/1.0/reverse`);
  const queryParams = new URLSearchParams({
    lat,
    lon,
    limit: 1,
    appid: apikey,
  });
  const url = `${reverseGeocodingUrl}?${queryParams.toString()}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.length > 0) {
      const { localNames } = data[0];
      const russianName = localNames?.ru || data[0].name;
      return `${russianName}`;
    } else {
      throw new Error("Название места не найдено");
    }
  } catch (error) {
    console.error(`Ошибка при получении названия места : ${error.message}`);
    showError("Не смогли определить ваше местоположение");
  }
}

const fetchWeatherByCoords = async (lat, long, locationName) => {
  try {
    const weatherData = await getWeatherData(lat, long);
    const forecastData = await getForecastData(lat, long);
    renderCurrentWeather(weatherData, locationName);
    renderHourlyForecast(forecastData);
    renderDailyForecast(forecastData);
  } catch (error) {
    console.error(error.message);
    showError("Не удалось получить данные о погоде");
  }
};

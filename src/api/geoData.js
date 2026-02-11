import { baseUrl, apikey } from "./ApiKeyAndHost.js";
import { cityInput, showError } from "../components/index.js";
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
  console.log(cityName);
  try {
    const geoUrl = `${baseUrl}/geo/1.0/direct`;
    const queryParams = new URLSearchParams({
      q: cityName,
      limit: 1,
      appid: apikey,
    });
    const response = await fetch(`${geoUrl}?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error(`Город не найден, статус ответа :${response.status}`);
    }
    const data = await response.json();
    const { lon, lat } = data[0];
    saveCityToLocalStorage(cityName);
    console.log(lon, lat);
  } catch (error) {
    showError(`Данные не получены`);
    console.error(`Ошибка при получении геопозиции города : ${error.message}`);
  } finally {
    cityInput.value = "";
  }
}

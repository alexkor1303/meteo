import { baseUrl, apikey } from "./ApiKeyAndHost.js";

export const getWeatherData = async (lat, lon) => {
  return fetchData("weather", lat, lon);
};
export const getForecastData = async (lat, lon) => {
  return fetchData("forecast", lat, lon);
};

async function fetchData(endpoint, lat, lon) {
  const queryParams = new URLSearchParams({
    lat,
    lon,
    appid: apikey,
    lang: "ru",
    units: "metric",
  });
  const requestUrl = `${baseUrl}/data/2.5/${endpoint}?${queryParams.toString()}`;
  try {
    const response = await fetch(requestUrl);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        `Ошибка при получении погоды, статус ответа : ${response.status}`,
      );
    }
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

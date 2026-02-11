import { getGeoData } from "./src/api/geoData.js";
import { getWeatherByForm } from "./src/components/weatherForm.js";
import { switchTheme } from "./src/components/switchTheme.js";
export function initApp() {
  switchTheme();
  getWeatherByForm();
  // getGeoData();
}

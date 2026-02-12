import { getGeoData } from "./src/api/geoData.js";
import { switchTheme, getWeatherByForm } from "./src/components/index.js";

export function initApp() {
  switchTheme();
  getWeatherByForm();
  // getGeoData();
}

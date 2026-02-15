import { getGeoData } from "./api/geoData.js";
import {
  switchTheme,
  getWeatherByForm,
  geolocation,
  scrollToTop,
} from "./components/index.js";
import { renderCurrentTime } from "./helpers/index.js";

export function initApp() {
  switchTheme();
  getGeoData();
  getWeatherByForm();
  renderCurrentTime();
  geolocation();
  scrollToTop();
}

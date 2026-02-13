import { getGeoData } from "./src/api/geoData.js";
import {
  switchTheme,
  getWeatherByForm,
  geolocation,
  scrollToTop,
} from "./src/components/index.js";
import { renderCurrentTime } from "./src/helpers/index.js";

export function initApp() {
  switchTheme();
  getGeoData();
  getWeatherByForm();
  renderCurrentTime();
  geolocation();
  scrollToTop();
}

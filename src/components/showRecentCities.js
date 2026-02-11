import { getGeoData } from "../api/geoData.js";
import { cityInput } from "./index.js";

const recentCitiesList = document.getElementById("recent-cities-list");
cityInput.addEventListener("blur", (e) => {
  if (e.target !== cityInput && e.target !== recentCitiesList) {
    recentCitiesList.style.display = "none";
  }
});

export const showRecentCities = () => {
  recentCitiesList.innerHTML = "";
  const cities = JSON.parse(localStorage.getItem("recentCities"));
  if (!cities) {
    return;
  }
  cities.forEach((city) => {
    const liElem = document.createElement("li");
    liElem.textContent = city;
    liElem.addEventListener("click", (e) => {
      e.preventDefault();
      cityInput.value = city;
      recentCitiesList.style.display = "none";
      getGeoData();
    });
    recentCitiesList.append(liElem);
  });
  recentCitiesList.style.display = "block";
};

import { getGeoData } from "../api/geoData.js";
import { cityInput } from "./index.js";

const recentCitiesList = document.getElementById("recent-cities-list");

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

cityInput.addEventListener("blur", () => {
  setTimeout(() => {
    recentCitiesList.style.display = "none";
  }, 150);

  cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getGeoData();
      recentCitiesList.style.display = "none";
    }
  });
});

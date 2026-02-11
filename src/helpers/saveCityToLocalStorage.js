export const saveCityToLocalStorage = (cityName) => {
  const capitalaizedCity = cityName[0].toUpperCase() + cityName.slice(1);
  const cities = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (!cities.includes(capitalaizedCity)) {
    cities.unshift(capitalaizedCity);
    if (cities.length > 5) {
      cities.pop();
    }
    localStorage.setItem("recentCities", JSON.stringify(cities));
  }
};

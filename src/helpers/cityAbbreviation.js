export const replaceAbbreviation = (cityName) => {
  const lowerCaseCity = cityName.toLowerCase();
  if (cityAbbreviation[lowerCaseCity]) {
    return cityAbbreviation[lowerCaseCity];
  }
  return lowerCaseCity;
};

const cityAbbreviation = {
  мск: "Москва",
  спб: "Санкт-Петербург",
  питер: "Санкт-Петербург",
  нск: "Новосибирск",
};

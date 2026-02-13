export const replaceAbbreviation = (cityName) => {
  const lowerCaseCity = cityName.toLowerCase();
  const capitalaizedCity =
    lowerCaseCity[0].toUpperCase() + cityName.slice(1).toLowerCase();

  if (cityAbbreviation[lowerCaseCity]) {
    return cityAbbreviation[lowerCaseCity];
  }
  return capitalaizedCity;
};

const cityAbbreviation = {
  мск: "Москва",
  спб: "Санкт-Петербург",
  питер: "Санкт-Петербург",
  нск: "Новосибирск",
};

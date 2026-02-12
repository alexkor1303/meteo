export const setSunInfo = (sunrise, sunset, timezone) => {
  const currentSunriseTime = document.querySelector(".sun-time.sunrise");
  const currentSunsetTime = document.querySelector(".sun-time.sunset");
  const currentDayLength = document.querySelector(".day-length");
  if (!sunrise || !sunset) {
    return null;
  }

  function formatTime(timeStamp) {
    return new Date((timeStamp + timezone) * 1000).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  }
  const dayLengthInSeconds = sunset - sunrise;
  const hours = Math.floor(dayLengthInSeconds / 3600);
  const minutes = Math.floor((dayLengthInSeconds % 3600) / 60);
  const dayLength = `Долгота дня ${hours} час ${minutes} мин`;
  currentSunriseTime.textContent = formatTime(sunrise) || "--:--";
  currentSunsetTime.textContent = formatTime(sunset) || "--:--";
  currentDayLength.textContent = dayLength;
};

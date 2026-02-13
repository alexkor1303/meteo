const weekDay = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];
const Month = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Ноября",
  "Декабря",
];

export const renderCurrentTime = () => {
  const nowTimeElem = document.querySelector(".now");
  const currentTime = new Date();
  const currentWeekDay = weekDay[currentTime.getDay()];
  const currentMonthDay = currentTime.getDate();
  const currentMonth = Month[currentTime.getMonth()];
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  nowTimeElem.textContent = `Сейчас : ${currentWeekDay}, ${currentMonthDay}  ${currentMonth} ${currentHours} : ${currentMinutes} `;
};

setInterval(renderCurrentTime, 60000);

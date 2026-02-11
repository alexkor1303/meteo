import { cityInput, showError } from "../components/index.js";

export const isCyrillic = (text) => {
  const cityRegex = /^[А-Яа-яЁё\s-]+$/;
  return cityRegex.test(text);
};

cityInput.addEventListener("input", () => {
  const inputValue = cityInput.value;
  if (!isCyrillic(inputValue) && inputValue.length > 1) {
    showError("Поле ввода должно содержать только кириллические символы");
  } else {
    showError("");
  }
});

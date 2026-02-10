export function switchTheme() {
  let userThemeChoose = false;
  //Проверяем локалсторадж
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const themeByBrowser = getThemeByBrowserSetting();
    if (themeByBrowser === "dark") {
      setTheme("dark");
    } else {
      const themeByTime = getThemeByTime();
      setTheme(themeByTime);
    }
  }

  const themeSwitcher = document.getElementById("themeSwitch");
  themeSwitcher.addEventListener("change", () => {
    toggleTheme();
  });

  function toggleTheme() {
    userThemeChoose = true;
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let newTheme;
    if (currentTheme === "dark") {
      newTheme = "light";
    } else {
      newTheme = "dark";
    }
    setTheme(newTheme);
  }

  function getThemeByTime() {
    const currentHours = new Date().getHours();
    return currentHours >= 7 && currentHours < 22 ? "light" : "dark";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (userThemeChoose) {
      localStorage.setItem("theme", theme);
    }
  }
}

function getThemeByBrowserSetting() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  } else {
    return "light";
  }
}

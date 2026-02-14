import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("eslint:recommended", "prettier"), //Эта часть кода отвечает за заранее заготовленный набор правил
  //prettier говорит об интеграции двух инструментов
  {
    plugins: {
      prettier, // prettier как отдельный плагин ESLint'а
    },

    languageOptions: {
      globals: {
        //Список глобальных переменных доступных в нашем коде
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 2021, //Последняя версия ES в которую будет исправляться наш код
      sourceType: "module", //Модульная система
    },

    rules: {
      //Перечисляется то что мы будем проверять
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      camelcase: ["error"], //если функция не пишется в camelCase то линтер считает это ошибкой
      eqeqeq: ["error", "always"], // == тоже как ошибка
    },
    ignores: [
      //Пакеты которые не должны проверятся
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/*.config.js",
      "!src/**",
    ],
  },
];

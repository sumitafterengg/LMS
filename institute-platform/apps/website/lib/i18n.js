import en from "../locales/en.json";
import ar from "../locales/ar.json";

const dictionaries = { en, ar };

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries.en;
}

export function t(dict, path) {
  return path.split(".").reduce((obj, key) => obj?.[key], dict) || path;
}

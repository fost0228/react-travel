import i18n from "i18next";
import { CHANGE_LANGUAGE, LanguageActionTypes } from "./languageActions";

export interface LanguageState {
  language: "en" | "zh";
  languageList: { name: string; code: string }[];
}

const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en" },
  ],
};

export default (state = defaultState, action: LanguageActionTypes) => {
  // switch(action.type){
  //     case "change_language":
  //     case "change_language":

  // }

  // if (action.type === "CHANGE_LANGUAGE") {
  //   i18n.changeLanguage(action.payload);
  //   const newState = { ...state, language: action.payload };
  //   return newState;
  // }
  // return state;

  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.payload);
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

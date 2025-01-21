import { oneDark } from "@codemirror/theme-one-dark";
import { basicLight } from "@uiw/codemirror-theme-basic";
import { xcodeLight, xcodeDark } from '@uiw/codemirror-theme-xcode';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { solarizedLight, solarizedDark } from '@uiw/codemirror-theme-solarized';

export const THEMES = {
  oneDark,
  basicLight,
  xcodeLight,
  xcodeDark,
  darcula,
  solarizedLight,
  solarizedDark,
};

export const getTheme = (themeName) => {
  return THEMES[themeName] || oneDark; 
};
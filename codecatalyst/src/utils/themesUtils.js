import { oneDark } from "@codemirror/theme-one-dark";
import { xcodeLight, xcodeDark } from '@uiw/codemirror-theme-xcode';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { solarizedLight, solarizedDark } from '@uiw/codemirror-theme-solarized';
import { aura, auraInit } from '@uiw/codemirror-theme-aura';
import { githubLight, githubLightInit, githubDark, githubDarkInit } from '@uiw/codemirror-theme-github';
import { vscodeDark, vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { vscodeLight, vscodeLightInit } from '@uiw/codemirror-theme-vscode';


export const THEMES = {
  oneDark,
  aura,
  darcula,
  githubDark,
  xcodeDark,
  solarizedDark,
  vscodeDark,
  vscodeLight,
  xcodeLight,
  githubLight,
  solarizedLight,
};

export const getTheme = (themeName) => {
  return THEMES[themeName] || oneDark; 
};
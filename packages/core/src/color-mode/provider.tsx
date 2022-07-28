import { createEffect, createSignal } from "solid-js";

import { ColorModeContext } from "./context";
import { ColorMode, ColorModeContextValue, ColorModeProviderProps } from "./types";
import {
  getInitialColorMode,
  getSystemColorMode,
  removeColorModeFromLocalStorage,
  saveColorModeToLocalStorage,
  toggleDocumentDarkModeClass,
} from "./utils";

/** Provides context for the color mode. */
export function ColorModeProvider(props: ColorModeProviderProps) {
  const [colorMode, rawSetColorMode] = createSignal(getInitialColorMode(props.initialColorMode));

  const setColorMode = (value: ColorMode) => {
    if (value === "system") {
      rawSetColorMode(getSystemColorMode());
      removeColorModeFromLocalStorage();
      return;
    }

    rawSetColorMode(value);
    saveColorModeToLocalStorage(value);
  };

  const toggleColorMode = () => {
    setColorMode(colorMode() === "dark" ? "light" : "dark");
  };

  createEffect(() => toggleDocumentDarkModeClass(colorMode()));

  const context: ColorModeContextValue = {
    colorMode,
    setColorMode,
    toggleColorMode,
  };

  return <ColorModeContext.Provider value={context}>{props.children}</ColorModeContext.Provider>;
}

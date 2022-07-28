import { createContext, createMemo, useContext } from "solid-js";

import { ColorModeContextValue } from "./types";

export const ColorModeContext = createContext<ColorModeContextValue>();

/**
 * Primitive that reads from `ColorModeProvider` context.
 * @returns An accessor for the color mode and function to toggle it.
 */
export function useColorMode() {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error("[hope-ui]: useColorMode must be used within a ColorModeProvider");
  }

  return context;
}

/**
 * Change value based on color mode.
 *
 * @param lightValue The light mode value
 * @param darkValue The dark mode value
 * @return A memoized value based on the color mode.
 */
export function useColorModeValue<T = any>(lightValue: T, darkValue: T) {
  const { colorMode } = useColorMode();

  return createMemo(() => (colorMode() === "dark" ? darkValue : lightValue));
}

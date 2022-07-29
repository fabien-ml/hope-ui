import { Accessor, ParentProps } from "solid-js";

export type ColorMode = "light" | "dark";

export type ConfigColorMode = ColorMode | "system";

export type MaybeColorMode = ColorMode | undefined;

export interface StorageManager {
  type: "cookie" | "localStorage";
  ssr?: boolean;
  get: (fallbackValue?: ColorMode) => MaybeColorMode;
  set: (value: ConfigColorMode) => void;
}

export interface ColorModeContextType {
  colorMode: Accessor<ColorMode>;
  setColorMode: (value: ConfigColorMode) => void;
  toggleColorMode: () => void;
}

export interface ColorModeOptions {
  initialColorMode?: ConfigColorMode;
  useSystemColorMode?: boolean;
  disableTransitionOnChange?: boolean;
}

export interface ColorModeProviderProps extends ParentProps {
  options?: ColorModeOptions;
  colorModeManager?: StorageManager;
}

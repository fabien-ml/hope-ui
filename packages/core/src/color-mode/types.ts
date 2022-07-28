import { Accessor, ParentProps } from "solid-js";

export type RawColorMode = "light" | "dark";
export type ColorMode = RawColorMode | "system";

export interface ColorModeContextValue {
  colorMode: Accessor<RawColorMode>;
  setColorMode: (value: ColorMode) => void;
  toggleColorMode: () => void;
}

export interface ColorModeProviderProps extends ParentProps {
  /**
   * The default color mode used in the application.
   * If not provided, it will be determined by system preference.
   */
  initialColorMode?: ColorMode;
}

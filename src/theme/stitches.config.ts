import { createStitches, defaultThemeMap } from "@stitches/core";

import { media } from "./media";
import { defaulThemeTokens } from "./tokens";
import { utils } from "./utils";

export const { css, globalCss, keyframes, theme, createTheme, getCssText, config } = createStitches(
  {
    prefix: "hope",
    themeMap: defaultThemeMap,
    theme: defaulThemeTokens,
    media,
    utils,
  }
);
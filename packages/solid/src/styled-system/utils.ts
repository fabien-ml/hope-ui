import { merge } from "lodash-es";

import { colorModeClassNames } from "../color-mode";
import { isObject } from "../utils/assertion";
import { baseTheme, createTheme, css } from "./stitches.config";
import { StyleProps } from "./system";
import { baseDarkThemeTokens } from "./tokens";
import {
  ResponsiveValue,
  StitchesThemeConfig,
  SystemMediaCssSelector,
  SystemStyleObject,
} from "./types";

/**
 * Merge a source SystemStyleObject to both normal and responsive destination SystemStyleObject.
 * This function mutate the `destination` objects.
 */
function mergeStyleObject(
  sourceStyleObject: SystemStyleObject,
  destStyleObject: SystemStyleObject,
  destResponsiveStyleObject: Record<SystemMediaCssSelector, SystemStyleObject>
) {
  Object.entries(sourceStyleObject).forEach(([key, value]) => {
    if (isObject(value)) {
      if (key in destResponsiveStyleObject) {
        // entry is a responsive css rule (ex: '@sm': {})
        const atMediaRule = key as SystemMediaCssSelector;

        destResponsiveStyleObject[atMediaRule] = {
          ...destResponsiveStyleObject[atMediaRule],
          ...value,
        };
      } else {
        // entry is a normal css rule (ex: `.my-class: {}`, `&:hover: {}` or `_hover: {}`)
        destStyleObject[key] = {
          ...(destStyleObject[key] as SystemStyleObject),
          ...value,
        };
      }
    } else {
      // entry is a normal css property declaration (ex: `color: value`)
      destStyleObject[key] = value;
    }
  });
}

/**
 * Return a valid Stitches CSS object based on the given style props.
 * `baseStyles` objects should be declared in the order of desired style override.
 */
export function toCssObject(
  props: StyleProps,
  baseStyles?: Array<SystemStyleObject | undefined>
): SystemStyleObject {
  /**
   * Destination object containing all non-responsive styles.
   */
  const destStyleObject: SystemStyleObject = {};

  /**
   * Destination object containing all responsive styles grouped by `@media` rule.
   */
  const destResponsiveStyleObject: Record<SystemMediaCssSelector, SystemStyleObject> = {
    "@sm": {},
    "@md": {},
    "@lg": {},
    "@xl": {},
    "@2xl": {},
    "@reduce-motion": {},
    "@light": {},
    "@dark": {},
  };

  // Add content of the `baseStyles` first to ensure css override works correctly.
  baseStyles?.forEach(
    styles => styles && mergeStyleObject(styles, destStyleObject, destResponsiveStyleObject)
  );

  // Add content of the `style props`
  Object.entries(props).forEach(([prop, value]) => {
    // don't add null or undefined style props
    if (value === null || value === undefined) {
      return;
    }

    if (prop === "css") {
      return;
    }

    if (prop.startsWith("_")) {
      // entry is a pseudo prop
      destStyleObject[prop] = value;
    } else if (isObject(value)) {
      // entry is a responsive prop
      Object.keys(value).forEach(key => {
        if (key === "@initial") {
          // `@initial` prop is replaced by the normal css property declaration in the stitches `css` object.
          destStyleObject[prop] = (value as any)[key];
        } else if (key in destResponsiveStyleObject) {
          const atMediaRule = key as SystemMediaCssSelector;

          // group all prop with the same `@media` key in the same object as in the stitches `css` object.
          destResponsiveStyleObject[atMediaRule] = {
            ...destResponsiveStyleObject[atMediaRule],
            [prop]: (value as any)[atMediaRule],
          };
        }
      });
    } else {
      // entry is a normal css property declaration (ex: `color: value`)
      destStyleObject[prop] = value;
    }
  });

  // Add content of the `css` prop last to ensure css override works correctly.
  props.css && mergeStyleObject(props.css, destStyleObject, destResponsiveStyleObject);

  // spread responsive values last to ensure css override works correctly.
  return { ...destStyleObject, ...destResponsiveStyleObject };
}

/**
 * Create new stitches dark or light theme.
 * @return a merged theme object containing the base stitches theme and the override values.
 *
 * @internal
 */
export function extendBaseTheme<T extends StitchesThemeConfig>(
  type: "light" | "dark",
  themeConfig: T
) {
  const isDark = type === "dark";

  const className = isDark ? colorModeClassNames.dark : colorModeClassNames.light;

  // If dark theme, we need to add base dark theme tokens which is not present in the base theme.
  const finalConfig = isDark ? merge({}, baseDarkThemeTokens, themeConfig) : themeConfig;

  const customTheme = createTheme(className, finalConfig);

  return merge({}, baseTheme, customTheme);
}

/**
 * Map a responsive value to a new one
 */
export function mapResponsive(prop: ResponsiveValue<any>, mapper: (val: any) => any) {
  if (isObject(prop)) {
    return Object.keys(prop).reduce((result: Record<string, any>, key) => {
      result[key] = mapper(prop[key]);
      return result;
    }, {});
  }

  if (prop != null) {
    return mapper(prop);
  }

  return null;
}

/**
 * Return the css variable associated with the given token if exists, or the token itself otherwise.
 *
 * @example
 * "$primary9" -> "var(--hope-colors-primary9)"
 * "tomato" -> "tomato"
 */
export function colorTokenToCssVar(token: string): string {
  if (!token.startsWith("$")) {
    return token;
  }

  return `var(--hope-colors-${token.substring(1)})`;
}

/**
 * Visually hide an element without hiding it from screen readers.
 */
export const visuallyHiddenStyles = css({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
});

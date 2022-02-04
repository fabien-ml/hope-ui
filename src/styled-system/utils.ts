/* eslint-disable solid/reactivity */
import { isObject } from "@/utils/assertion";

import { StyleProps } from "./system";
import { SystemMediaCssSelector, SystemStyleObject } from "./types";

/**
 * Return a valid Stitches CSS object based on the given style props
 */
export function toCssObject(props: StyleProps) {
  /**
   * Object containing all non-responsive styles.
   */
  const styleObject: SystemStyleObject = {};

  /**
   * Object containing all responsive styles grouped by `@media` rule.
   */
  const responsiveStyleObject: Record<SystemMediaCssSelector, SystemStyleObject> = {
    "@sm": {},
    "@md": {},
    "@lg": {},
    "@xl": {},
    "@2xl": {},
    "@reduce-motion": {},
    "@light": {},
    "@dark": {},
  };

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
      styleObject[prop] = value;
    } else if (isObject(value)) {
      // entry is a responsive prop
      Object.keys(value).forEach(key => {
        if (key === "@initial") {
          // `@initial` prop is replaced by the normal css property declaration in the stitches `css` object.
          styleObject[prop] = (value as any)[key];
        } else if (key in responsiveStyleObject) {
          const atMediaRule = key as SystemMediaCssSelector;

          // group all prop with the same `@media` key in the same object as in the stitches `css` object.
          responsiveStyleObject[atMediaRule] = {
            ...responsiveStyleObject[atMediaRule],
            [prop]: (value as any)[atMediaRule],
          };
        }
      });
    } else {
      // entry is a normal css property declaration (ex: `color: value`)
      styleObject[prop] = value;
    }
  });

  // Add content of the `css` prop last to ensure css override works correctly.
  props.css &&
    Object.entries(props.css).forEach(([key, value]) => {
      if (isObject(value)) {
        if (key in responsiveStyleObject) {
          // entry is a responsive css rule (ex: '@sm': {})
          const atMediaRule = key as SystemMediaCssSelector;

          responsiveStyleObject[atMediaRule] = {
            ...responsiveStyleObject[atMediaRule],
            ...value,
          };
        } else {
          // entry is a normal css rule (ex: `.my-class: {}`, `&:hover: {}` or `_hover: {}`)
          styleObject[key] = {
            ...(styleObject[key] as SystemStyleObject),
            ...value,
          };
        }
      } else {
        // entry is a normal css property declaration (ex: `color: value`)
        styleObject[key] = value;
      }
    });

  // spread responsive values last
  return { ...styleObject, ...responsiveStyleObject };
}
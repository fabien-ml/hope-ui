import { VariantProps } from "@stitches/core";

import { css } from "@/styled-system/stitches.config";
import { SystemStyleObject } from "@/styled-system/types";

/* -------------------------------------------------------------------------------------------------
 * Tabs
 * -----------------------------------------------------------------------------------------------*/

export const tabsStyles = css({
  variants: {
    orientation: {
      horizontal: {
        display: "block",
      },
      vertical: {
        display: "flex",
      },
    },
  },
});

export type TabsVariants = VariantProps<typeof tabsStyles>;

/* -------------------------------------------------------------------------------------------------
 * TabList
 * -----------------------------------------------------------------------------------------------*/

export const tabListStyles = css({
  display: "flex",

  variants: {
    variant: {
      underline: {
        borderWidth: 0,
        borderStyle: "solid",
        borderColor: "$neutral7",
      },
      outline: {},
      pill: {},
      card: {},
    },
    alignment: {
      start: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      apart: {
        justifyContent: "space-between",
      },
      end: {
        justifyContent: "flex-end",
      },
    },
    orientation: {
      horizontal: {
        flexDirection: "row",
      },
      vertical: {
        flexDirection: "column",
      },
    },
  },
  compoundVariants: [
    {
      variant: "underline",
      orientation: "horizontal",
      css: {
        borderBottomWidth: "2px",
      },
    },
    {
      variant: "underline",
      orientation: "vertical",
      css: {
        borderInlineEndWidth: "2px",
      },
    },
  ],
});

export type TabListVariants = VariantProps<typeof tabListStyles>;

/* -------------------------------------------------------------------------------------------------
 * Tab
 * -----------------------------------------------------------------------------------------------*/

function createUnderlineAndColorVariant(color: string): SystemStyleObject {
  return {
    "&[aria-selected='true']": {
      color,
    },
  };
}

export const tabStyles = css({
  appearance: "none",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  outline: "none",

  border: "$none",
  backgroundColor: "transparent",

  px: "$4",

  transitionProperty: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
  transitionDuration: "250ms",

  "&:focus": {
    zIndex: 1,
    outline: "none",
    boxShadow: "$outline",
  },

  variants: {
    variant: {
      underline: {
        borderWidth: 0,
        borderStyle: "solid",
        borderColor: "transparent",

        "&[aria-selected='true']": {
          borderColor: "currentColor",
        },

        "&:active": {
          backgroundColor: "$neutral4",
        },

        "&:disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
        },
      },
      outline: {},
      pill: {},
      card: {},
    },
    colorScheme: {
      primary: {},
      neutral: {},
      success: {},
      info: {},
      warning: {},
      danger: {},
    },
    size: {
      sm: {
        py: "$1",
        fontSize: "$sm",
      },
      md: {
        py: "$2",
        fontSize: "$base",
      },
      lg: {
        py: "$3",
        fontSize: "$lg",
      },
    },
    orientation: {
      horizontal: {},
      vertical: {},
    },
    fitted: {
      true: {
        flex: 1,
      },
    },
  },
  compoundVariants: [
    /* -------------------------------------------------------------------------------------------------
     * Variant - underline + colorScheme
     * -----------------------------------------------------------------------------------------------*/
    {
      variant: "underline",
      colorScheme: "primary",
      css: createUnderlineAndColorVariant("$primary11"),
    },
    {
      variant: "underline",
      colorScheme: "neutral",
      css: createUnderlineAndColorVariant("$neutral11"),
    },
    {
      variant: "underline",
      colorScheme: "success",
      css: createUnderlineAndColorVariant("$success11"),
    },
    {
      variant: "underline",
      colorScheme: "info",
      css: createUnderlineAndColorVariant("$info11"),
    },
    {
      variant: "underline",
      colorScheme: "warning",
      css: createUnderlineAndColorVariant("$warning11"),
    },
    {
      variant: "underline",
      colorScheme: "danger",
      css: createUnderlineAndColorVariant("$danger11"),
    },

    /* -------------------------------------------------------------------------------------------------
     * Variant - underline + orientation
     * -----------------------------------------------------------------------------------------------*/
    {
      variant: "underline",
      orientation: "horizontal",
      css: {
        borderBottomWidth: "2px",
        marginBottom: "-2px",
      },
    },
    {
      variant: "underline",
      orientation: "vertical",
      css: {
        borderInlineEndWidth: "2px",
        marginInlineEnd: "-2px",
      },
    },
  ],
});

export type TabVariants = VariantProps<typeof tabStyles>;

/* -------------------------------------------------------------------------------------------------
 * TabPanels
 * -----------------------------------------------------------------------------------------------*/

export const tabPanelsStyles = css({
  width: "100%",
});

/* -------------------------------------------------------------------------------------------------
 * TabPanel
 * -----------------------------------------------------------------------------------------------*/

export const tabPanelStyles = css({
  outline: "none",
  padding: "$4",
});

import { JSX, mergeProps, Show, splitProps } from "solid-js";

import { IconSpinner } from "@/icons/IconSpinner";
import { useTheme } from "@/theme/provider";
import { classNames, createCssSelector } from "@/utils/css";

import { Box } from "../box/box";
import { ElementType, HopeComponentProps } from "../types";
import { buttonLoadingIconStyles, buttonStyles, ButtonVariants } from "./button.styles";

export interface ButtonOptions extends ButtonVariants {
  disabled?: boolean;
  loaderPosition?: "left" | "right";
  loader?: JSX.Element;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

export type ThemeableButtonOptions = Pick<
  ButtonOptions,
  "variant" | "colorScheme" | "size" | "loaderPosition"
>;

export type ButtonProps<C extends ElementType> = HopeComponentProps<C, ButtonOptions>;

const hopeButtonClass = "hope-button";

/**
 * The Button component is used to trigger an action or event,
 * such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.
 */
export function Button<C extends ElementType = "button">(props: ButtonProps<C>) {
  const buttonTheme = useTheme().components.Button;

  const defaultProps: ButtonProps<"button"> = {
    as: "button",
    variant: buttonTheme?.defaultProps?.variant ?? "solid",
    colorScheme: buttonTheme?.defaultProps?.colorScheme ?? "primary",
    size: buttonTheme?.defaultProps?.size ?? "md",
    loaderPosition: buttonTheme?.defaultProps?.loaderPosition ?? "left",
    loader: <IconSpinner />,
    loading: false,
    disabled: false,
    type: "button",
    role: "button",
  };

  const propsWithDefault: ButtonProps<"button"> = mergeProps(defaultProps, props);
  const [local, variantProps, others] = splitProps(
    propsWithDefault,
    ["class", "loader", "loaderPosition", "disabled", "leftIcon", "rightIcon", "children"],
    ["variant", "colorScheme", "size", "loading", "compact", "fullWidth"]
  );

  const classes = () => classNames(local.class, hopeButtonClass, buttonStyles(variantProps));

  const loaderClass = buttonLoadingIconStyles();

  const isLeftIconVisible = () => {
    return local.leftIcon && (!variantProps.loading || local.loaderPosition === "right");
  };

  const isRightIconVisible = () => {
    return local.rightIcon && (!variantProps.loading || local.loaderPosition === "left");
  };

  const isLeftLoaderVisible = () => {
    return variantProps.loading && !local.disabled && local.loaderPosition === "left";
  };

  const isRightLoaderVisible = () => {
    return variantProps.loading && !local.disabled && local.loaderPosition === "right";
  };

  const shouldWrapChildrenInSpan = () => {
    return variantProps.loading || local.leftIcon || local.rightIcon;
  };

  return (
    <Box
      class={classes()}
      disabled={local.disabled}
      __baseStyle={buttonTheme?.baseStyle}
      {...others}
    >
      <Show when={isLeftIconVisible()}>{local.leftIcon}</Show>
      <Show when={isLeftLoaderVisible()}>
        <span class={loaderClass}>{local.loader}</span>
      </Show>
      <Show when={local.children}>
        <Show when={shouldWrapChildrenInSpan()} fallback={local.children}>
          <span>{local.children}</span>
        </Show>
      </Show>
      <Show when={isRightIconVisible()}>{local.rightIcon}</Show>
      <Show when={isRightLoaderVisible()}>
        <span class={loaderClass}>{local.loader}</span>
      </Show>
    </Box>
  );
}

Button.toString = () => createCssSelector(hopeButtonClass);
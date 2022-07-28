import { Accessor, JSX } from "solid-js";

export interface ButtonProps {
  /** The visual style of the button. */
  variant?: "solid" | "soft" | "outlined" | "plain";

  /** The color of the button. */
  colorScheme?: "primary" | "neutral" | "success" | "info" | "warning" | "danger";

  /** The size of the button. */
  size?: "xs" | "sm" | "md" | "lg";

  /** The placement of the loader when `isLoading` is true. */
  loaderPlacement?: "start" | "end";

  /** Whether the button should be disabled. */
  isDisabled?: boolean;

  /** Whether the button should take all available width. */
  isFullWidth?: boolean;

  /** Whether the button should show a loading spinner. */
  isLoading?: boolean;

  /** The label to show in the button when `loading` is true. */
  loadingText?: string;

  /** Replace the loader component when `isLoading` is set to `true`. */
  loader?: JSX.Element;

  /**  If added, the button will show an icon before the button's label. */
  leftIcon?: JSX.Element;

  /** If added, the button will show an icon after the button's label. */
  rightIcon?: JSX.Element;

  /** The content of the button. */
  children?: JSX.Element;
}

export interface ButtonLoaderProps {
  /** Whether a loading text should be displayed next to the loader icon. */
  withLoadingText?: boolean;
}

export type ButtonContentProps = Pick<ButtonProps, "leftIcon" | "rightIcon" | "children">;

export interface ButtonGroupProps extends Pick<ButtonProps, "variant" | "colorScheme" | "size"> {
  /** Whether all wrapped button will be disabled. */
  isDisabled?: boolean;
}

export interface ButtonGroupContextValue {
  variant: Accessor<ButtonGroupProps["variant"]>;
  colorScheme: Accessor<ButtonGroupProps["colorScheme"]>;
  size: Accessor<ButtonGroupProps["size"]>;
  isDisabled: Accessor<ButtonGroupProps["isDisabled"]>;
}

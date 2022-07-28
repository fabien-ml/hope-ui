import { clsx } from "clsx";
import { createMemo, mergeProps, Show, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { createComponentWithAs, PropsWithAs } from "../utils/create-component-with-as";
import { withBemModifiers } from "../utils/with-bem-modifiers";
import { useButtonGroupContext } from "./button-group";
import { ButtonIcon } from "./button-icon";
import { ButtonLoader } from "./button-loader";
import { ButtonContentProps, ButtonProps } from "./types";

/**
 * Button is used to trigger an action or event, such as submitting a form,
 * opening a dialog, canceling an action, or performing a delete operation.
 */
export const Button = createComponentWithAs<"button", ButtonProps>(props => {
  //const config = useComponentConfig("Button");
  const config: any = {
    defaultVariants: {
      variant: "outlined",
      colorScheme: "neutral",
      size: "md",
      loaderPlacement: "start",
    },
  };

  const buttonGroupContext = useButtonGroupContext();

  const defaultProps: PropsWithAs<"button", ButtonProps> = {
    as: "button",
    variant: buttonGroupContext?.variant() ?? config.defaultVariants?.variant,
    colorScheme: buttonGroupContext?.colorScheme() ?? config.defaultVariants?.colorScheme,
    size: buttonGroupContext?.size() ?? config.defaultVariants?.size,
    loaderPlacement: config.defaultVariants?.loaderPlacement,
    isDisabled: buttonGroupContext?.isDisabled(),
  };

  // eslint-disable-next-line solid/reactivity
  props = mergeProps(defaultProps, props);

  const [local, others] = splitProps(props, [
    "ref",
    "as",
    "class",
    "children",
    // ButtonOptions
    "isDisabled",
    "isFullWidth",
    "isLoading",
    "loadingText",
    "loader",
    "leftIcon",
    "rightIcon",
    // ButtonVariants
    "variant",
    "colorScheme",
    "size",
    "loaderPlacement",
  ]);

  const isDisabled = () => local.isDisabled ?? buttonGroupContext?.isDisabled() ?? false;

  const classes = createMemo(() => {
    const variant =
      local.variant ?? buttonGroupContext?.variant() ?? config.defaultVariants?.variant;

    const colorScheme =
      local.colorScheme ?? buttonGroupContext?.colorScheme() ?? config.defaultVariants?.colorScheme;

    const size = local.size ?? buttonGroupContext?.size() ?? config.defaultVariants?.size;

    return clsx(
      withBemModifiers("hope-button", [
        variant,
        colorScheme,
        size,
        local.isLoading && "is-loading",
        local.isFullWidth && "is-full-width",
      ]),
      local.class
    );
  });

  return (
    <Dynamic
      ref={local.ref}
      component={local.as}
      class={classes()}
      disabled={isDisabled()}
      {...others}
    >
      <Show when={local.isLoading && local.loaderPlacement === "start"}>
        <ButtonLoader withLoadingText={!!local.loadingText}>{local.loader}</ButtonLoader>
      </Show>

      <Show when={local.isLoading} fallback={<ButtonContent {...local} />}>
        <Show
          when={local.loadingText}
          fallback={
            <span style={{ opacity: 0 }}>
              <ButtonContent {...local} />
            </span>
          }
        >
          {local.loadingText}
        </Show>
      </Show>

      <Show when={local.isLoading && local.loaderPlacement === "end"}>
        <ButtonLoader withLoadingText={!!local.loadingText}>{local.loader}</ButtonLoader>
      </Show>
    </Dynamic>
  );
});

function ButtonContent(props: ButtonContentProps) {
  return (
    <>
      <Show when={props.leftIcon}>
        <ButtonIcon>{props.leftIcon}</ButtonIcon>
      </Show>
      {props.children}
      <Show when={props.rightIcon}>
        <ButtonIcon>{props.rightIcon}</ButtonIcon>
      </Show>
    </>
  );
}

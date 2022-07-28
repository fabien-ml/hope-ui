import { clsx } from "clsx";
import { Show, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { IconSpinner } from "../icons/icon-spinner";
import { createComponentWithAs } from "../utils/create-component-with-as";
import { withBemModifiers } from "../utils/with-bem-modifiers";
import { ButtonLoaderProps } from "./types";

export const ButtonLoader = createComponentWithAs<"div", ButtonLoaderProps>(props => {
  const [local, others] = splitProps(props, ["as", "class", "children", "withLoadingText"]);

  const classes = () => {
    return clsx(
      withBemModifiers("hope-button__loader", [local.withLoadingText && "with-loading-text"]),
      local.class
    );
  };

  return (
    <Dynamic component={local.as ?? "div"} class={classes()} {...others}>
      <Show when={local.children} fallback={<IconSpinner class="hope-button__icon-spinner" />}>
        {local.children}
      </Show>
    </Dynamic>
  );
});

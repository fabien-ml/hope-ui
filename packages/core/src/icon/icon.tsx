import { clsx } from "clsx";
import { Show, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { isString } from "../utils/assertion";
import { createComponentWithAs } from "../utils/create-component-with-as";

export const Icon = createComponentWithAs<"svg">(props => {
  const [local, others] = splitProps(props, ["as", "class", "viewBox"]);

  const classes = () => clsx("hope-icon", local.class);

  /**
   * If the `as` prop is a component (ex: if you're using an icon library).
   * Note: anyone passing the `as` prop, should manage the `viewBox` from the external component
   */
  const shouldRenderComponent = () => local.as && !isString(local.as);

  return (
    <Show
      when={shouldRenderComponent()}
      fallback={
        <svg
          // @ts-ignore
          focusable={false}
          class={classes()}
          viewBox={local.viewBox ?? "0 0 24 24"}
          {...others}
        />
      }
    >
      <Dynamic component={local.as} class={classes()} {...others} />
    </Show>
  );
});

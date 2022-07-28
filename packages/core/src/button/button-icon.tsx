import { clsx } from "clsx";
import { splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { createComponentWithAs } from "../utils/create-component-with-as";

export const ButtonIcon = createComponentWithAs<"span">(props => {
  const [local, others] = splitProps(props, ["as", "class"]);

  const classes = () => clsx("hope-button__icon", local.class);

  return <Dynamic component={local.as ?? "span"} class={classes()} {...others} />;
});

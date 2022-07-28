import { clsx } from "clsx";
import { createContext, splitProps, useContext } from "solid-js";
import { Dynamic } from "solid-js/web";

import { createComponentWithAs } from "../utils/create-component-with-as";
import { ButtonGroupContextValue, ButtonGroupProps } from "./types";

/** ButtonGroup handles a grouping of buttons whose actions are related to each other. */
export const ButtonGroup = createComponentWithAs<"div", ButtonGroupProps>(props => {
  const [local, others] = splitProps(props, [
    "as",
    "class",
    "variant",
    "colorScheme",
    "size",
    "isDisabled",
  ]);

  const classes = () => clsx("hope-button__group", local.class);

  const context: ButtonGroupContextValue = {
    variant: () => local.variant,
    colorScheme: () => local.colorScheme,
    size: () => local.size,
    isDisabled: () => local.isDisabled,
  };

  return (
    <ButtonGroupContext.Provider value={context}>
      <Dynamic component={local.as ?? "div"} role="group" class={classes()} {...others} />
    </ButtonGroupContext.Provider>
  );
});

const ButtonGroupContext = createContext<ButtonGroupContextValue>();

export function useButtonGroupContext() {
  return useContext(ButtonGroupContext);
}

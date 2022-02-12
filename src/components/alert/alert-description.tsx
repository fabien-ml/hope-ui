import { splitProps } from "solid-js";

import { classNames, createCssSelector } from "@/utils/css";

import { Box } from "../box/box";
import { ElementType, HopeComponentProps } from "../types";
import { alertDescriptionStyles } from "./alert.styles";

export type AlertDescriptionProps<C extends ElementType> = HopeComponentProps<C>;

const hopeAlertDescriptionClass = "hope-alert-description";

export function AlertDescription<C extends ElementType = "div">(props: AlertDescriptionProps<C>) {
  const [local, others] = splitProps(props, ["class"]);

  const classes = () =>
    classNames(local.class, hopeAlertDescriptionClass, alertDescriptionStyles());

  return <Box class={classes()} {...others} />;
}

AlertDescription.toString = () => createCssSelector(hopeAlertDescriptionClass);

import { JSX } from "solid-js";

import { createComponentWithAs, PropsWithAs } from "../utils/create-component-with-as";
import { Icon } from "./icon";

export interface CreateIconOptions {
  /** A function that return the `svg` path or group element. */
  path: () => JSX.Element | JSX.Element[];

  /**
   * The icon `svg` viewBox.
   * @default "0 0 24 24"
   */
  viewBox?: string;

  /** Default props automatically passed to the component. */
  defaultProps?: PropsWithAs<"svg">;
}

export function createIcon(options: CreateIconOptions) {
  const { viewBox = "0 0 24 24", defaultProps = {} } = options;

  return createComponentWithAs<"svg">(props => (
    <Icon viewBox={viewBox} {...defaultProps} {...props}>
      {options.path}
    </Icon>
  ));
}

import { Component, ComponentProps, JSX } from "solid-js";

import { ElementType } from "../types/dom";
import { ClassProps, OverrideProps } from "../types/props";

/** The "as" prop type. */
export type As<Props = any> = ElementType<Props>;

/** Props object that includes the "as" prop. */
export type PropsWithAs<Type extends As = As, Props = {}> = OverrideProps<
  ComponentProps<Type>,
  Props & ClassProps & { as?: Type; children?: JSX.Element }
>;

/** A component with the "as" prop. */
export type ComponentWithAs<DefaultType extends As, Props = {}> = {
  <Type extends As>(props: PropsWithAs<Type, Props> & { as: Type }): JSX.Element;
  (props: PropsWithAs<DefaultType, Props>): JSX.Element;
};

/** Factory function to create component with the "as" prop. */
export function createComponentWithAs<DefaultType extends As, Props = {}>(
  component: Component<PropsWithAs<DefaultType, Props>>
) {
  return component as unknown as ComponentWithAs<DefaultType, Props>;
}

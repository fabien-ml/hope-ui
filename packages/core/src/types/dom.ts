import { Component, JSX } from "solid-js";

/** All HTML and SVG elements. */
export type DOMElements = keyof JSX.IntrinsicElements;

/** Any HTML element or SolidJS component. */
export type ElementType<Props = any> = DOMElements | Component<Props>;

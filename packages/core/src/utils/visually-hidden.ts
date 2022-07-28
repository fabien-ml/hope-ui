import { JSX } from "solid-js";

export const visuallyHiddenStyle: JSX.CSSProperties = {
  position: "absolute",
  overflow: "hidden",
  height: "1px",
  width: "1px",
  margin: "0 -1px -1px 0",
  border: "0",
  padding: "0",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
};

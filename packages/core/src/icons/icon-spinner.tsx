import { createIcon } from "../icon/create-icon";

export const IconSpinner = createIcon({
  path: () => (
    <g fill="none">
      <path
        opacity=".2"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10z"
        fill="currentColor"
      />
      <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2z" fill="currentColor" />
    </g>
  ),
});

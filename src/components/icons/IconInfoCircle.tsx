import { createIcon } from "../icon/create-icon";

export const IconInfoCircle = createIcon({
  path: () => (
    <g fill="none" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </g>
  ),
});

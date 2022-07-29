import { addons } from "@storybook/addons";
import { onCleanup, onMount } from "solid-js";

import { HopeProvider, useColorMode } from "../src";

const channel = addons.getChannel();

/**
 * Utility component to sync Hope UI color mode with storybook-color-mode addon.
 */
function ColorModeWrapper(props) {
  const { setColorMode } = useColorMode();

  const listener = isDark => setColorMode(isDark ? "dark" : "light");

  onMount(() => {
    channel.on("DARK_MODE", listener);
  });

  onCleanup(() => {
    channel.off("DARK_MODE", listener);
  });

  return props.children;
}

export function HopeWrapper(props) {
  return HopeProvider({ children: () => ColorModeWrapper({ children: props.children }) });
}

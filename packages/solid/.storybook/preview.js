import { themes } from "@storybook/theming";

import { render } from "solid-js/web";
import { HopeWrapper } from "./hope-wrapper";

let disposeStory;

// SolidJS decorators
export const decorators = [
  Story => {
    if (disposeStory) {
      disposeStory();
    }

    const root = document.getElementById("root");
    const solid = document.createElement("div");

    solid.setAttribute("id", "solid-root");
    root.appendChild(solid);
    disposeStory = render(() => HopeWrapper({ children: Story() }), solid);
    return solid;
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  decorators,
  options: {
    storySort: {
      order: [
        "General",
        "Data entry",
        "Data display",
        "Navigation",
        "Feedback",
        "Overlay",
        "Others",
      ],
    },
  },
  darkMode: {
    light: { ...themes.normal, appBg: "#f9fafb", appContentBg: "#ffffff" },
    dark: { ...themes.dark, appBg: "#262626", appContentBg: "#171717" },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

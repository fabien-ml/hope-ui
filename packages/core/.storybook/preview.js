import "../scss/hope-ui.scss";

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
    light: { ...themes.normal, appBg: "#F0F4F8", appContentBg: "#ffffff" },
    dark: { ...themes.dark, appBg: "#243B53", appContentBg: "#102A43" },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

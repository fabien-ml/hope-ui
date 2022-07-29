module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "storybook-dark-mode",
  ],
  framework: "@storybook/html",
  core: {
    builder: "webpack5",
    disableTelemetry: true,
  },
  babel: async options => ({
    ...options,
    presets: ["@babel/preset-typescript", "solid"],
  }),
};

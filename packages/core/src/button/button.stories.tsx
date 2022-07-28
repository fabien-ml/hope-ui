import { action } from "@storybook/addon-actions";

import { createIcon } from "../icon";
import { Button } from "./button";

const IconCart = createIcon({
  viewBox: "0 0 20 20",
  path: () => (
    <g fill="none">
      <path
        d="M3 1a1 1 0 0 0 0 2h1.22l.305 1.222a.997.997 0 0 0 .01.042l1.358 5.43l-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 0 0 0-2H6.414l1-1H14a1 1 0 0 0 .894-.553l3-6A1 1 0 0 0 17 3H6.28l-.31-1.243A1 1 0 0 0 5 1H3z"
        fill="currentColor"
      ></path>
      <path d="M16 16.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0z" fill="currentColor"></path>
      <path d="M6.5 18a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3z" fill="currentColor"></path>
    </g>
  ),
});

export default {
  title: "General/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["solid", "soft", "outlined", "plain"],
    },
    colorScheme: {
      control: { type: "select" },
      options: ["primary", "neutral", "success", "info", "warning", "danger"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
    loaderPlacement: {
      control: { type: "inline-radio" },
      options: ["start", "end"],
    },
    isFullWidth: {
      control: { type: "boolean" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
    isDisabled: {
      control: { type: "boolean" },
    },
    loadingText: {
      control: "text",
    },
    children: {
      control: "text",
    },
  },
  args: {
    variant: "solid",
    colorScheme: "primary",
    size: "md",
    loaderPlacement: "start",
    isFullWidth: false,
    isLoading: false,
    isDisabled: false,
    loadingText: "",
    children: "Button",
  },
};

export const Default = (args: any) => <Button {...args} onClick={action("clicked")} />;

export const WithLeftIcon = (args: any) => (
  <Button leftIcon={<IconCart />} onClick={action("clicked")} {...args} />
);
WithLeftIcon.storyName = "With left icon";

export const WithRightIcon = (args: any) => (
  <Button rightIcon={<IconCart />} onClick={action("clicked")} {...args} />
);
WithRightIcon.storyName = "With right icon";

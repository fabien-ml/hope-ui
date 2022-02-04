import { action } from "@storybook/addon-actions";

import { IconInfoCircle } from "@/icons";
import { HopeWrapper } from "@/utils/storybook";

import { Button } from "./button";

export default {
  title: "General/Button",
  component: Button,
  parameters: { layout: "centered" },
  decorators: [
    (Story: any) => (
      <HopeWrapper>
        <div style={{ display: "flex", "justify-content": "center", width: "90vw" }}>
          <Story />
        </div>
      </HopeWrapper>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["solid", "subtle", "outline", "dashed", "ghost", "default"],
    },
    colorScheme: {
      control: { type: "select" },
      options: ["primary", "neutral", "success", "info", "warning", "danger"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    loaderPosition: {
      control: { type: "inline-radio" },
      options: ["left", "right"],
    },
    compact: {
      control: { type: "boolean" },
    },
    fullWidth: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    children: {
      control: "text",
    },
  },
  args: {
    variant: "solid",
    colorScheme: "primary",
    size: "md",
    loaderPosition: "left",
    compact: false,
    fullWidth: false,
    loading: false,
    disabled: false,
    children: "Button",
  },
};

export const Default = (args: any) => <Button {...args} onClick={action("clicked")} />;

export const WithLeftIcon = (args: any) => (
  <Button leftIcon={<IconInfoCircle />} onClick={action("clicked")} {...args} />
);
WithLeftIcon.storyName = "With left icon";

export const WithRightIcon = (args: any) => (
  <Button rightIcon={<IconInfoCircle />} onClick={action("clicked")} {...args} />
);
WithRightIcon.storyName = "With right icon";
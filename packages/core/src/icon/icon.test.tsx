import { render, screen } from "solid-testing-library";

import { Icon } from "./icon";

const path = () => (
  <path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
);

describe("Icon", () => {
  it("should render", () => {
    render(() => <Icon data-testid="icon">{path}</Icon>);

    const icon = screen.getByTestId("icon");

    expect(icon).toBeInTheDocument();
  });

  it("should forwards the ref", () => {
    let ref: SVGSVGElement | undefined;

    render(() => (
      <Icon data-testid="icon" ref={ref}>
        {path}
      </Icon>
    ));

    const icon = screen.getByTestId("icon");

    expect(icon).toBe(ref);
  });

  it("should have default viewBox", () => {
    render(() => <Icon data-testid="icon">{path}</Icon>);

    const icon = screen.getByTestId("icon");

    expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
  });

  it("should apply custom viewBox", () => {
    render(() => (
      <Icon data-testid="icon" viewBox="0 0 20 20">
        {path}
      </Icon>
    ));

    const icon = screen.getByTestId("icon");

    expect(icon).toHaveAttribute("viewBox", "0 0 20 20");
  });

  it("should have base class", () => {
    render(() => <Icon data-testid="icon">{path}</Icon>);

    const icon = screen.getByTestId("icon");

    expect(icon).toHaveClass("hope-icon");
  });

  it("should apply class from class prop", () => {
    render(() => (
      <Icon data-testid="icon" class="test">
        {path}
      </Icon>
    ));

    const icon = screen.getByTestId("icon");

    expect(icon).toHaveClass("test");
  });
});

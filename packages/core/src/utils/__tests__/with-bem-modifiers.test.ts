import { withBemModifiers } from "../with-bem-modifiers";

describe("withBemModifiers", () => {
  it("should return an array of valid BEM modifier classes", () => {
    const classes = withBemModifiers("block", ["modifier", "", false, null, undefined]);

    expect(classes).toEqual(["block", "block--modifier"]);
  });
});

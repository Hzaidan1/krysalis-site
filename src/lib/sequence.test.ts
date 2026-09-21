import { nextIndexInSequence } from "./sequence";

describe("nextIndexInSequence", () => {
  const slugs = ["project-01", "project-02", "project-03", "project-04"];

  it("returns the following item's index", () => {
    expect(nextIndexInSequence("project-01", slugs)).toBe(1);
    expect(nextIndexInSequence("project-02", slugs)).toBe(2);
  });

  it("wraps back around to the first item after the last one", () => {
    expect(nextIndexInSequence("project-04", slugs)).toBe(0);
  });

  it("returns -1 when the current slug isn't in the list", () => {
    expect(nextIndexInSequence("does-not-exist", slugs)).toBe(-1);
  });

  it("returns -1 for an empty list", () => {
    expect(nextIndexInSequence("project-01", [])).toBe(-1);
  });

  it("wraps back to itself when there's only one project", () => {
    expect(nextIndexInSequence("only-one", ["only-one"])).toBe(0);
  });
});

import { isValidEmail } from "./validateEmail";

describe("isValidEmail", () => {
  it("accepts a normal email address", () => {
    expect(isValidEmail("admin@krysalismedia.co.uk")).toBe(true);
  });

  it("accepts an email with a plus tag", () => {
    expect(isValidEmail("someone+tag@example.com")).toBe(true);
  });

  it("accepts an email with a subdomain", () => {
    expect(isValidEmail("person@mail.example.com")).toBe(true);
  });

  it("trims surrounding whitespace before checking", () => {
    expect(isValidEmail("  admin@krysalismedia.co.uk  ")).toBe(true);
  });

  it("rejects a bare word with no @ symbol", () => {
    // The exact real-world case that slipped through before this was fixed
    expect(isValidEmail("hussein")).toBe(false);
  });

  it("rejects an email with no domain", () => {
    expect(isValidEmail("someone@")).toBe(false);
  });

  it("rejects an email with no top-level domain", () => {
    expect(isValidEmail("someone@example")).toBe(false);
  });

  it("rejects an email with no local part", () => {
    expect(isValidEmail("@example.com")).toBe(false);
  });

  it("rejects an email containing a space", () => {
    expect(isValidEmail("some one@example.com")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import { card } from "../src/card";

describe("Shuffle Cards", () => {
  it("should return an ace of diamonds", () => {
    expect(card("AS-piques")).toEqual({
      value: "AS",
      color: "piques",
    });
  });

  it("should return a nine of diamonds", () => {
    expect(card("9-carreaux")).toEqual({
      value: "9",
      color: "carreaux",
    });
  });
});

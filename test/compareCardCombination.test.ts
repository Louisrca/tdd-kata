import { describe, expect, it } from "vitest";

import { compareCardCombination, Hand } from "../src/handCategories";

import { carre, paire8, paire9, quinteFlush } from "./fixtures/hand";

describe("Compare Hand", () => {
  it("should return hand1Value", () => {
    expect(compareCardCombination(quinteFlush, paire9)).toBe(quinteFlush);
  });

  it("should return hand2Value", () => {
    expect(compareCardCombination(paire9, carre)).toBe(carre);
  });

  it("should return `1 à gagné`", () => {
    expect(compareCardCombination(paire9, paire8)).toBe("1 à gagné");
  });
  it("should return `égalité !`", () => {
    expect(compareCardCombination(paire9, paire9)).toBe("égalité !");
  });
});

import { describe, expect, it } from "vitest";

import { compareCardCombination, Hand } from "../src/handCategories";

describe("Compare Hand", () => {
  it("should return hand1Value", () => {
    const hand1: Hand = {
      categorie: "Carre",
      cards: ["AS-piques", "K-trefles"],
    };

    const hand2: Hand = {
      categorie: "Paire",
      cards: ["9-trefles", "9-trefles"],
    };

    expect(compareCardCombination(hand1, hand2)).toBe(hand1);
  });

  it("should return hand2Value", () => {
    const hand1: Hand = {
      categorie: "Paire",
      cards: ["9-trefles", "9-trefles"],
    };

    const hand2: Hand = {
      categorie: "Carre",
      cards: ["AS-piques", "K-trefles"],
    };

    expect(compareCardCombination(hand1, hand2)).toBe(hand2);
  });

  it("should return equality", () => {
    const hand1: Hand = {
      categorie: "Paire",
      cards: [{ "9-trefles": 9 }, { "9-trefles": 9 }],
    };

    const hand2: Hand = {
      categorie: "Paire",
      cards: [{ "9-trefles": 9 }, { "9-trefles": 9 }],
    };

    expect(compareCardCombination(hand1, hand2)).toBe("égalité !");
  });
});

import { describe, expect, it } from "vitest";

import { CARDS, type Card } from "../src/card";
import { evaluateTexasHoldem } from "../src/combinations";
import {
  flushHole,
  flushBoard,
  fourOfAKindBoard,
  fourOfAKindHole,
  fullHouseBoard,
  fullHouseHole,
  straightFlushBoard,
  straightFlushHole,
  wheelStraightBoard,
  wheelStraightHole,
  aceHighStraightHole,
  aceHighStraightBoard,
  threeOfAKindBoard,
  threeOfAKindHole,
  twoPairHole,
  twoPairBoard,
  onePairBoard,
  onePairHole,
  highCardBoard,
  highCardHole,
  tieBoard,
  tieHole1,
  tieHole2,
} from "./fixtures/combinations";

const entry = (key: Card) => ({ key, value: CARDS[key] });

describe("Texas Hold'em combinations", () => {
  it("detects a straight flush", () => {
    const hand = evaluateTexasHoldem(straightFlushBoard, straightFlushHole);

    expect(hand.categorie).toBe("QuinteFlush");
    expect(hand.cards).toEqual([
      entry("K-coeurs"),
      entry("Q-coeurs"),
      entry("J-coeurs"),
      entry("10-coeurs"),
      entry("9-coeurs"),
    ]);
  });

  it("detects four of a kind with kicker", () => {
    const hand = evaluateTexasHoldem(fourOfAKindBoard, fourOfAKindHole);

    expect(hand.categorie).toBe("Carre");
    expect(hand.cards).toEqual([
      entry("7-carreaux"),
      entry("7-coeurs"),
      entry("7-piques"),
      entry("7-trefles"),
      entry("AS-trefles"),
    ]);
  });

  it("detects a full house", () => {
    const hand = evaluateTexasHoldem(fullHouseBoard, fullHouseHole);

    expect(hand.categorie).toBe("FullHouse");
    expect(hand.cards).toEqual([
      entry("K-carreaux"),
      entry("K-coeurs"),
      entry("K-trefles"),
      entry("9-piques"),
      entry("9-trefles"),
    ]);
  });

  it("selects the best flush when more than five suited cards exist", () => {
    const hand = evaluateTexasHoldem(flushBoard, flushHole);

    expect(hand.categorie).toBe("Couleur");
    expect(hand.cards).toEqual([
      entry("AS-coeurs"),
      entry("J-coeurs"),
      entry("9-coeurs"),
      entry("6-coeurs"),
      entry("4-coeurs"),
    ]);
  });

  it("handles an ace-low straight (wheel)", () => {
    const hand = evaluateTexasHoldem(wheelStraightBoard, wheelStraightHole);

    expect(hand.categorie).toBe("Suite");
    expect(hand.cards).toEqual([
      entry("5-trefles"),
      entry("4-piques"),
      entry("3-coeurs"),
      entry("2-carreaux"),
      entry("AS-trefles"),
    ]);
  });

  it("handles an ace-high straight", () => {
    const hand = evaluateTexasHoldem(aceHighStraightBoard, aceHighStraightHole);

    expect(hand.categorie).toBe("Suite");
    expect(hand.cards).toEqual([
      entry("AS-trefles"),
      entry("K-piques"),
      entry("Q-coeurs"),
      entry("J-carreaux"),
      entry("10-trefles"),
    ]);
  });

  it("detects three of a kind with kickers", () => {
    const hand = evaluateTexasHoldem(threeOfAKindBoard, threeOfAKindHole);

    expect(hand.categorie).toBe("Brelan");
    expect(hand.cards).toEqual([
      entry("Q-carreaux"),
      entry("Q-coeurs"),
      entry("Q-trefles"),
      entry("AS-piques"),
      entry("K-trefles"),
    ]);
  });

  it("detects two pair with kicker", () => {
    const hand = evaluateTexasHoldem(twoPairBoard, twoPairHole);

    expect(hand.categorie).toBe("DoublePaire");
    expect(hand.cards).toEqual([
      entry("J-carreaux"),
      entry("J-trefles"),
      entry("9-coeurs"),
      entry("9-piques"),
      entry("AS-piques"),
    ]);
  });

  it("detects one pair with ordered kickers", () => {
    const hand = evaluateTexasHoldem(onePairBoard, onePairHole);

    expect(hand.categorie).toBe("Paire");
    expect(hand.cards).toEqual([
      entry("10-carreaux"),
      entry("10-trefles"),
      entry("AS-piques"),
      entry("K-trefles"),
      entry("9-coeurs"),
    ]);
  });

  it("detects high card", () => {
    const hand = evaluateTexasHoldem(highCardBoard, highCardHole);

    expect(hand.categorie).toBe("CarteHaute");
    expect(hand.cards).toEqual([
      entry("AS-trefles"),
      entry("K-trefles"),
      entry("10-carreaux"),
      entry("9-coeurs"),
      entry("7-piques"),
    ]);
  });

  it("returns the board straight for both players (tie)", () => {
    const hand1 = evaluateTexasHoldem(tieBoard, tieHole1);
    const hand2 = evaluateTexasHoldem(tieBoard, tieHole2);

    expect(hand1).toEqual(hand2);
    expect(hand1.categorie).toBe("Suite");
    expect(hand1.cards).toEqual([
      entry("9-carreaux"),
      entry("8-piques"),
      entry("7-coeurs"),
      entry("6-carreaux"),
      entry("5-trefles"),
    ]);
  });
});

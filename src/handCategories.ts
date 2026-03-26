import type { Card } from "./card.ts";

const HAND_CATEGORIES = {
  QuinteFlush: 9,
  Carre: 8,
  FullHouse: 7,
  Couleur: 6,
  Suite: 5,
  Brelan: 4,
  DoublePaire: 3,
  Paire: 2,
  CarteHaute: 1,
} as const;

export type HandCategory = typeof HAND_CATEGORIES;

export type Hand = {
  categorie: keyof HandCategory;
  cards: Card[];
};

export function compareCardCombination(hand1: Hand, hand2: Hand) {
  const hand1Value = HAND_CATEGORIES[hand1.categorie];
  const hand2Value = HAND_CATEGORIES[hand2.categorie];

  if (hand1Value === hand2Value) {
  }

  if (hand1Value > hand2Value) {
    return hand1;
  } else {
    return hand2;
  }
}

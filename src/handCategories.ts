import type { Card, CARDS } from "./card.ts";

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

export type CardEntry = {
  key: Card;
  value: (typeof CARDS)[Card];
};

export type Hand = {
  categorie: keyof HandCategory;
  cards: CardEntry[];
};

export function compareCardCombination(hand1: Hand, hand2: Hand) {
  const hand1Categorie = HAND_CATEGORIES[hand1.categorie];
  const hand2Categorie = HAND_CATEGORIES[hand2.categorie];

  const hand1Value = hand1.cards;
  const hand2Value = hand2.cards;

  if (hand1Categorie === hand2Categorie) {
    if (hand1Value[0] && hand2Value[0]) {
      return hand1Value[0].value === hand2Value[0].value
        ? "égalité !"
        : hand1Value[0].value > hand2Value[0].value
          ? "1 à gagné"
          : "2 à gagné";
    }
  }

  if (hand1Categorie > hand2Categorie) {
    return hand1;
  } else {
    return hand2;
  }
}

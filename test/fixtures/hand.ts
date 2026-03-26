import { Hand } from "../../src/handCategories";

export const paire9: Hand = {
  categorie: "Paire",
  cards: [
    { key: "9-trefles", value: 9 },
    { key: "9-trefles", value: 9 },
  ],
};

export const paire8: Hand = {
  categorie: "Paire",
  cards: [
    { key: "8-trefles", value: 8 },
    { key: "8-trefles", value: 8 },
  ],
};

export const carre: Hand = {
  categorie: "Carre",
  cards: [
    { key: "AS-piques", value: 14 },
    { key: "K-trefles", value: 13 },
  ],
};

export const quinteFlush: Hand = {
  categorie: "QuinteFlush",
  cards: [
    { key: "10-coeurs", value: 10 },
    { key: "J-coeurs", value: 11 },
  ],
};

const CARDS = {
  "AS-trefles": 14,
  "2-trefles": 2,
  "3-trefles": 3,
  "4-trefles": 4,
  "5-trefles": 5,
  "6-trefles": 6,
  "7-trefles": 7,
  "8-trefles": 8,
  "9-trefles": 9,
  "10-trefles": 10,
  "J-trefles": 11,
  "Q-trefles": 12,
  "K-trefles": 13,

  "AS-carreaux": 14,
  "2-carreaux": 2,
  "3-carreaux": 3,
  "4-carreaux": 4,
  "5-carreaux": 5,
  "6-carreaux": 6,
  "7-carreaux": 7,
  "8-carreaux": 8,
  "9-carreaux": 9,
  "10-carreaux": 10,
  "J-carreaux": 11,
  "Q-carreaux": 12,
  "K-carreaux": 13,

  "AS-coeurs": 14,
  "2-coeurs": 2,
  "3-coeurs": 3,
  "4-coeurs": 4,
  "5-coeurs": 5,
  "6-coeurs": 6,
  "7-coeurs": 7,
  "8-coeurs": 8,
  "9-coeurs": 9,
  "10-coeurs": 10,
  "J-coeurs": 11,
  "Q-coeurs": 12,
  "K-coeurs": 13,

  "AS-piques": 14,
  "2-piques": 2,
  "3-piques": 3,
  "4-piques": 4,
  "5-piques": 5,
  "6-piques": 6,
  "7-piques": 7,
  "8-piques": 8,
  "9-piques": 9,
  "10-piques": 10,
  "J-piques": 11,
  "Q-piques": 12,
  "K-piques": 13,
} as const;

export type Card = typeof CARDS;

function splitValue(value: keyof Card): { value: string; color: string } {
  const [cardValue, color] = value.split("-");

  if (!cardValue || !color) {
    throw new Error("Invalid card format");
  }
  return { value: cardValue, color };
}

function shuffle(cards: Card[]): Card {
  const randomInt = Math.floor(Math.random() * 52);

  const randomCard = cards[randomInt];

  if (!randomCard) {
    throw new Error("Invalid card index");
  }
  return randomCard;
}

export function card(card: keyof Card): { value: string; color: string } {
  return splitValue(card);
}

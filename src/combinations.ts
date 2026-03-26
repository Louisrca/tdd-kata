import { CARDS, type Card } from "./card.ts";
import {
  HAND_CATEGORIES,
  type CardEntry,
  type Hand,
} from "./handCategories.ts";

type CardInfo = {
  key: Card;
  value: (typeof CARDS)[Card];
  suit: string;
};

type EvaluatedHand = {
  categorie: Hand["categorie"];
  cards: CardEntry[];
  categoryRank: number;
  tieRanks: number[];
};

function toCardInfo(cards: Card[]): CardInfo[] {
  return cards.map((key) => {
    const [_, suit] = key.split("-");
    return {
      key,
      value: CARDS[key],
      suit: suit ?? "",
    };
  });
}

function sortByValueDesc(cards: CardInfo[]): CardInfo[] {
  return [...cards].sort((a, b) => {
    if (a.value !== b.value) return b.value - a.value;
    return a.key.localeCompare(b.key);
  });
}

function groupByValue(cards: CardInfo[]) {
  const map = new Map<number, CardInfo[]>();
  for (const card of cards) {
    const group = map.get(card.value);
    if (group) {
      group.push(card);
    } else {
      map.set(card.value, [card]);
    }
  }
  return map;
}

function isFlush(cards: CardInfo[]): boolean {
  const suit = cards[0]?.suit;
  if (!suit) return false;
  return cards.every((card) => card.suit === suit);
}

function getStraightHigh(values: number[]): number | null {
  const unique = Array.from(new Set(values)).sort((a, b) => b - a);
  if (unique.length !== 5) return null;

  const isRegular = unique.every(
    (value, index) => index === 0 || unique[index - 1] === value + 1,
  );
  if (isRegular) return unique[0] ?? null;

  const isWheel =
    unique[0] === 14 &&
    unique[1] === 5 &&
    unique[2] === 4 &&
    unique[3] === 3 &&
    unique[4] === 2;
  return isWheel ? 5 : null;
}

function orderStraightCards(
  cards: CardInfo[],
  straightHigh: number,
): CardInfo[] {
  const orderValues =
    straightHigh === 5
      ? [5, 4, 3, 2, 14]
      : [
          straightHigh,
          straightHigh - 1,
          straightHigh - 2,
          straightHigh - 3,
          straightHigh - 4,
        ];

  const sorted = sortByValueDesc(cards);
  const result: CardInfo[] = [];
  for (const value of orderValues) {
    const found = sorted.find((card) => card.value === value);
    if (found) result.push(found);
  }
  return result;
}

function toCardEntries(cards: CardInfo[]): CardEntry[] {
  return cards.map((card) => ({ key: card.key, value: card.value }));
}

function evaluateFiveCards(cards: CardInfo[]): EvaluatedHand {
  const sorted = sortByValueDesc(cards);
  const values = sorted.map((card) => card.value);
  const straightHigh = getStraightHigh(values);
  const flush = isFlush(cards);
  const groups = groupByValue(cards);
  const grouped = Array.from(groups.entries())
    .map(([value, groupCards]) => ({
      value,
      cards: sortByValueDesc(groupCards),
      count: groupCards.length,
    }))
    .sort((a, b) => {
      if (a.count !== b.count) return b.count - a.count;
      return b.value - a.value;
    });

  if (straightHigh && flush) {
    const ordered = orderStraightCards(cards, straightHigh);
    return {
      categorie: "QuinteFlush",
      cards: toCardEntries(ordered),
      categoryRank: HAND_CATEGORIES.QuinteFlush,
      tieRanks: [straightHigh],
    };
  }

  if (grouped[0]?.count === 4 && grouped[1]) {
    const quad = grouped[0];
    const kicker = grouped[1];
    const ordered = [...quad.cards, ...kicker.cards];
    return {
      categorie: "Carre",
      cards: toCardEntries(ordered),
      categoryRank: HAND_CATEGORIES.Carre,
      tieRanks: [quad.value, kicker.value],
    };
  }

  if (grouped[0]?.count === 3 && grouped[1]?.count === 2) {
    const trip = grouped[0];
    const pair = grouped[1];
    const ordered = [...trip.cards, ...pair.cards];
    return {
      categorie: "FullHouse",
      cards: toCardEntries(ordered),
      categoryRank: HAND_CATEGORIES.FullHouse,
      tieRanks: [trip.value, pair.value],
    };
  }

  if (flush) {
    return {
      categorie: "Couleur",
      cards: toCardEntries(sorted),
      categoryRank: HAND_CATEGORIES.Couleur,
      tieRanks: values,
    };
  }

  if (straightHigh) {
    const ordered = orderStraightCards(cards, straightHigh);
    return {
      categorie: "Suite",
      cards: toCardEntries(ordered),
      categoryRank: HAND_CATEGORIES.Suite,
      tieRanks: [straightHigh],
    };
  }

  if (grouped[0]?.count === 3 && grouped[1] && grouped[2]) {
    const trip = grouped[0];
    const kickers = [grouped[1], grouped[2]].sort((a, b) => b.value - a.value);
    const ordered = [...trip.cards, ...kickers.flatMap((g) => g.cards)];

    if (kickers[0] && kickers[1]) {
      return {
        categorie: "Brelan",
        cards: toCardEntries(ordered),
        categoryRank: HAND_CATEGORIES.Brelan,
        tieRanks: [trip.value, kickers[0].value, kickers[1].value],
      };
    }
  }

  if (grouped[0]?.count === 2 && grouped[1]?.count === 2 && grouped[2]) {
    const pairs = [grouped[0], grouped[1]].sort((a, b) => b.value - a.value);
    const kicker = grouped[2];

    if (!pairs[0] || !pairs[1] || !kicker) {
      throw new Error("Invalid hand structure for DoublePaire");
    }

    const ordered = [...pairs[0].cards, ...pairs[1].cards, ...kicker.cards];
    return {
      categorie: "DoublePaire",
      cards: toCardEntries(ordered),
      categoryRank: HAND_CATEGORIES.DoublePaire,
      tieRanks: [pairs[0].value, pairs[1].value, kicker.value],
    };
  }

  if (grouped[0]?.count === 2 && grouped[1] && grouped[2] && grouped[3]) {
    const pair = grouped[0];
    const kickers = [grouped[1], grouped[2], grouped[3]].sort(
      (a, b) => b.value - a.value,
    );
    const ordered = [...pair.cards, ...kickers.flatMap((group) => group.cards)];
    return {
      categorie: "Paire",
      cards: toCardEntries(ordered),
      categoryRank: HAND_CATEGORIES.Paire,
      tieRanks: [pair.value, ...kickers.map((k) => k.value)],
    };
  }

  return {
    categorie: "CarteHaute",
    cards: toCardEntries(sorted),
    categoryRank: HAND_CATEGORIES.CarteHaute,
    tieRanks: values,
  };
}

function compareEvaluated(a: EvaluatedHand, b: EvaluatedHand): number {
  if (a.categoryRank !== b.categoryRank) {
    return a.categoryRank - b.categoryRank;
  }

  for (let i = 0; i < Math.max(a.tieRanks.length, b.tieRanks.length); i += 1) {
    const av = a.tieRanks[i] ?? 0;
    const bv = b.tieRanks[i] ?? 0;
    if (av !== bv) return av - bv;
  }
  return 0;
}

function fiveCardCombinations(cards: CardInfo[]): CardInfo[][] {
  const results: CardInfo[][] = [];
  const n = cards.length;
  for (let i = 0; i < n - 4; i += 1) {
    for (let j = i + 1; j < n - 3; j += 1) {
      for (let k = j + 1; k < n - 2; k += 1) {
        for (let l = k + 1; l < n - 1; l += 1) {
          for (let m = l + 1; m < n; m += 1) {
            results.push([
              cards[i]!,
              cards[j]!,
              cards[k]!,
              cards[l]!,
              cards[m]!,
            ]);
          }
        }
      }
    }
  }
  return results;
}

export function evaluateBestFromSeven(cards: Card[]): Hand {
  const infos = sortByValueDesc(toCardInfo(cards));
  const combos = fiveCardCombinations(infos);
  let best = evaluateFiveCards(combos[0]!);
  for (let i = 1; i < combos.length; i += 1) {
    const evaluated = evaluateFiveCards(combos[i]!);
    if (compareEvaluated(evaluated, best) > 0) {
      best = evaluated;
    }
  }
  return { categorie: best.categorie, cards: best.cards };
}

export function evaluateTexasHoldem(board: Card[], hole: Card[]): Hand {
  return evaluateBestFromSeven([...board, ...hole]);
}

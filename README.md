# tdd-kata — Texas Hold’em Hand Evaluator

Ce kata consiste à évaluer et comparer des mains de poker Texas Hold’em **en TDD**.

## Objectif
À partir de :
- **5 cartes communes** (board)
- **2 cartes privées** par joueur (hole)

Le programme doit :
1. Trouver la **meilleure main de 5 cartes** parmi les 7 disponibles.
2. Déterminer le **vainqueur** (ou l’égalité).
3. Retourner la **catégorie** et les **5 cartes choisies**.

## Catégories (du plus fort au plus faible)

| Rang | Catégorie |
|------|-----------|
| 1 | Straight Flush |
| 2 | Four of a Kind |
| 3 | Full House |
| 4 | Flush |
| 5 | Straight |
| 6 | Three of a Kind |
| 7 | Two Pair |
| 8 | One Pair |
| 9 | High Card |

## Règles d’égalité (tie‑break)
Quand deux mains ont la même catégorie, on compare selon ces règles :

| Catégorie | Règle de comparaison |
|----------|-----------------------|
| Straight / Straight Flush | carte la plus haute (A‑5 = 5‑high) |
| Four of a Kind | rang du carré, puis kicker |
| Full House | rang du brelan, puis rang de la paire |
| Flush | cartes triées décroissantes |
| Three of a Kind | rang du brelan, puis 2 kickers |
| Two Pair | paire haute, paire basse, kicker |
| One Pair | rang de la paire, puis 3 kickers |
| High Card | cartes triées décroissantes |

## Choix des 5 cartes
- Toujours **exactement 5 cartes**.
- Elles doivent être **issues des 7 disponibles**.
- Ordre **déterministe** (selon le tie‑break).

## Tests
Les tests couvrent :
- toutes les catégories,
- les tie‑breaks,
- la sélection de la meilleure main sur 7 cartes,
- les égalités (split),
- le straight A‑2‑3‑4‑5.

## Hypothèses
- Pas de cartes dupliquées dans l’entrée (pas de validation côté code).

---
Si tu veux, je peux ajouter une section “API / Exemples d’usage”.
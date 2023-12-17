# Advent of Code 2023

My solutions for Advent of Code 2023 written in TypeScript

## Installation

Install Node 18.x and pnpm then run

```shell
pnpm install
```

## Tests

```shell
pnpm typecheck && pnpm test
```

## Running a script or single test

Since the code in this repository is written in TypeScript `tsx` is needed to run scripts:

```shell
pnpm tsx src/day-n/script.ts
```

Note: Some days are split into separate files like `part-1.ts` and `part-2.ts`. `tsx` can also be used to run only a single test by running it as a script!

## Running tests for a specific day

To run all tests in only a specific directory a special `test:dir` script is used:

```shell
pnpm test:dir src/day-n
```

## Stars: 29/50

| Week |  Monday   | Tuesday  | Wednesday | Thursday  |  Friday   | Saturday  |  Sunday  |
| :--: | :-------: | :------: | :-------: | :-------: | :-------: | :-------: | :------: |
|  1   |           |          |           |           | 1st ⭐⭐  | 2nd ⭐⭐  | 3rd ⭐⭐ |
|  2   | 4th ⭐⭐  | 5th ⭐⭐ | 6th ⭐⭐  | 7th ⭐⭐  | 8th ⭐⭐  | 9th ⭐⭐  | 10th ⭐  |
|  3   | 11th ⭐⭐ |   12th   | 13th ⭐⭐ | 14th ⭐⭐ | 15th ⭐⭐ | 16th ⭐⭐ |   17th   |
|  4   |   18th    |   19th   |   20th    |   21st    |   22nd    |   23rd    |   24th   |
|  5   |   25th    |          |           |           |           |           |          |

### Skipped Stars:

<details>
<summary><b>Day 10 Part 2</b></summary>
<p>Could not figure out a way to determine whether a tile is actually [enclosed by the loop](https://ieji.de/@mitsunee/111556848211160172). I attempted upscaling the grid to make it a simple pathfinding exercise, but could not get that working yet. May revisit later</p>
</details>

<details>
<summary><b>Day 12</b></summary>
<p>Didn't manage to figure out the correct approach to part 1. Only got a partial solution for blocks that can only have one position starting from the start or end of the string + recursive, but this ended up already having too many bugs.</p>
</details>

<details>
<summary><b>Day 17</b></summary>
<p>I have literally never done pathfinding algorithms and this puzzle adds an additional problem to simply comparing cost of reaching a tile, since a more expensive solution may have access to a cheaper rest of the path. I heard that Dijkstra's algorithm is easier than A*, but could not figure out how it would work with the "move at most 3 tiles in the same direction" limitation.</p>
</details>

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

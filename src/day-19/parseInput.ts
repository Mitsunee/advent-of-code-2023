import type { PartWorkflowStep, MachinePart, PartWorkflowMap } from "./types";

function isValidPart(part: unknown): part is MachinePart {
  // normally I would use zod for this, but it's simple enough that I don't need
  // to install an extra package here
  if (typeof part != "object" || part === null) return false;
  if (!("x" in part) || typeof part.x != "number") return false;
  if (!("m" in part) || typeof part.m != "number") return false;
  if (!("a" in part) || typeof part.a != "number") return false;
  if (!("s" in part) || typeof part.s != "number") return false;
  return true;
}

export function parseInput(input: string[]) {
  const workflows: PartWorkflowMap = {};
  const parts = new Array<MachinePart>();
  let i = 0;

  // parse workflows up to empty line
  for (let line; i < input.length && (line = input[i]) != ""; i++) {
    let match = line.match(/^([a-z]+)\{(.+)\}$/);
    if (!match) {
      throw new Error(`Could not parse workflow instruction: '${line}`);
    }

    const name = match[1];
    const steps = new Array<PartWorkflowStep>();
    const stepsStr = match[2].split(",");

    for (const stepStr of stepsStr) {
      if (/^[a-z]+$/i.test(stepStr)) {
        steps.push(stepStr);
        continue;
      }

      match = stepStr.match(/^([xmas])(<|>)(\d+):([a-z]+|R|A)$/);
      if (!match) {
        throw new Error(
          `Could not parse step '${stepStr}' of workflow: '${line}'`
        );
      }

      const key = match[1] as "x" | "m" | "a" | "s";
      const comparison = match[2] == ">" ? "larger" : "smaller";
      const value = Number(match[3]);
      const to = match[4];
      steps.push({ key, comparison, value, to });
    }

    workflows[name] = { name, steps };
  }

  // parse parts until end of input
  for (i++; i < input.length; i++) {
    try {
      const part = JSON.parse(input[i].replace(/(x|m|a|s)=/g, '"$1":'));
      if (!isValidPart(part)) {
        throw new Error(`Machine Part appears to be invalid: '${input[i]}'`);
      }
      parts.push(part);
    } catch (e) {
      console.error(e);
      throw new Error(`Could not parse Machine Part: '${input[i]}'`);
    }
  }

  return { workflows, parts };
}

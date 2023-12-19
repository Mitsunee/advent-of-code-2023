import type { MachinePart, PartWorkflow, PartWorkflowMap } from "./types";

type Keys = Extract<keyof MachinePart, string>;
interface MinMax {
  min: number;
  max: number;
}
type PathConstraint = Record<Keys, MinMax>;

/**
 * finds workflows which always result in the same outcome, removes them, and
 * replaces any pointer to the one result the removed workflow had
 */
function optimizeWorkflows(workflows: PartWorkflowMap): PartWorkflowMap {
  const entries = Object.entries(workflows) as [string, PartWorkflow][]; // not fucking undefined
  const fakeSplits = Object.fromEntries(
    entries.reduce((fakeEntries, entry) => {
      const wf = entry[1];
      const firstStep = wf.steps[0];
      const firstStepTo =
        typeof firstStep == "string" ? firstStep : firstStep.to;
      if (
        wf.steps.every(step => {
          if (typeof step == "string") return step == firstStepTo;
          return step.to == firstStepTo;
        })
      ) {
        fakeEntries.push([entry[0], firstStepTo]);
      }

      return fakeEntries;
    }, new Array<[string, string]>())
  );
  return Object.fromEntries(
    entries
      .filter(([key]) => !fakeSplits[key])
      .map(entry => {
        return [
          entry[0],
          {
            name: entry[0],
            steps: entry[1].steps.map(step => {
              if (typeof step == "string") return fakeSplits[step] || step;
              return {
                ...step,
                to: fakeSplits[step.to] || step.to
              };
            })
          }
        ] as const;
      })
  );
}

/**
 * clones constraint object
 */
function cloneConstraint(constraint: PathConstraint): PathConstraint {
  return {
    x: { ...constraint.x },
    m: { ...constraint.m },
    a: { ...constraint.a },
    s: { ...constraint.s }
  };
}

/**
 * gets overlap between two sets of constraints
 */
function combineConstraint(a: PathConstraint, b: PathConstraint) {
  const combinedConstraint: PathConstraint = {
    x: { min: Math.max(a.x.min, b.x.min), max: Math.min(a.x.max, b.x.max) },
    m: { min: Math.max(a.m.min, b.m.min), max: Math.min(a.m.max, b.m.max) },
    a: { min: Math.max(a.a.min, b.a.min), max: Math.min(a.a.max, b.a.max) },
    s: { min: Math.max(a.s.min, b.s.min), max: Math.min(a.s.max, b.s.max) }
  };

  return combinedConstraint;
}

/**
 * gets all possible values within constraint
 */
function sumOfConstraint(constraint: PathConstraint) {
  return (
    Math.max(0, constraint.x.max - constraint.x.min) *
    Math.max(0, constraint.m.max - constraint.m.min) *
    Math.max(0, constraint.a.max - constraint.a.min) *
    Math.max(0, constraint.s.max - constraint.s.min)
  );
}

// WIP
// FIXME: This gets a bunch of overlapping tree branches right now
const resolved: Partial<Record<string, PathConstraint[]>> = {};
function resolveWorkflow(key: string, workflows: PartWorkflowMap) {
  // try cache
  const cached = resolved[key];
  if (cached) return cached;

  // get workflow
  const workflow = workflows[key];
  if (!workflow) throw new Error("Could not find workflow");

  // init
  const paths = new Array<PathConstraint>();
  const constraint: PathConstraint = {
    x: { min: 1, max: 4000 },
    m: { min: 1, max: 4000 },
    a: { min: 1, max: 4000 },
    s: { min: 1, max: 4000 }
  };

  // explore
  for (const step of workflow.steps) {
    if (step === "A") {
      paths.push(cloneConstraint(constraint));
      break;
    }
    if (step === "R") {
      break;
    }
    if (typeof step === "string") {
      const branches = resolveWorkflow(step, workflows);
      for (const branch of branches) {
        const combinedConstraint = combineConstraint(constraint, branch);
        paths.push(combinedConstraint);
      }

      break;
    }

    // explore sidebranch
    switch (step.to) {
      case "A": {
        const branchConstraint = cloneConstraint(constraint);
        if (step.comparison == "larger") {
          branchConstraint[step.key].min = step.value + 1;
        } else {
          branchConstraint[step.key].max = step.value - 1;
        }
        paths.push(branchConstraint);
        break;
      }
      case "R": {
        break;
      }
      default: {
        const branches = resolveWorkflow(step.to, workflows);
        for (const branch of branches) {
          const combinedConstraint = combineConstraint(constraint, branch);
          paths.push(combinedConstraint);
        }
      }
    }

    // apply new constraint to inversion of step comparison
    if (step.comparison == "larger") {
      constraint[step.key].max = Math.min(constraint[step.key].max, step.value);
    } else {
      constraint[step.key].min = Math.max(constraint[step.key].min, step.value);
    }
  }

  return paths;
}

// TEMP: testing for overlapping branches
function DEBUG(resolved: PathConstraint[]) {
  for (let i = 0; i < resolved.length; i++) {
    for (let j = 0; j < resolved.length; j++) {
      if (i == j) continue;
      const a = resolved[i];
      const b = resolved[j];
      const overlapX = a.x.min < b.x.max && b.x.min < a.x.max;
      const overlapM = a.m.min < b.m.max && b.m.min < a.m.max;
      const overlapA = a.a.min < b.a.max && b.a.min < a.a.max;
      const overlapS = a.s.min < b.s.max && b.s.min < a.s.max;
      const overlap = overlapX && overlapM && overlapA && overlapS;
      if (overlap) {
        console.log(`${i} and ${j} overlap`);
      }
    }
  }
}

/**
 * Gets number of possible accepted sets of values (aka part 2 solution)
 */
export function getPossibleValues(workflows: PartWorkflowMap) {
  let wfCount = Object.values(workflows).length;
  let optimized: PartWorkflowMap = workflows;

  // run optimize until the length doesn't change
  while (
    wfCount > Object.values((optimized = optimizeWorkflows(optimized))).length
  ) {
    wfCount = Object.values(optimized).length;
  }

  // resolve "in" workflow into constraints
  const resolved = resolveWorkflow("in", optimized);

  DEBUG(resolved);

  console.log(JSON.stringify(resolved, null, 2));
  console.log(`${resolved.length} total branches`);

  return resolved.reduce<number>((sum, wf) => sum + sumOfConstraint(wf), 0);
}

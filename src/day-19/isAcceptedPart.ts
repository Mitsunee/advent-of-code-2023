import type { MachinePart, PartWorkflowMap } from "./types";

export function isAcceptedPart(part: MachinePart, workflows: PartWorkflowMap) {
  let workflow = workflows.in;

  while (workflow) {
    for (const step of workflow.steps) {
      // handle string
      if (step === "R") return false;
      if (step === "A") return true;
      if (typeof step == "string") {
        workflow = workflows[step];
        continue;
      }

      // handle branch
      const res =
        step.comparison == "larger"
          ? part[step.key] > step.value
          : part[step.key] < step.value;

      if (!res) continue;
      if (step.to === "R") return false;
      if (step.to === "A") return true;
      workflow = workflows[step.to];
      break;
    }
  }

  throw new Error(`Could not find workflow`);
}

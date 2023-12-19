export type MachinePart = Record<"x" | "m" | "a" | "s", number>;

export interface PartWorkflowBranch {
  key: Extract<keyof MachinePart, string>;
  comparison: "larger" | "smaller";
  value: number;
  to: "R" | "A" | string; // one day TypeScript will stop simplifying this to just string
}

export type PartWorkflowStep = PartWorkflowBranch | PartWorkflowBranch["to"];

export interface PartWorkflow {
  name: string;
  steps: PartWorkflowStep[];
}

export type PartWorkflowMap = Partial<Record<string, PartWorkflow>>;

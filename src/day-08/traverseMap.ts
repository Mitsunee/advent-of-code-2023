import type { MapNode, MapNodeLookup } from "./types";

function getInstruction(step: number, instructions: string) {
  const idx = step % instructions.length;
  const instruction = instructions[idx];
  return instruction == "L" ? "left" : "right";
}

export function createMapTraverser(
  instructions: string,
  lookup: MapNodeLookup
) {
  function traverseMap(
    start: MapNode,
    target: string | ((name: string) => boolean)
  ) {
    let step = 0;
    let node = start;
    const check =
      typeof target == "string" ? (name: string) => name == target : target;

    while (!check(node.name)) {
      const direction = getInstruction(step, instructions);
      const target = node[direction];
      const next = lookup.get(target);
      if (!next) {
        throw new Error(
          `Could not find target node '${target}' in direction ${direction} of node ${JSON.stringify(
            node
          )}`
        );
      }
      node = next;
      step++;
    }

    return step;
  }

  return traverseMap;
}

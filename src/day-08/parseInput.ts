import type { MapNodeLookup } from "./types";

function parseNode(nodeStr: string) {
  const match = nodeStr.match(/([a-z]{3}) = \(([a-z]{3}), ([a-z]{3})\)/i);
  if (!match) throw new Error(`Could not parse node: ${nodeStr}`);
  return {
    name: match[1],
    left: match[2],
    right: match[3]
  };
}

export function parseInput(input: string[]) {
  const [instructions, _, ...nodes] = input;
  if (!/^[LR]+$/.test(instructions)) throw new Error("Invalid instructions");

  const lookup: MapNodeLookup = new Map();

  for (const node of nodes) {
    const parsedNode = parseNode(node);
    //console.log(`Found node: ${JSON.stringify(parsedNode)}`);
    lookup.set(parsedNode.name, parsedNode);
  }

  return { instructions, lookup };
}

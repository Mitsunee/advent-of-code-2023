export interface MapNode {
  name: string;
  left: string;
  right: string;
}

export type MapNodeLookup = Map<string, MapNode>;

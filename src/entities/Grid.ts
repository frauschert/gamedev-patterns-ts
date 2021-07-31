import { createNode, Node } from "@/components";

export type Grid = Readonly<{
  type: "grid";
  components: Node[];
}>;

function initNode(size: number, offset: number, x: number, y: number): Node {
  const start = {
    x: x * (size + offset) + offset,
    y: y * (size + offset) + offset,
  };
  const end = {
    x: start.x + size,
    y: start.y + size,
  };
  const index = { x, y };
  return createNode(start, end, index);
}

export function createGrid(
  size: number,
  offset: number,
  dimension: number
): Grid {
  const dimensionArray = [...Array(dimension).keys()];
  const nodes = dimensionArray.flatMap((y) =>
    dimensionArray.map((x) => initNode(size, offset, x, y))
  );

  return { type: "grid", components: nodes };
}

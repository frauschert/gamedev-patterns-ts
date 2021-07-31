import { Vector2D } from "@/utils";

export type Node = Readonly<{
  type: "node";
  start: Vector2D;
  end: Vector2D;
  index: Vector2D;
  active: boolean;
}>;

export function createNode(
  start: Vector2D,
  end: Vector2D,
  index: Vector2D,
  active = false
): Node {
  return {
    type: "node",
    start,
    end,
    index,
    active,
  };
}

export function getSize(node: Node): Vector2D {
  return {
    x: node.end.x - node.start.x,
    y: node.end.y - node.start.y,
  };
}

export function getCenter(node: Node): Vector2D {
  const size = getSize(node);
  return {
    x: node.start.x + size.x / 2,
    y: node.start.y + size.y / 2,
  };
}

export function occupies(node: Node, point: Vector2D): boolean {
  if (point.x < node.start.x) {
    return false;
  }

  if (point.x > node.end.x) {
    return false;
  }

  if (point.y < node.start.y) {
    return false;
  }

  if (point.y > node.end.y) {
    return false;
  }

  return true;
}

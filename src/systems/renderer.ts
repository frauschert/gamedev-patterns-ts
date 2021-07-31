import { getSize, Node, occupies } from "@/components/Node";
import { Ship } from "@/components/Ship";
import { Fleet, Grid } from "@/entities";
import { Entity } from "@/entities/Entity";
import { Settings } from "@/settings";
import {
  calcLocalPoint,
  Canvas,
  clearRect,
  createBackground,
  createForeground,
  fillCircle,
  fillRect,
} from "@/utils";
import { System } from "@/utils/ecs/system.h";

function updateNode(n: Node, canvas: Canvas): void {
  const size = getSize(n);

  const color = n.active
    ? Settings.grid.color.active
    : Settings.grid.color.regular;

  clearRect(canvas, n.start, size);
  fillRect(canvas, n.start, size, color);
}

function updateShip(s: Ship, canvas: Canvas): void {
  const radius = Settings.ships.radius;
  const colors = Settings.ships.colors;
  const color = s.team === "A" ? colors.a : colors.b;

  clearRect(
    canvas,
    {
      x: s.position.x - Settings.grid.nodeSize / 2,
      y: s.position.y - Settings.grid.nodeSize / 2,
    },
    { x: Settings.grid.nodeSize, y: Settings.grid.nodeSize }
  );
  fillCircle(canvas, s.position, radius, color);
}

export function createRenderSystem(entities: Entity[]): System {
  const background = createBackground();
  const foreground = createForeground();

  const nodes = entities
    .filter((e): e is Grid => e.type === "grid")
    .flatMap((e) => e.components);
  const ships = entities
    .filter((e): e is Fleet => e.type === "fleet")
    .flatMap((e) => e.components);

  document.body.addEventListener("click", (e) => {
    console.log("Click");
    const point = calcLocalPoint(background, { x: e.clientX, y: e.clientY });
    if (point) {
      const index = nodes.findIndex((n) => occupies(n, point));
      if (index > -1) {
        const node = nodes[index];
        const toggleNode = { ...node, active: !node.active };
        nodes[index] = toggleNode;
      }
    }
  });

  return {
    update: (deltaTime: number): void => {
      nodes.forEach((n) => updateNode(n, background));
      ships.forEach((s) => updateShip(s, foreground));
    },
  };
}

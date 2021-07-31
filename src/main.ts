import { createFleet } from "./entities";
import { createGrid } from "./entities/Grid";
import { Settings } from "./settings";
import { createRenderSystem } from "./systems";

const size = Settings.grid.nodeSize;
const offset = Settings.grid.nodeOffset;
const dimension = Settings.grid.dimension;
const fleetSize = Settings.ships.fleetSize;

const grid = createGrid(size, offset, dimension);
const fleetA = createFleet("A", grid.components, dimension, fleetSize);
const fleetB = createFleet("B", grid.components, dimension, fleetSize);

function gameloop(): void {
  const entities = [grid, fleetA, fleetB];
  const systems = [createRenderSystem(entities)];

  const tick = (): void => {
    const now = new Date().getTime();

    systems.forEach((system) => system.update(now));

    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

gameloop();

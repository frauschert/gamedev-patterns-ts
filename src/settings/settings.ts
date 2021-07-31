import { createColor } from "@/utils";

const regularColor = createColor(245, 245, 245, 1);
const activeColor = createColor(176, 190, 197, 1);

export const Settings = Object.freeze({
  grid: {
    dimension: 6,
    nodeSize: 100,
    nodeOffset: 10,
    color: {
      regular: regularColor,
      active: activeColor,
    },
  },
  ships: {
    fleetSize: 3,
    radius: 40,
    colors: {
      a: createColor(187, 222, 251, 1),
      b: createColor(255, 236, 179, 1),
    },
  },
});

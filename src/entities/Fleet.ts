import { Ship } from "@/components/Ship";
import { Team } from "@/utils";
import { Node, getCenter } from "@/components/Node";

export type Fleet = Readonly<{
  type: "fleet";
  components: Ship[];
}>;

export function createFleet(
  team: Team,
  nodes: Node[],
  dimension: number,
  fleetSize: number
): Fleet {
  const fleetSizeArray = [...Array(fleetSize).keys()];
  const ships = fleetSizeArray.map(
    (i): Ship => {
      const node =
        team === "A"
          ? nodes[i * dimension]
          : nodes[nodes.length - 1 - i * dimension];
      return { type: "ship", position: getCenter(node), team: team };
    }
  );

  return { type: "fleet", components: ships };
}

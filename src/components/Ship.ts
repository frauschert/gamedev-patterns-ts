import { Team, Vector2D } from "@/utils";

export type Ship = Readonly<{
  type: "ship";
  position: Vector2D;
  team: Team;
}>;

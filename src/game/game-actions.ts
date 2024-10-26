import { Vector } from "../lib/vector.ts";

export enum PlayerActionType {
  Pass,
  PlaceUnits,
  Attack,
}

export type UnitPlacement = {
  targetField: Vector;
  units: number;
};

export type PlayerAction =
  | {
    type: PlayerActionType.Pass;
  }
  | {
    type: PlayerActionType.PlaceUnits;
    playerId: number;
    unitPlacement: UnitPlacement;
  }
  | {
    type: PlayerActionType.Attack;
  };

export type TurnActions = PlayerAction[];

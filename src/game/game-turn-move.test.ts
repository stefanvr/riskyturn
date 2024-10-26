import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { PlayerAction, PlayerActionType } from "./game-actions.ts";
import { Vector } from "../lib/vector.ts";
import { minimalGame } from "./test-game-states.ts";
import { applyGameMove } from "./game-turn-move.ts";

describe("applyGameMove (valid actions)", () => {
  describe("PlaceUnit", () => {
    const inState = structuredClone(minimalGame);
    const action: PlayerAction = {
      type: PlayerActionType.PlaceUnits,
      playerId: 1,
      unitPlacement: {
        targetField: new Vector(1, 0),
        units: 2,
      },
    };
    const outState = applyGameMove(inState, action);

    it("Unit placed on assigned field", () => {
      assertEquals(outState.mapStatus.fields[0][1].units, 2);
    });

    it("NoF placement units (2), deducted with 2 to zero ", () => {
      assertEquals(outState.playersStatus[action.playerId].placeableUnits, 0);
    });
  });
});

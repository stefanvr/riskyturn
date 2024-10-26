import { GameConfig, MapConfig, Player } from "./game-config.ts";
import {
  FieldStatus,
  GamePhase,
  GameState,
  MapStatus,
  type PlayersStatus,
} from "./game-state.ts";
import { updatePlayerStats } from "./game-turn-update-stats.ts";

export class GameBuilder {
  public createGame(config: GameConfig): GameState {
    const gs: GameState = {
      gameStatus: { phase: GamePhase.placing },
      playersStatus: this.createPlayerState(config.players),
      mapStatus: this.createMapStatus(config.mapConfig),
    };
    updatePlayerStats(gs);
    return gs;
  }

  createPlayerState(players: Player[]): PlayersStatus {
    const ps: PlayersStatus = {};
    players.forEach((player) => {
      ps[player.id] = {
        playerId: player.id,
        placeableUnits: 2,
        mapDomination: 0,
      };
    });

    return ps;
  }

  createMapStatus(config: MapConfig): MapStatus {
    const fields: FieldStatus[][] = [];

    for (const cc of config.fields) {
      const column: FieldStatus[] = [];
      for (const field of cc) {
        column.push({
          fieldType: field.fieldType,
          playerId: field.playerId || null,
          units: 0,
        });
      }
      fields.push(column);
    }

    return { fields };
  }
}

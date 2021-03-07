import { GameClient } from "./clients/game-client.js";
import { ActorstatsClient } from "./clients/actorstats-client.js";
import { PlayerstatsUpdater } from "./updaters/actorstats-updater.js";
import { DamageCalculator } from "./calculators/damage-calculator.js";
import { GlobalsProvider } from "./globals-provider.js";

// CONFIG.debug.hooks = true;
const damageCalculator = new DamageCalculator();
const globalsProvider = new GlobalsProvider();
const gameClient = new GameClient(globalsProvider);
const actorstatsClient = new ActorstatsClient(globalsProvider);
const actorstatsUpdater = new PlayerstatsUpdater(damageCalculator, actorstatsClient, globalsProvider);

Hooks.on('ready', () => {
  if (!globalsProvider.selfIsGM) {
    return;
  }
  gameClient.postCreateGame();
});

Hooks.on("updateCombat", () => {
  if (!globalsProvider.selfIsGM) {
    return;
  }
  actorstatsUpdater.initialize(CombatEncounters.instance.active);
  actorstatsUpdater.updateActorStats(CombatEncounters.instance.active);
});

Hooks.on("preDeleteCombat", () => {
  if (!globalsProvider.selfIsGM) {
    return;
  }
  actorstatsUpdater.cleanEncounter();
});

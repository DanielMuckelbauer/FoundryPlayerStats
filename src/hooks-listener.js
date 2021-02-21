import { GameClient } from "./game-client.js";
import { PlayerstatsUpdater } from "./playerstats-updater.js";
import { DamageCalculator } from "./damage-calculator.js";
import { GlobalsProvider } from "./globals-provider.js";
import { PlayerstatsClient } from "./playerstats-client.js";

// CONFIG.debug.hooks = true;
const damageCalculator = new DamageCalculator();
const globalsProvider = new GlobalsProvider();
const gameClient = new GameClient(globalsProvider);
const playerstatsClient = new PlayerstatsClient(globalsProvider);
const playerstatsUpdater = new PlayerstatsUpdater(damageCalculator, playerstatsClient, globalsProvider);

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
  playerstatsUpdater.initialize(CombatEncounters.instance.active);
  playerstatsUpdater.updatePlayerStats(CombatEncounters.instance.active);
});

Hooks.on("preDeleteCombat", () => {
  if (!globalsProvider.selfIsGM) {
    return;
  }
  playerstatsUpdater.cleanEncounter();
});

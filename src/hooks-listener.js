import { GameClient } from "./game-client.js";
import { PlayerstatsUpdater } from "./playerstats-updater.js";
import { DamageCalculator } from "./damage-calculator.js";
import { GlobalsProvider } from "./globals-provider.js";
import { PlayerstatsClient } from "./playerstats-client.js";

// eslint-disable-next-line no-undef
// CONFIG.debug.hooks = true;
const damageCalculator = new DamageCalculator();
const globalsProvider = new GlobalsProvider();
const gameClient = new GameClient(globalsProvider);
const playerstatsClient = new PlayerstatsClient(globalsProvider);
const playerstatsUpdater = new PlayerstatsUpdater(damageCalculator, playerstatsClient, globalsProvider);

Hooks.on('ready', () => {
  gameClient.postCreateGame();
});

Hooks.on("updateCombat", () => {
  playerstatsUpdater.initialize(CombatEncounters.instance.active);
  playerstatsUpdater.updatePlayerStats(CombatEncounters.instance.active);
});

Hooks.on("preDeleteCombat", () => {
  playerstatsUpdater.cleanEncounter();
});

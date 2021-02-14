import { GameClient } from "./game-client.js";
import { PlayerstatsUpdater } from "./playerstats-updater.js";
import { DamageCalculator } from "./damage-calculator.js";
import { GlobalsProvider } from "./globals-provider.js";
import { PlayerstatsClient } from "./playerstats-client.js";

// CONFIG.debug.hooks = true
const damageCalculator = new DamageCalculator();
const globalsProvider = new GlobalsProvider();
const gameCreator = new GameClient(globalsProvider);
const playerstatsClient = new PlayerstatsClient(globalsProvider);
const playerstatsUpdater = new PlayerstatsUpdater(damageCalculator, playerstatsClient, globalsProvider);

Hooks.on('ready', () => {
  gameCreator.postCreateGame(game.data.world.id);
  playerstatsUpdater.initialize(CombatEncounters.instance.active);
});

Hooks.on("updateCombat", () => {
  console.log('updateCombat');
  playerstatsUpdater.updatePlayerStats(CombatEncounters.instance.active);
});

Hooks.on("getCombatTrackerEntryContext", () => {
  console.log('getCombatTrackerEntry');
});

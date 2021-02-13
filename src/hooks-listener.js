import { GameCreator } from "./game-creator.js";
import { PlayerstatsUpdater } from "./playerstats-updater.js";
import { DamageCalculator } from "./damage-calculator.js";


// CONFIG.debug.hooks = true
const damageCalculator = new DamageCalculator();
const gameCreator = new GameCreator();
const playerStatsUpdater = new PlayerstatsUpdater(damageCalculator);

Hooks.on('ready', () => {
  gameCreator.createGame();
  playerStatsUpdater.initialize();
});

Hooks.on("updateCombat", () => {
  console.log('updateCombat');
  playerStatsUpdater.updatePlayerStats();
});

Hooks.on("getCombatTrackerEntryContext", () => {
  console.log('getCombatTrackerEntry');
  //console.log('combatant1', JSON.stringify(CombatEncounters.instance.active.combatant));
});

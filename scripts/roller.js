CONFIG.debug.hooks = true


console.log("Hello World! This code runs immediately when the file is loaded.");

Hooks.on("init", function() {
  console.log("This code runs once the Foundry VTT software begins it's initialization workflow.");
});

Hooks.on("ready", function() {
  console.log(`Combis ${JSON.stringify(CombatEncounters.instance)}`);
});
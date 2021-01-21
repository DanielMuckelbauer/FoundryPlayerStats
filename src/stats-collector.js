'use strict'
import { statsCollectorUrl } from "../data/endpoints.js";

//CONFIG.debug.hooks = true

Hooks.on('ready', () => {
  createGame();
});

Hooks.on("renderCombatTracker", () => {
  
});

function createGame() {
  const gameId = game.data.world.id;

  var requestOptions = {
    method: 'POST'
  };
  
  fetch(`${statsCollectorUrl}/api/games/${gameId}`, requestOptions)
    .then(response => {
      console.log('response', response.json());
    })
    .catch(error => console.log('error', error));
}
'use strict'
import { statsCollectorUrl } from "../data/endpoints.js";

Hooks.on('ready', () => {
  createGame();
});

Hooks.on("renderCombatTracker", () => {
  
});

function createGame() {
  fetch(`${statsCollectorUrl}/games/foundryTest`, {
    headers: new Headers([['Access-Control-Allow-Origin', '*']]),
    method: 'post',
    body: ''
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    ChromeSamples.log('Created Gist:', data.html_url);
  });
}
'use strict'

Hooks.on('ready', () => {
  console.log('yo');
});

Hooks.on("renderCombatTracker", () => {
  fetch("https://httpbin.org/get")
    .then(function (response) {
      console.log(`first body ${JSON.stringify(myJson)}`);
      return response.json();
    })
    .then(function (myJson) {
      console.log(`RestTest ${JSON.stringify(myJson)}`);
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
});
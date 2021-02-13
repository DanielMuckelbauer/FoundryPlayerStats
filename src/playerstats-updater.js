import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';

export class PlayerstatsUpdater {
    copyOfEncounterAtTheBeginningOfTurn;

    constructor(damageCalculator) {
        this.damageCalculator = damageCalculator;
    }

    initialize(activeCombatInstance) {
        if (!this.copyOfEncounterAtTheBeginningOfTurn) {
            this.copyOfEncounterAtTheBeginningOfTurn = cloneDeep(activeCombatInstance);
        }
    }

    updatePlayerStats(activeCombatInstance) {
        const lastCombatant = this.copyOfEncounterAtTheBeginningOfTurn.combatant;
        const currentCombatant = activeCombatInstance.combatant;
        if (currentCombatant === lastCombatant) {
            return;
        }
        const damageDealt = this.damageCalculator.calculateDamageDealt(this.copyOfEncounterAtTheBeginningOfTurn, activeCombatInstance);
        const damageTaken = this.damageCalculator.calculateDamageTaken(this.copyOfEncounterAtTheBeginningOfTurn, activeCombatInstance);

        this.postUpdatedPlayerStats(damageDealt, damageTaken);

        this.copyOfEncounterAtTheBeginningOfTurn = cloneDeep(activeCombatInstance);
    }

    postUpdatedPlayerStats(damageDealt, damageTaken) {
        console.log('name', this.copyOfEncounterAtTheBeginningOfTurn.combatant.actor.name);
        console.log('damageTaken', damageTaken);
        console.log('damageDealt', damageDealt);
    }
}
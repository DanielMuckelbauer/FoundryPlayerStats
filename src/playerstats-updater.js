import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';

export class PlayerstatsUpdater {
    copyOfEncounterAtTheBeginningOfTurn;

    constructor(damageCalculator) {
        this.damageCalculator = damageCalculator;
    }

    initialize() {
        if (!this.copyOfEncounterAtTheBeginningOfTurn) {
            this.copyOfEncounterAtTheBeginningOfTurn = cloneDeep(CombatEncounters.instance.active);
        }
    }

    updatePlayerStats() {
        const lastCombatant = this.copyOfEncounterAtTheBeginningOfTurn.combatant;
        const currentCombatant = CombatEncounters.instance.active.combatant;
        if (currentCombatant === lastCombatant) {
            return;
        }
        const damageDealt = this.damageCalculator.calculateDamageDealt(this.copyOfEncounterAtTheBeginningOfTurn, CombatEncounters.instance.active);
        const damageTaken = this.damageCalculator.calculateDamageTaken(this.copyOfEncounterAtTheBeginningOfTurn, CombatEncounters.instance.active);

        this.postUpdatedPlayerStats(damageDealt, damageTaken);

        this.copyOfEncounterAtTheBeginningOfTurn = cloneDeep(CombatEncounters.instance.active);
    }

    postUpdatedPlayerStats(damageDealt, damageTaken) {
        console.log('name', this.copyOfEncounterAtTheBeginningOfTurn.combatant.actor.name);
        console.log('damageTaken', damageTaken);
        console.log('damageDealt', damageDealt);
    }
}
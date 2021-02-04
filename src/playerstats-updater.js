import cloneDeep from '../node_modules/lodash-es/cloneDeep.js'

export class PlayerstatsUpdater {
    copyOfEncounterAtTheBeginningOfTurn;

    updatePlayerStats() {
        const lastCombatant = this.copyOfEncounterAtTheBeginningOfTurn.combatant;
        const currentCombatant = CombatEncounters.instance.active.combatant;
        if (currentCombatant === lastCombatant) {
            return;
        }
        const damageDealt = this.calculateDamageDealt();
        const damageTaken = this.calculateDamageTaken();

        this.postUpdatedPlayerStats(damageDealt, damageTaken);

        this.copyOfEncounterAtTheBeginningOfTurn = cloneDeep(CombatEncounters.instance.active);
    }

    initialize() {
        if (!this.copyOfEncounterAtTheBeginningOfTurn) {
            this.copyOfEncounterAtTheBeginningOfTurn = cloneDeep(CombatEncounters.instance.active);
        }
    }

    postUpdatedPlayerStats(damageDealt, damageTaken) {
        console.log('name', this.copyOfEncounterAtTheBeginningOfTurn.combatant.actor.name);
        console.log('damageTaken', damageTaken);
        console.log('damageDealt', damageDealt);
    }

    calculateDamageDealt() {
        const sumOfNpcHealthAtStartOfTurn = this.calculateSumOfHealth(this.copyOfEncounterAtTheBeginningOfTurn, 'npc');
        const sumOfNpcHealthAtEndOfTurn = this.calculateSumOfHealth(CombatEncounters.instance.active, 'npc');
        return sumOfNpcHealthAtStartOfTurn - sumOfNpcHealthAtEndOfTurn;
    }

    calculateDamageTaken() {
        const lastCombatantsCurrentHp = CombatEncounters.instance.active.combatants
            .find(combatant => combatant._id === this.copyOfEncounterAtTheBeginningOfTurn.combatant._id).actor.data.data.attributes.hp.value;
        const lastCombatantsHpAtBeginningOfHisTurn = this.copyOfEncounterAtTheBeginningOfTurn.combatant 
            .actor.data.data.attributes.hp.value;
        return lastCombatantsHpAtBeginningOfHisTurn - lastCombatantsCurrentHp;
    }

    calculateSumOfHealth(gameState, actorType) {
        const npcCombatants = gameState.combatants
            .filter(combatant => combatant.actor.data.type === actorType);
        return npcCombatants.reduce((hpSum, npc) => hpSum += npc.actor.data.data.attributes.hp.value, 0)
    }
}
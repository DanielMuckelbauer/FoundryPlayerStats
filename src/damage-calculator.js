export class DamageCalculator {
    calculateDamageDealt(combatEncounterLastTurn, activeCombatEncounter) {
        const sumOfNpcHealthAtStartOfTurn = this.calculateSumOfHealth(combatEncounterLastTurn, 'npc');
        const sumOfNpcHealthAtEndOfTurn = this.calculateSumOfHealth(activeCombatEncounter, 'npc');
        return sumOfNpcHealthAtStartOfTurn - sumOfNpcHealthAtEndOfTurn;
    }

    calculateDamageTaken(combatEncounterLastTurn, activeCombatEncounter) {
        const lastCombatantsCurrentHp = activeCombatEncounter.combatants
            .find(combatant => combatant._id === combatEncounterLastTurn.combatant._id)
            .actor.data.data.attributes.hp.value;
        const lastCombatantsHpAtBeginningOfHisTurn = combatEncounterLastTurn.combatant 
            .actor.data.data.attributes.hp.value;
        return lastCombatantsHpAtBeginningOfHisTurn - lastCombatantsCurrentHp;
    }

    calculateSumOfHealth(gameState, actorType) {
        const npcCombatants = gameState.combatants
            .filter(combatant => combatant.actor.data.type === actorType);
        return npcCombatants.reduce((hpSum, npc) => hpSum += npc.actor.data.data.attributes.hp.value, 0);
    }
}
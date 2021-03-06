export class DamageCalculator {
    calculateDamageDealt(combatEncounterLastTurn, activeCombatEncounter) {
        const actorTypeOfLastCombatantsEnemy = this.getActorTypeOfLastCombatantsEnemy(combatEncounterLastTurn);
        const sumOfEnemiesHealthAtStartOfTurn = this.calculateSumOfHealth(combatEncounterLastTurn, actorTypeOfLastCombatantsEnemy);
        const sumOfEnemiesHealthAtEndOfTurn = this.calculateSumOfHealth(activeCombatEncounter, actorTypeOfLastCombatantsEnemy);
        return sumOfEnemiesHealthAtStartOfTurn - sumOfEnemiesHealthAtEndOfTurn;
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

    getActorTypeOfLastCombatantsEnemy(combatEncounterLastTurn) {
        return combatEncounterLastTurn.combatant.actor.data.type === 'npc'
            ? 'character'
            : 'npc';
    }
}
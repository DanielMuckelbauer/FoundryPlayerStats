export class DamageCalculator {
    calculateDamageDealt(combatEncounterLastTurn, activeCombatEncounter) {
        const actorTypeOfLastCombatantsEnemy = this.getActorTypeOfLastCombatantsEnemy(combatEncounterLastTurn);
        const sumOfEnemiesHealthAtStartOfTurn = this.calculateActorTypesSumOfHealth(combatEncounterLastTurn.combatants, actorTypeOfLastCombatantsEnemy);
        const sumOfEnemiesHealthAtEndOfTurn = this.calculateActorTypesSumOfHealth(activeCombatEncounter.combatants, actorTypeOfLastCombatantsEnemy);
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

    calculateHealingDone(combatEncounterLastTurn, activeCombatEncounter) {
        const actorTypeOfLastCombatant = combatEncounterLastTurn.combatant.actor.data.type;
        const healthOfActiveCombatant = combatEncounterLastTurn.combatant.actor.data.data.attributes.hp.value;
        const sumOfAlliesHealthAtStartOfTurn = this.calculateActorTypesSumOfHealth(combatEncounterLastTurn.combatants, actorTypeOfLastCombatant);
        const sumOfAlliesHealthAtEndOfTurn = this.calculateActorTypesSumOfHealth(activeCombatEncounter.combatants, actorTypeOfLastCombatant);
        const difference = sumOfAlliesHealthAtEndOfTurn + healthOfActiveCombatant - sumOfAlliesHealthAtStartOfTurn;
        return difference > 0
            ? difference
            : 0;
    }

    calculateActorTypesSumOfHealth(combatants, actorType) {
        const combatantsOfActorType = combatants
            .filter(combatant => combatant.actor.data.type === actorType);
        return combatantsOfActorType.reduce((hpSum, npc) => hpSum += npc.actor.data.data.attributes.hp.value, 0);
    }

    getActorTypeOfLastCombatantsEnemy(combatEncounterLastTurn) {
        return combatEncounterLastTurn.combatant.actor.data.type === 'npc'
            ? 'character'
            : 'npc';
    }
}
export class HealthChangeCalculator {
    calculateDamageDealt(combatEncounterLastTurn, activeCombatEncounter) {
        const actorTypeOfLastCombatantsEnemy = this.getActorTypeOfLastCombatantsEnemy(combatEncounterLastTurn);
        const sumOfEnemiesHealthAtStartOfTurn = this.calculateActorTypesSumOfHealth(combatEncounterLastTurn.combatants, actorTypeOfLastCombatantsEnemy);
        const sumOfEnemiesHealthAtEndOfTurn = this.calculateActorTypesSumOfHealth(activeCombatEncounter.combatants, actorTypeOfLastCombatantsEnemy);
        return this.differenceOrZero(sumOfEnemiesHealthAtStartOfTurn, sumOfEnemiesHealthAtEndOfTurn);
    }

    calculateDamageTaken(combatEncounterLastTurn, activeCombatEncounter) {
        const lastCombatantsCurrentHp = activeCombatEncounter.combatants
            .find(combatant => combatant._id === combatEncounterLastTurn.combatant._id)
            .actor.data.data.attributes.hp.value;
        const lastCombatantsHpAtBeginningOfHisTurn = combatEncounterLastTurn.combatant
            .actor.data.data.attributes.hp.value;
        return this.differenceOrZero(lastCombatantsHpAtBeginningOfHisTurn, lastCombatantsCurrentHp);
    }

    calculateHealingDone(combatEncounterLastTurn, activeCombatEncounter) {
        const actorTypeOfLastCombatant = combatEncounterLastTurn.combatant.actor.data.type;
        const sumOfAlliesHealthAtStartOfTurn = this.calculateActorTypesSumOfHealth(combatEncounterLastTurn.combatants, actorTypeOfLastCombatant);
        const sumOfAlliesHealthAtEndOfTurn = this.calculateActorTypesSumOfHealth(activeCombatEncounter.combatants, actorTypeOfLastCombatant);
        return this.differenceOrZero(sumOfAlliesHealthAtEndOfTurn, sumOfAlliesHealthAtStartOfTurn);
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

    differenceOrZero(supposedBiggerNumber, supposedSmallerNumber) {
        const difference = supposedBiggerNumber - supposedSmallerNumber;
        return difference > 0
            ? difference
            : 0;
    }
}
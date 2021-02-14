import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';

export class PlayerstatsUpdater {
    copyOfLastCombat;

    constructor(damageCalculator) {
        this.damageCalculator = damageCalculator;
    }

    initialize(activeCombatInstance) {
        if (!this.copyOfLastCombat) {
            this.copyOfLastCombat = cloneDeep(activeCombatInstance);
        }
    }

    updatePlayerStats(currentCombat) {
        if (!this.combatantHasChanged(currentCombat)) {
            return;
        }
        const damageStats = this.calculateDamageStats(this.copyOfLastCombat, currentCombat);
        this.postPlayerStats(damageStats, this.copyOfLastCombat.combatant.actor.name);
        this.copyOfLastCombat = cloneDeep(currentCombat);
    }

    
    combatantHasChanged(activeCombatInstance) {
        const lastCombatant = this.copyOfLastCombat.combatant;
        const currentCombatant = activeCombatInstance.combatant;
        return currentCombatant !== lastCombatant;
    }

    calculateDamageStats(copyOfLastCombat, activeCombatInstance) {
        const damageDealt = this.damageCalculator.calculateDamageDealt(copyOfLastCombat, activeCombatInstance);
        const damageTaken = this.damageCalculator.calculateDamageTaken(copyOfLastCombat, activeCombatInstance);
        return { damageDealt, damageTaken };
    }

    postPlayerStats(damageStats, combatantName) {
        console.log('name', combatantName);
        console.log('damageTaken', damageStats.damageTaken);
        console.log('damageDealt', damageStats.damageDealt);
    }
}
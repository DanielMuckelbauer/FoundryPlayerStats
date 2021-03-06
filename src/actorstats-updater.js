import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';

export class PlayerstatsUpdater {
    damageCalculator;
    actorstatsClient;
    globalsProvider;

    copyOfLastCombat;

    constructor(damageCalculator, ActorstatsClient, globalsProvider) {
        this.damageCalculator = damageCalculator;
        this.actorstatsClient = ActorstatsClient;
        this.globalsProvider = globalsProvider;
    }

    initialize() {
        if (!this.copyOfLastCombat?.combatant) {
            this.copyOfLastCombat = cloneDeep(this.globalsProvider.activeCombat);
        }
    }

    cleanEncounter() {
        this.copyOfLastCombat = null;
    }

    updateActorStats() {
        const currentCombat = this.globalsProvider.activeCombat;
        if (!currentCombat || !this.combatantHasChanged(currentCombat)) {
            return;
        }
        const damageStats = this.calculateDamageStats(this.copyOfLastCombat, currentCombat);
        this.putActorStats(damageStats, this.copyOfLastCombat.combatant.actor);
        this.copyOfLastCombat = cloneDeep(currentCombat);
    }

    combatantHasChanged(activeCombatInstance) {
        if (!this.copyOfLastCombat) {
            return;
        }
        const lastCombatant = this.copyOfLastCombat.combatant;
        const currentCombatant = activeCombatInstance.combatant;
        return currentCombatant !== lastCombatant;
    }

    calculateDamageStats(copyOfLastCombat, activeCombatInstance) {
        const damageDealt = this.damageCalculator.calculateDamageDealt(copyOfLastCombat, activeCombatInstance);
        const damageTaken = this.damageCalculator.calculateDamageTaken(copyOfLastCombat, activeCombatInstance);
        return { damageDealt, damageTaken };
    }

    putActorStats(damageStats, combatantActor) {
        const actorstats = {
            characterName: combatantActor.name,
            characterId: combatantActor._id,
            damageDealt: damageStats.damageDealt,
            damageTaken: damageStats.damageTaken,
            gameName: this.globalsProvider.gameName
        };

        this.actorstatsClient.sendActorStats(actorstats);
    }
}

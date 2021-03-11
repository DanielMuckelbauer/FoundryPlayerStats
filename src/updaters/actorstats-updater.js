import cloneDeep from '../../node_modules/lodash-es/cloneDeep.js';

export class PlayerstatsUpdater {
    healthChangeCalculator;
    actorstatsClient;
    globalsProvider;

    copyOfLastCombat;

    constructor(healthChangeCalculator, ActorstatsClient, globalsProvider) {
        this.healthChangeCalculator = healthChangeCalculator;
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
        const healthStats = this.calculateHealthStats(this.copyOfLastCombat, currentCombat);
        this.putActorStats(healthStats, this.copyOfLastCombat.combatant.actor);
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

    calculateHealthStats(copyOfLastCombat, activeCombatInstance) {
        const damageDealt = this.healthChangeCalculator.calculateDamageDealt(copyOfLastCombat, activeCombatInstance);
        const damageTaken = this.healthChangeCalculator.calculateDamageTaken(copyOfLastCombat, activeCombatInstance);
        const healingDone = this.healthChangeCalculator.calculateHealingDone(copyOfLastCombat, activeCombatInstance);
        return { damageDealt, damageTaken, healingDone };
    }

    putActorStats(healthStats, combatantActor) {
        const actorstats = {
            characterName: combatantActor.name,
            characterId: combatantActor._id,
            damageDealt: healthStats.damageDealt,
            damageTaken: healthStats.damageTaken,
            healingDone: healthStats.healingDone,
            gameName: this.globalsProvider.gameName
        };

        this.actorstatsClient.sendActorStats(actorstats);
    }
}
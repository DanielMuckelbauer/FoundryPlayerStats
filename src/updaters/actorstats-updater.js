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
            this.copyOfLastCombat = this.copyCombat(this.globalsProvider.activeCombat);
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
        this.putActorStats(healthStats, this.copyOfLastCombat.combatant);
        this.copyOfLastCombat = this.copyCombat(currentCombat);
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

    putActorStats(healthStats, combatant) {
        const actorstats = {
            characterName: combatant.name,
            characterId: combatant._id,
            damageDealt: healthStats.damageDealt,
            damageTaken: healthStats.damageTaken,
            healingDone: healthStats.healingDone,
            gameName: this.globalsProvider.gameName
        };

        this.actorstatsClient.sendActorStats(actorstats);
    }

    copyCombat(combat) {
        const currentCombatant = {
            id: combat.combatant.actor._id,
            name: combat.combatant.actor.name,
            health: combat.combatant.actor.data.data.attributes.hp.value,
            type: combat.combatant.actor.data.type
        };
        const otherCombatants = combat.combatants.map(combatant => ({
            id: combatant.actor._id,
            name: combatant.actor.name,
            health: combatant.actor.data.attributes.hp.value,
        }));
        return { currentCombatant, otherCombatants };
    }
}
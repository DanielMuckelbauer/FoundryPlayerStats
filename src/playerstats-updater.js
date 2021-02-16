import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';

export class PlayerstatsUpdater {
    damageCalculator;
    playerstatsClient;
    globalsProvider;

    copyOfLastCombat;

    constructor(damageCalculator, playerstatsClient, globalsProvider) {
        this.damageCalculator = damageCalculator;
        this.playerstatsClient = playerstatsClient;
        this.globalsProvider = globalsProvider;
    }

    initialize() {
        if (!this.copyOfLastCombat) {
            this.copyOfLastCombat = cloneDeep(this.globalsProvider.activeCombat);
        }
    }

    cleanEncounter() {
        this.copyOfLastCombat = null;
    }

    updatePlayerStats() {
        const currentCombat = this.globalsProvider.activeCombat;
        if (!this.combatantHasChanged(currentCombat)) {
            return;
        }
        const damageStats = this.calculateDamageStats(this.copyOfLastCombat, currentCombat);
        this.putPlayerStats(damageStats, this.copyOfLastCombat.combatant.actor);
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

    putPlayerStats(damageStats, combatantActor) {
        const playerstats = {
            characterName: combatantActor.name,
            characterId: combatantActor._id,
            damageDealt: damageStats.damageDealt,
            damageTaken: damageStats.damageTaken,
            gameName: this.globalsProvider.gameName
        };

        this.playerstatsClient.sendPlayerstats(playerstats);
    }
}
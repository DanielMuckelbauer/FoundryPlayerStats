export class GlobalsProvider {
    get activeCombat() {
        return CombatEncounters.instance.active;
    }

    get gameName() {
        return game.data.world.id;
    }
}
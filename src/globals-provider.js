export class GlobalsProvider {
    get activeCombat() {
        return CombatEncounters.instance.active;
    }

    get gameName() {
        return game.data.world.id;
    }

    get selfIsGM() {
        return Boolean(Users.instance.entries
            .find(user => user.isGM && user.isSelf));
    }
}
import { beforeEach } from '@jest/globals';
import { DamageCalculator } from '../src/damage-calculator';
import { PlayerstatsUpdater } from '../src/playerstats-updater';
import { jest } from '@jest/globals';

let playerstatsUpdater;
let damageCalculator;

beforeEach(() => {
    damageCalculator = new DamageCalculator();
    playerstatsUpdater = new PlayerstatsUpdater(damageCalculator);
});

test('initializes with copy of currently active encounter', () => {
    const activeCombat = { name: 'name' };

    playerstatsUpdater.initialize(activeCombat);

    expect(playerstatsUpdater.copyOfLastCombat).toEqual(activeCombat);
    expect(playerstatsUpdater.copyOfLastCombat).not.toBe(activeCombat);
});

test('stores a copy of the new combat encounter  ', () => {
    playerstatsUpdater.copyOfLastCombat = {
        combatant: {
            actor: { name: 'lastCombatant' }
        }
    };
    const newCombat = { combatant: 'newCombatant' };
    jest.spyOn(damageCalculator, 'calculateDamageDealt').mockReturnValue(1);
    jest.spyOn(damageCalculator, 'calculateDamageTaken').mockReturnValue(1);

    playerstatsUpdater.updatePlayerStats(newCombat);

    expect(playerstatsUpdater.copyOfLastCombat).toEqual(newCombat);
    expect(playerstatsUpdater.copyOfLastCombat).not.toBe(newCombat);
});

test('does nothing if combatant is the same', () => {
    const newCombat = { combatant: 'combatant' };
    const savedCombat = { combatant: 'combatant' };
    playerstatsUpdater.copyOfLastCombat = savedCombat;

    playerstatsUpdater.updatePlayerStats(newCombat);

    expect(playerstatsUpdater.copyOfLastCombat).toEqual(savedCombat);   
});
import { jest } from '@jest/globals';
import { DamageCalculator } from '../calculators/damage-calculator';
import { PlayerstatsUpdater } from './actorstats-updater';
import { ActorstatsClient } from '../clients/actorstats-client';
import { GlobalsProvider } from '../globals-provider';

let actorstatsUpdater;
let damageCalculator;
let actorstatsClient;
let globalsProvider;

beforeEach(() => {
    damageCalculator = new DamageCalculator();
    actorstatsClient = new ActorstatsClient();
    globalsProvider = new GlobalsProvider();
    actorstatsUpdater = new PlayerstatsUpdater(damageCalculator, actorstatsClient, globalsProvider);
});

test('initializes with copy of currently active encounter', () => {
    const activeCombat = { name: 'name' };
    jest.spyOn(globalsProvider, 'activeCombat', 'get').mockImplementation(() => activeCombat);

    actorstatsUpdater.initialize();

    expect(actorstatsUpdater.copyOfLastCombat).toEqual(activeCombat);
    expect(actorstatsUpdater.copyOfLastCombat).not.toBe(activeCombat);
});

test('overwrites last combat on init if last combat has no combatant', () => {
    actorstatsUpdater.copyOfLastCombat = { name: 'last combat without combatant property' };
    const activeCombat = { name: 'name' };
    jest.spyOn(globalsProvider, 'activeCombat', 'get').mockImplementation(() => activeCombat);

    actorstatsUpdater.initialize();

    expect(actorstatsUpdater.copyOfLastCombat).toEqual(activeCombat);
    expect(actorstatsUpdater.copyOfLastCombat).not.toBe(activeCombat);
});

test('does not overwrite last combat on init if it already has a combatant property', () => {
    actorstatsUpdater.copyOfLastCombat = { combatant: 'last combat with combatant property' };
    const activeCombat = { name: 'name' };
    jest.spyOn(globalsProvider, 'activeCombat', 'get').mockImplementation(() => activeCombat);

    actorstatsUpdater.initialize();

    expect(actorstatsUpdater.copyOfLastCombat).toBe(actorstatsUpdater.copyOfLastCombat);
});

test('stores a copy of the new combat encounter', () => {
    actorstatsUpdater.copyOfLastCombat = {
        combatant: {
            actor: { name: 'lastCombatant' }
        }
    };
    const newCombat = { combatant: 'newCombatant' };
    jest.spyOn(globalsProvider, 'activeCombat', 'get').mockImplementation(() => newCombat);
    jest.spyOn(damageCalculator, 'calculateDamageDealt').mockReturnValue(1);
    jest.spyOn(damageCalculator, 'calculateDamageTaken').mockReturnValue(1);
    jest.spyOn(globalsProvider, 'gameName', 'get').mockReturnValue('gameName');
    jest.spyOn(actorstatsClient, 'sendActorStats').mockImplementation(() => { });

    actorstatsUpdater.updateActorStats(newCombat);

    expect(actorstatsUpdater.copyOfLastCombat).toEqual(newCombat);
    expect(actorstatsUpdater.copyOfLastCombat).not.toBe(newCombat);
});

test('does nothing if combatant is the same', () => {
    const newCombat = { combatant: 'combatant' };
    jest.spyOn(globalsProvider, 'activeCombat', 'get').mockImplementation(() => newCombat);
    const savedCombat = { combatant: 'combatant' };
    actorstatsUpdater.copyOfLastCombat = savedCombat;

    actorstatsUpdater.updateActorStats(newCombat);

    expect(actorstatsUpdater.copyOfLastCombat).toEqual(savedCombat);
});

test('calls ActorstatsClient with correct object', () => {
    actorstatsUpdater.copyOfLastCombat = {
        combatant: {
            actor: { name: 'lastCombatant', _id: 'id' }
        }
    };
    const newCombat = { combatant: 'newCombatant' };
    jest.spyOn(globalsProvider, 'activeCombat', 'get').mockImplementation(() => newCombat);
    jest.spyOn(damageCalculator, 'calculateDamageDealt').mockReturnValue(2);
    jest.spyOn(damageCalculator, 'calculateDamageTaken').mockReturnValue(1);
    jest.spyOn(globalsProvider, 'gameName', 'get').mockReturnValue('gameName');
    jest.spyOn(actorstatsClient, 'sendActorStats').mockImplementation(() => { });

    actorstatsUpdater.updateActorStats(newCombat);

    expect(actorstatsClient.sendActorStats).toHaveBeenCalledWith({
        characterName: 'lastCombatant',
        characterId: 'id',
        damageDealt: 2,
        damageTaken: 1,
        gameName: 'gameName'
    });
});
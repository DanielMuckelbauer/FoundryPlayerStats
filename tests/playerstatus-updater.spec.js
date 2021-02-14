import { jest } from '@jest/globals';
import { DamageCalculator } from '../src/damage-calculator';
import { PlayerstatsUpdater } from '../src/playerstats-updater';
import { PlayerstatsClient } from '../src/playerstats-client';
import { GlobalsProvider } from '../src/globals-provider';

let playerstatsUpdater;
let damageCalculator;
let playerstatsClient;
let globalsProvider;

beforeEach(() => {
    damageCalculator = new DamageCalculator();
    playerstatsClient = new PlayerstatsClient();
    globalsProvider = new GlobalsProvider();
    playerstatsUpdater = new PlayerstatsUpdater(damageCalculator, playerstatsClient, globalsProvider);
});

test('initializes with copy of currently active encounter', () => {
    const activeCombat = { name: 'name' };
    jest.spyOn(globalsProvider, 'activeCombat', 'get').mockImplementation(() => activeCombat);

    playerstatsUpdater.initialize();

    expect(playerstatsUpdater.copyOfLastCombat).toEqual(activeCombat);
    expect(playerstatsUpdater.copyOfLastCombat).not.toBe(activeCombat);
});

test('stores a copy of the new combat encounter', () => {
    playerstatsUpdater.copyOfLastCombat = {
        combatant: {
            actor: { name: 'lastCombatant' }
        }
    };
    const newCombat = { combatant: 'newCombatant' };
    jest.spyOn(globalsProvider, 'activeCombat', 'get').mockImplementation(() => newCombat);
    jest.spyOn(damageCalculator, 'calculateDamageDealt').mockReturnValue(1);
    jest.spyOn(damageCalculator, 'calculateDamageTaken').mockReturnValue(1);
    jest.spyOn(globalsProvider, 'gameName', 'get').mockReturnValue('gameName');

    playerstatsUpdater.updatePlayerStats(newCombat);

    expect(playerstatsUpdater.copyOfLastCombat).toEqual(newCombat);
    expect(playerstatsUpdater.copyOfLastCombat).not.toBe(newCombat);
});

test('does nothing if combatant is the same', () => {
    const newCombat = { combatant: 'combatant' };
    jest.spyOn(globalsProvider, 'activeCombat', 'get').mockImplementation(() => newCombat);
    const savedCombat = { combatant: 'combatant' };
    playerstatsUpdater.copyOfLastCombat = savedCombat;

    playerstatsUpdater.updatePlayerStats(newCombat);

    expect(playerstatsUpdater.copyOfLastCombat).toEqual(savedCombat);   
});

test('calls playerstatsClient with correct object', () => {
    playerstatsUpdater.copyOfLastCombat = {
        combatant: {
            actor: { name: 'lastCombatant', _id: 'id' }
        }
    };
    const newCombat = { combatant: 'newCombatant' };
    jest.spyOn(globalsProvider, 'activeCombat', 'get').mockImplementation(() => newCombat);
    jest.spyOn(damageCalculator, 'calculateDamageDealt').mockReturnValue(2);
    jest.spyOn(damageCalculator, 'calculateDamageTaken').mockReturnValue(1);
    jest.spyOn(globalsProvider, 'gameName', 'get').mockReturnValue('gameName');
    jest.spyOn(playerstatsClient, 'sendPlayerstats');

    playerstatsUpdater.updatePlayerStats(newCombat);

    expect(playerstatsClient.sendPlayerstats).toHaveBeenCalledWith({
        characterName: 'lastCombatant',
        characterId: 'id',
        damageDealt: 2,
        damageTaken: 1,
        gameName: 'gameName'
    });
});
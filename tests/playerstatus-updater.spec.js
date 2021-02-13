import { beforeEach } from '@jest/globals';
import { PlayerstatsUpdater } from '../src/playerstats-updater';

let playerstatsUpdater;

beforeEach(() => {
    playerstatsUpdater = new PlayerstatsUpdater();
    CombatEncounters = {
        instance: {
            active: {
                name: 'name'
            }
        }
    };
});

test('initializes with copy of currently active encounter', () => {
    playerstatsUpdater.initialize();

    expect(playerstatsUpdater.copyOfEncounterAtTheBeginningOfTurn)
        .toEqual(CombatEncounters.instance.active);
    expect(playerstatsUpdater.copyOfEncounterAtTheBeginningOfTurn)
        .not.toBe(CombatEncounters.instance.active);
});
import { beforeEach } from '@jest/globals';
import { DamageCalculator } from '../src/damage-calculator';
import { PlayerstatsUpdater } from '../src/playerstats-updater';

let playerstatsUpdater;
let damageCalculator;

beforeEach(() => {
    damageCalculator = new DamageCalculator();
    playerstatsUpdater = new PlayerstatsUpdater(damageCalculator);
});

test('initializes with copy of currently active encounter', () => {
    const activeInstance = { name: 'name' };

    playerstatsUpdater.initialize(activeInstance);

    expect(playerstatsUpdater.copyOfEncounterAtTheBeginningOfTurn)
        .toEqual(activeInstance);
    expect(playerstatsUpdater.copyOfEncounterAtTheBeginningOfTurn)
        .not.toBe(activeInstance);
});
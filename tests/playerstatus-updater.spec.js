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
    const activeCombat = { name: 'name' };

    playerstatsUpdater.initialize(activeCombat);

    expect(playerstatsUpdater.copyOfLastCombat)
        .toEqual(activeCombat);
    expect(playerstatsUpdater.copyOfLastCombat)
        .not.toBe(activeCombat);
});
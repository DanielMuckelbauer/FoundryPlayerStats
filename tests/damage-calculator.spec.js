import { DamageCalculator } from "../src/damage-calculator";

let damageCalculator;

beforeEach(() => {
    damageCalculator = new DamageCalculator();
});

test('calculates damage taken', () => {
    const combatLastTurn = {
        combatant: {
            _id: 1,
            actor: {
                data: {
                    data: {
                        attributes: {
                            hp: {
                                value: 10
                            }
                        }
                    }
                }
            }
        }
    };
    const currentCombat = {
        combatants: [
            {
                _id: 1,
                actor: {
                    data: {
                        data: {
                            attributes: {
                                hp: {
                                    value: 5
                                }
                            }
                        }
                    }
                }
            }
        ]
    };

    const damageTaken = damageCalculator.calculateDamageTaken(combatLastTurn, currentCombat);

    expect(damageTaken).toBe(5);
});

test('calculates damage dealt', () => {
    const combatLastTurn = {
        combatants: [
            {
                actor: {
                    data: {
                        data: {
                            attributes: {
                                hp: {
                                    value: 10
                                }
                            }
                        },
                        type: 'npc'
                    }
                }
            },
            {
                actor: {
                    data: {
                        data: {
                            attributes: {
                                hp: {
                                    value: 10
                                }
                            }
                        },
                        type: 'npc'
                    }
                }
            }
        ]
    };
    const currentCombat = {
        combatants: [
            {
                actor: {
                    data: {
                        data: {
                            attributes: {
                                hp: {
                                    value: 5
                                }
                            }
                        },
                        type: 'npc'
                    }
                }
            },
            {
                actor: {
                    data: {
                        data: {
                            attributes: {
                                hp: {
                                    value: 5
                                }
                            }
                        },
                        type: 'npc'
                    }
                }
            }
        ]
    };

    const damageDealt = damageCalculator.calculateDamageDealt(combatLastTurn, currentCombat);
    
    expect(damageDealt).toBe(10);
});
import { DamageCalculator } from "./damage-calculator";

let damageCalculator;

beforeEach(() => {
    damageCalculator = new DamageCalculator();
});

test('calculates damage taken when last combatant was player', () => {
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

test('calculates damage dealt when last combatant was character', () => {
    const combatLastTurn = {
        combatant: {
            actor: {
                data: {
                    type: 'npc'
                }
            }
        },
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
                        type: 'character'
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
                        type: 'character'
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
                        type: 'character'
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
                        type: 'character'
                    }
                }
            }
        ]
    };

    const damageDealt = damageCalculator.calculateDamageDealt(combatLastTurn, currentCombat);

    expect(damageDealt).toBe(10);
});
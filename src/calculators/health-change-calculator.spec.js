import { HealthChangeCalculator } from "./health-change-calculator";

let healthChangeCalculator;

beforeEach(() => {
    healthChangeCalculator = new HealthChangeCalculator();
});

test('calculates damage taken when last combatant was character', () => {
    const combatLastTurn = {
        combatant: {
            _id: 1,
            actor: {
                type: 'character',
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
                    type: 'character',
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

    const damageTaken = healthChangeCalculator.calculateDamageTaken(combatLastTurn, currentCombat);

    expect(damageTaken).toBe(5);
});

test('damage taken can not be less than zero', () => {
    const combatLastTurn = {
        combatant: {
            _id: 1,
            actor: {
                type: 'character',
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
    };
    const currentCombat = {
        combatants: [
            {
                _id: 1,
                actor: {
                    type: 'character',
                    data: {
                        data: {
                            attributes: {
                                hp: {
                                    value: 6
                                }
                            }
                        }
                    }
                }
            }
        ]
    };

    const damageTaken = healthChangeCalculator.calculateDamageTaken(combatLastTurn, currentCombat);

    expect(damageTaken).toBe(0);
});

test('calculates damage dealt when last combatant was npc', () => {
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

    const damageDealt = healthChangeCalculator.calculateDamageDealt(combatLastTurn, currentCombat);

    expect(damageDealt).toBe(10);
});

test('damage dealt can not be less than zero', () => {
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
    const currentCombat = {
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
            }
        ]
    };

    const damageDealt = healthChangeCalculator.calculateDamageDealt(combatLastTurn, currentCombat);

    expect(damageDealt).toBe(0);
});

test('calculates healing done  when last combatant was character', () => {
    const combatLastTurn = {
        combatant: { _id: 1, actor: { data: { type: 'character' } } },
        combatants: [
            {
                actor: {
                    data: {
                        type: 'character',
                        data: {
                            attributes: {
                                hp: {
                                    value: 1
                                }
                            }
                        }
                    }
                }
            },
            {
                actor: {
                    data: {
                        type: 'character',
                        data: {
                            attributes: {
                                hp: {
                                    value: 1
                                }
                            }
                        }
                    }
                }
            },
            {
                actor: {
                    data: {
                        type: 'npc',
                        data: {
                            attributes: {
                                hp: {
                                    value: 1
                                }
                            }
                        }
                    }
                }
            }
        ]
    };
    const currentCombat = {
        combatant: { _id: 1, actor: { data: { type: 'character' } } },
        combatants: [
            {
                actor: {
                    data: {
                        type: 'character',
                        data: {
                            attributes: {
                                hp: {
                                    value: 2
                                }
                            }
                        }
                    }
                }
            },
            {
                actor: {
                    data: {
                        type: 'character',
                        data: {
                            attributes: {
                                hp: {
                                    value: 2
                                }
                            }
                        }
                    }
                }
            },
            {
                actor: {
                    data: {
                        type: 'npc',
                        data: {
                            attributes: {
                                hp: {
                                    value: 1
                                }
                            }
                        }
                    }
                }
            }
        ]
    };

    const healingDone = healthChangeCalculator.calculateHealingDone(combatLastTurn, currentCombat);

    expect(healingDone).toBe(2);
});

test('calculates healing done  when last combatant was npc', () => {
    const combatLastTurn = {
        combatant: { actor: { data: { type: 'npc' } } },
        combatants: [
            {
                actor: {
                    data: {
                        type: 'npc',
                        data: {
                            attributes: {
                                hp: {
                                    value: 1
                                }
                            }
                        }
                    }
                }
            },
            {
                _id: 1,
                actor: {
                    data: {
                        type: 'npc',
                        data: {
                            attributes: {
                                hp: {
                                    value: 1
                                }
                            }
                        }
                    }
                }
            },
            {
                actor: {
                    data: {
                        type: 'character',
                        data: {
                            attributes: {
                                hp: {
                                    value: 1
                                }
                            }
                        }
                    }
                }
            }
        ]
    };
    const currentCombat = {
        combatant: { actor: { data: { type: 'npc' } } },
        combatants: [
            {
                _id: 1,
                actor: {
                    data: {
                        type: 'npc',
                        data: {
                            attributes: {
                                hp: {
                                    value: 2
                                }
                            }
                        }
                    }
                }
            },
            {
                actor: {
                    data: {
                        type: 'npc',
                        data: {
                            attributes: {
                                hp: {
                                    value: 2
                                }
                            }
                        }
                    }
                }
            },
            {
                actor: {
                    data: {
                        type: 'character',
                        data: {
                            attributes: {
                                hp: {
                                    value: 1
                                }
                            }
                        }
                    }
                }
            }
        ]
    };

    const healingDone = healthChangeCalculator.calculateHealingDone(combatLastTurn, currentCombat);

    expect(healingDone).toBe(2);
});

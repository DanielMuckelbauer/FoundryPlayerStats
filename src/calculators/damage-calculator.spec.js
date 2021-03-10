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

test('calculates healing done  when last combatant was character', () => {
    const combatLastTurn = {
        combatant: {
            _id: 1,
            actor: {
                type: 'character',
                data: {
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
        combatants: [
            {
                actor: {
                type: 'character',
                    data: {
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
                type: 'npc',
                    data: {
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
        combatant: {
            _id: 1,
            actor: {
                type: 'character',
                data: {
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
        combatants: [
            {
                actor: {
                type: 'character',
                    data: {
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
                type: 'npc',
                    data: {
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
        combatant: {
            _id: 1,
            actor: {
                type: 'npc',
                data: {
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
        combatants: [
            {
                actor: {
                type: 'npc',
                    data: {
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
                type: 'character',
                    data: {
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
        combatant: {
            _id: 1,
            actor: {
                type: 'npc',
                data: {
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
        combatants: [
            {
                actor: {
                type: 'npc',
                    data: {
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
                type: 'character',
                    data: {
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
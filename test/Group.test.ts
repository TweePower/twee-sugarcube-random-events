import Group from "../src/Group";
import { GroupType } from "../src/enum/GroupType";

test('check createFromGroupDefinition error', async () => {
    expect(() => Group.createFromGroupDefinition(null)).toThrow();
    expect(() => Group.createFromGroupDefinition(undefined)).toThrow();
    expect(() => Group.createFromGroupDefinition([])).toThrow();
    expect(() => Group.createFromGroupDefinition({})).toThrow();
    expect(() => Group.createFromGroupDefinition({ name: 123 })).toThrow();
    expect(() => Group.createFromGroupDefinition({ name: 'test', weight: false })).toThrow();
    expect(() => Group.createFromGroupDefinition({ name: 'test', type: false })).toThrow();
    expect(() => Group.createFromGroupDefinition({ name: 'test', type: 'sequential' })).toThrow();
    expect(() => Group.createFromGroupDefinition({ name: 'test', type: 'sequential', sequentialIndex: false })).toThrow();
    expect(() => Group.createFromGroupDefinition({ name: 'test', type: 'sequential', sequentialIndex: 1, sequentialCount: false })).toThrow();
});

test('check createFromGroupDefinition success with string', async () => {
    let group = Group.createFromGroupDefinition('test');
    expect(group).toBeInstanceOf(Group);
    expect(group.name).toBe('test');
    expect(group.weight).toBe(10);
    expect(group.type).toBe(GroupType.Random);
    expect(group.sequentialIndex).toBe(null);
    expect(group.sequentialCount).toBe(null);
});

test('check createFromGroupDefinition success with object minimal params', async () => {
    let group = Group.createFromGroupDefinition({
        name: 'test'
    });
    expect(group).toBeInstanceOf(Group);
    expect(group.name).toBe('test');
    expect(group.weight).toBe(10);
    expect(group.type).toBe(GroupType.Random);
    expect(group.sequentialIndex).toBe(null);
    expect(group.sequentialCount).toBe(null);
});

test('check createFromGroupDefinition success with object sequential type', async () => {
    let group = Group.createFromGroupDefinition({
        name: 'test object',
        weight: 100,
        type: 'sequential',
        sequentialIndex: 5,
        sequentialCount: 10,
    });
    expect(group).toBeInstanceOf(Group);
    expect(group.name).toBe('test object');
    expect(group.type).toBe(GroupType.Sequential);
    expect(group.weight).toBe(100);
    expect(group.sequentialIndex).toBe(5);
    expect(group.sequentialCount).toBe(10);
});

test('check createFromGroupDefinition success with object sequential type withoun count', async () => {
    let group = Group.createFromGroupDefinition({
        name: 'test object',
        weight: 100,
        type: 'sequential',
        sequentialIndex: 5,
    });
    expect(group).toBeInstanceOf(Group);
    expect(group.name).toBe('test object');
    expect(group.type).toBe(GroupType.Sequential);
    expect(group.weight).toBe(100);
    expect(group.sequentialIndex).toBe(5);
    expect(group.sequentialCount).toBe(1);
});

test('check createFromGroupDefinition success with object random type', async () => {
    let group = Group.createFromGroupDefinition({
        name: 'test object',
        weight: 100,
        type: 'random',
        sequentialIndex: 5,
        sequentialCount: 10,
    });
    expect(group).toBeInstanceOf(Group);
    expect(group.name).toBe('test object');
    expect(group.type).toBe(GroupType.Random);
    expect(group.weight).toBe(100);
    expect(group.sequentialIndex).toBe(null);
    expect(group.sequentialCount).toBe(null);
});

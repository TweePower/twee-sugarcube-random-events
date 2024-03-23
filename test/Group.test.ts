import Group from "../src/Group";
import { GroupTypeEnum } from "../src/enum/GroupTypeEnum";

test('check createFromGroupPassageMetadata error', async () => {
    expect(() => Group.createFromGroupPassageMetadata(null)).toThrow();
    expect(() => Group.createFromGroupPassageMetadata(undefined)).toThrow();
    expect(() => Group.createFromGroupPassageMetadata([])).toThrow();
    expect(() => Group.createFromGroupPassageMetadata({})).toThrow();
    expect(() => Group.createFromGroupPassageMetadata({ name: 123 })).toThrow();
    expect(() => Group.createFromGroupPassageMetadata({ name: 'test', weight: false })).toThrow();
    expect(() => Group.createFromGroupPassageMetadata({ name: 'test', type: false })).toThrow();
    expect(() => Group.createFromGroupPassageMetadata({ name: 'test', type: 'sequential' })).toThrow();
    expect(() => Group.createFromGroupPassageMetadata({ name: 'test', type: 'sequential', sequentialIndex: false })).toThrow();
    expect(() => Group.createFromGroupPassageMetadata({ name: 'test', type: 'sequential', sequentialIndex: 1, sequentialCount: false })).toThrow();
});

test('check createFromGroupPassageMetadata success with string', async () => {
    let group = Group.createFromGroupPassageMetadata('test');
    expect(group).toBeInstanceOf(Group);
    expect(group.name).toBe('test');
    expect(group.weight).toBe(10);
    expect(group.type).toBe(GroupTypeEnum.Random);
    expect(group.sequentialIndex).toBe(null);
    expect(group.sequentialCount).toBe(null);
});

test('check createFromGroupPassageMetadata success with object minimal params', async () => {
    let group = Group.createFromGroupPassageMetadata({
        name: 'test'
    });
    expect(group).toBeInstanceOf(Group);
    expect(group.name).toBe('test');
    expect(group.weight).toBe(10);
    expect(group.type).toBe(GroupTypeEnum.Random);
    expect(group.sequentialIndex).toBe(null);
    expect(group.sequentialCount).toBe(null);
});

test('check createFromGroupPassageMetadata success with object sequential type', async () => {
    let group = Group.createFromGroupPassageMetadata({
        name: 'test object',
        weight: 100,
        type: 'sequential',
        sequentialIndex: 5,
        sequentialCount: 10,
    });
    expect(group).toBeInstanceOf(Group);
    expect(group.name).toBe('test object');
    expect(group.type).toBe(GroupTypeEnum.Sequential);
    expect(group.weight).toBe(100);
    expect(group.sequentialIndex).toBe(5);
    expect(group.sequentialCount).toBe(10);
});

test('check createFromGroupPassageMetadata success with object sequential type withoun count', async () => {
    let group = Group.createFromGroupPassageMetadata({
        name: 'test object',
        weight: 100,
        type: 'sequential',
        sequentialIndex: 5,
    });
    expect(group).toBeInstanceOf(Group);
    expect(group.name).toBe('test object');
    expect(group.type).toBe(GroupTypeEnum.Sequential);
    expect(group.weight).toBe(100);
    expect(group.sequentialIndex).toBe(5);
    expect(group.sequentialCount).toBe(1);
});

test('check createFromGroupPassageMetadata success with object random type', async () => {
    let group = Group.createFromGroupPassageMetadata({
        name: 'test object',
        weight: 100,
        type: 'random',
        sequentialIndex: 5,
        sequentialCount: 10,
    });
    expect(group).toBeInstanceOf(Group);
    expect(group.name).toBe('test object');
    expect(group.type).toBe(GroupTypeEnum.Random);
    expect(group.weight).toBe(100);
    expect(group.sequentialIndex).toBe(null);
    expect(group.sequentialCount).toBe(null);
});

import RandomEventPassageMetadataProcessor from "../../src/processors/RandomEventPassageMetadataProcessor";

const processor = new RandomEventPassageMetadataProcessor();

test('success create with minimal data', async () => {
    let passageMetadataObject: {[key: string]: any} = {
        passageName: 'passage1',
    };

    processor.process(passageMetadataObject);

    expect(passageMetadataObject.passageName).toEqual('passage1');
    expect(passageMetadataObject.isEnabled).toBeTruthy();
    expect(passageMetadataObject.groups.length).toEqual(0);
    expect(passageMetadataObject.filter).toBeTruthy();
    expect(passageMetadataObject.type).toEqual('embedded');
    expect(passageMetadataObject.threshold).toEqual(100);
    expect(passageMetadataObject.tags.length).toEqual(0);
    expect(passageMetadataObject.limitationStrategies.length).toEqual(0);
});

test('success create with all possible data', async () => {
    let passageMetadataObject: {[key: string]: any} = {
        passageName: 'passage1',
        isEnabled: false,
        groups: [
            {
                name: 'group1',
                weight: 10,
                type: 'sequential',
                sequentialIndex: 1,
                sequentialCount: 1,
            },
            {
                name: 'group2',
                weight: 10,
                type: 'sequential',
                sequentialIndex: 2,
                sequentialCount: 2,
            }
        ],
        filter: '$test1 = 100',
        type: 'goto',
        threshold: 50,
        tags: ['tag1', '$tag2', 'tag3'],
        limitationStrategies: [
            { max: 5, tags: ['tag1', 'tag2']},
            { max: 3, tags: ['tag1', 'tag3']},
            { max: 1, isSeparate: true},
        ]
    };

    processor.process(passageMetadataObject);

    expect(passageMetadataObject.passageName).toEqual('passage1');
    expect(passageMetadataObject.isEnabled).toBeFalsy();
    expect(passageMetadataObject.groups.length).toEqual(2);
    expect(passageMetadataObject.filter).toEqual('$test1 = 100');
    expect(passageMetadataObject.type).toEqual('goto');
    expect(passageMetadataObject.threshold).toEqual(50);
    expect(passageMetadataObject.tags.length).toEqual(3);
    expect(passageMetadataObject.limitationStrategies.length).toEqual(3);
});

// TODO: add error tests

import RandomEventPassageMetadataProcessor from "../../src/processors/RandomEventPassageMetadataProcessor";
import PassageMetadataValidationError from "../../src/error/PassageMetadataValidationError";

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

// Error tests for invalid passage metadata object
test('should throw error for non-object passage metadata', () => {
    expect(() => {
        processor.process(null as any);
    }).toThrow('Invalid passage metadata type');
});

test('should throw error for non-string passage name', () => {
    expect(() => {
        processor.process({
            passageName: 123
        });
    }).toThrow('Invalid passage name type');
});

// Error tests for isEnabled
test('should throw error for non-boolean isEnabled', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        isEnabled: 'true'
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

// Error tests for groups
test('should throw error for invalid groups type', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        groups: 123
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for non-string group name', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        groups: [{ name: 123 }]
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for non-integer group weight', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        groups: [{ name: 'group1', weight: '10' }]
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for invalid group type', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        groups: [{ name: 'group1', type: 'invalid' }]
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for missing sequentialIndex in sequential group', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        groups: [{ name: 'group1', type: 'sequential' }]
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for non-integer sequentialIndex', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        groups: [{ name: 'group1', type: 'sequential', sequentialIndex: '1' }]
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for non-integer sequentialCount', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        groups: [{ name: 'group1', type: 'sequential', sequentialIndex: 1, sequentialCount: '1' }]
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

// Error tests for filter
test('should throw error for non-string and non-boolean filter', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        filter: 123
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

// Error tests for type
test('should throw error for non-string type', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        type: 123
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for invalid type value', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        type: 'invalid'
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

// Error tests for threshold
test('should throw error for non-number and non-string threshold', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        threshold: true
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for negative threshold', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        threshold: -1
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for threshold greater than 100', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        threshold: 101
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

// Error tests for tags
test('should throw error for non-string tag', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        tags: ['tag1', 123]
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

// Error tests for limitationStrategies
test('should throw error for invalid limitationStrategies type', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        limitationStrategies: 123
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for non-object limitationStrategy', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        limitationStrategies: ['invalid']
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for non-integer max in limitationStrategy', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        limitationStrategies: [{ max: '5' }]
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for non-boolean isSeparate in limitationStrategy', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        limitationStrategies: [{ max: 5, isSeparate: 'true' }]
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for non-string tag in limitationStrategy', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        limitationStrategies: [{ max: 5, tags: ['tag1', 123] }]
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

test('should throw error for twee script tag in limitationStrategy', () => {
    const passageMetadataObject = {
        passageName: 'passage1',
        limitationStrategies: [{ max: 5, tags: ['$tag1'] }]
    };

    expect(() => {
        processor.process(passageMetadataObject);
    }).toThrow(PassageMetadataValidationError);
});

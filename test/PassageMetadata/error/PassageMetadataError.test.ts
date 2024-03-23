import PassageMetadataError from "../../../src/PassageMetadata/error/PassageMetadataError";

test('create new PassageMetadataError', async () => {
    const error = new PassageMetadataError('test');

    expect(error).toBeInstanceOf(PassageMetadataError);
    expect(error.message).toBe('test');
    expect(error.scope).toStrictEqual({});
});

test('create new PassageMetadataError with scope', async () => {
    const error = new PassageMetadataError('test', { foo: 'bar' });

    expect(error).toBeInstanceOf(PassageMetadataError);
    expect(error.message).toBe('test');
    expect(error.scope).toStrictEqual({ foo: 'bar' });
});

test('create new PassageMetadataError from previous', async () => {
    const previousError = new Error('test');
    const error = PassageMetadataError.fromPreviousError(previousError);

    expect(error).toBeInstanceOf(PassageMetadataError);
    expect(error.message).toBe('test');
    expect(error.scope).toStrictEqual({});
});


test('create new PassageMetadataError from previous with scope', async () => {
    const previousError = new Error('test');
    const error = PassageMetadataError.fromPreviousError(previousError, { foo: 'bar' });

    expect(error).toBeInstanceOf(PassageMetadataError);
    expect(error.message).toBe('test');
    expect(error.scope).toStrictEqual({ foo: 'bar' });
});

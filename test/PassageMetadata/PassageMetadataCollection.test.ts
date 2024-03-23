import PassageMetadata from "../../src/PassageMetadata/model/PassageMetadata";
import PassageMetadataCollection from "../../src/PassageMetadata/PassageMetadataCollection";

const passageMetadataFixture1 = new PassageMetadata('test1', { name: 'test1', foo: 'bar' });
const passageMetadataFixture2 = new PassageMetadata('test2', { name: 'test2', foo: 'bar' });
const passageMetadataCollection = new PassageMetadataCollection();
passageMetadataCollection.add(passageMetadataFixture1);

test('success create has', async () => {
    expect(passageMetadataCollection.has('test1')).toBeTruthy();
});

test('fail create has', async () => {
    expect(passageMetadataCollection.has('noname')).toBeFalsy();
});

test('success add', async () => {
    expect(passageMetadataCollection.add(passageMetadataFixture2)).toBeFalsy();

    expect(passageMetadataCollection.get('test2')).toBe(passageMetadataFixture2);
});

test('success find', async () => {
    expect(passageMetadataCollection.find('test1')).toBe(passageMetadataFixture1);
});

test('fail find', async () => {
    expect(passageMetadataCollection.find('noname')).toBeNull();
});

test('success get', async () => {
    expect(passageMetadataCollection.get('test1')).toBe(passageMetadataFixture1);
});

test('fail get', async () => {
    expect(() => passageMetadataCollection.get('noname')).toThrow();
});

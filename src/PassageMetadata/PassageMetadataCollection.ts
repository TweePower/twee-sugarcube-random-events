import PassageMetadataError from "./error/PassageMetadataError";
import PassageMetadata from "./model/PassageMetadata";

export default class PassageMetadataCollection {
    items: { [key: string]: PassageMetadata } = {};
    aliases:  { [key: string]: string } = {}; // just for back compatibility

    add(passageMetadata: PassageMetadata): void {
        if (!(passageMetadata instanceof PassageMetadata)) {
            throw new PassageMetadataError(`passage metadata should be instance of PassageMetadata`);
        }

        this.items[passageMetadata.name] = passageMetadata;
        this.aliases[passageMetadata.name.toLowerCase()] = passageMetadata.name;
    }

    has(name: string): boolean {
        if (typeof name !== 'string') {
            throw new PassageMetadataError(`name should be string`);
        }

        return this.items[name] !== undefined || this.aliases[name.toLowerCase()] !== undefined;
    }

    get(name: string): PassageMetadata {
        if (!this.has(name)) {
            throw new PassageMetadataError(`PassageMetadata with name ${name} doesn't exist`);
        }

        if (this.items[name] === undefined) {
            name = this.aliases[name.toLowerCase()];
        }

        return this.items[name];
    }

    find(name: string): PassageMetadata | null {
        if (this.has(name) === false) {
            return null;
        }

        if (this.items[name] === undefined) {
            name = this.aliases[name.toLowerCase()];
        }

        return this.items[name];
    }
}

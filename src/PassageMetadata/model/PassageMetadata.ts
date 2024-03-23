export default class PassageMetadata {
    constructor(
        public name: string,
        public metadata: { [key: string]: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
    }
}

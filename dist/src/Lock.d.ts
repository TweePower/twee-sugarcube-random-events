export default class Lock {
    lockData: {
        isLocked: boolean;
        isForce: boolean;
    };
    acquire(): void;
    release(): void;
    forceAcquire(): void;
    forceRelease(): void;
    get isLocked(): boolean;
    get isForce(): boolean;
}
//# sourceMappingURL=Lock.d.ts.map
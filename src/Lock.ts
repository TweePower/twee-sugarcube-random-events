export default class Lock {
    lockData = {
        isLocked: false,
        isForce: false,
    };

    acquire() {
        if (this.lockData.isForce === false) {
            this.lockData.isLocked = true;
        }
    }

    release() {
        if (this.lockData.isForce === false) {
            this.lockData.isLocked = false;
        }
    }

    forceAcquire() {
        this.lockData.isLocked = true;
        this.lockData.isForce = true;
    }

    forceRelease() {
        this.lockData.isLocked = false;
        this.lockData.isForce = false;
    }

    get isLocked() {
        return this.lockData.isLocked;
    }

    get isForce() {
        return this.lockData.isForce;
    }
}

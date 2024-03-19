type Log = {
    result: boolean,
    message: string,
    debugLevel: number,
    level: number,
};

export default class DebugLogCollector {
    currentLevel = 0;
    logs: Log[] = [];

    constructor(public debugLevel: number = 0) {
        if (debugLevel !== 0 && debugLevel !== 1 && debugLevel !== 2 && debugLevel !== 3) {
            throw new Error("Debug level should be 0, 1, 2 or 3");
        }
    }

    addLog(result: boolean, message: string, debugLevel: number, level?: number | undefined): this {
        this.logs.push({
            result: result,
            message: message,
            debugLevel: debugLevel,
            level: level === undefined ? this.currentLevel : level,
        });

        return this;
    }

    merge(debugLogCollector: DebugLogCollector): this {
        debugLogCollector.all().forEach(log => this.addLog(
            log.result,
            log.message,
            log.debugLevel,
            log.level + this.currentLevel
        ));

        return this;
    }

    increaseLevel(): this {
        this.currentLevel++;

        return this;
    }

    decreaseLevel(): this {
        this.currentLevel--;

        if (this.currentLevel < 0) {
            this.currentLevel = 0;
        }

        return this;
    }

    get length(): number {
        return this.logs.length;
    }

    all(): Log[] {
        return this.logs;
    }

    toString() {
        return this.logs
            .filter(log => log.debugLevel <= this.debugLevel)
            .map(log => ('  '.repeat(log.level)) + (log.result === true ? '+ ' : (log.result === false ? '- ' : '')) + log.message)
            .join("\n");
    }

    clear(): this {
        this.currentLevel = 0;
        this.logs = [];

        return this;
    }
}

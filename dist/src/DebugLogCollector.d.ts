type Log = {
    result: boolean;
    message: string;
    debugLevel: number;
    level: number;
};
export default class DebugLogCollector {
    debugLevel: number;
    currentLevel: number;
    logs: Log[];
    constructor(debugLevel?: number);
    addLog(result: boolean, message: string, debugLevel: number, level?: number | undefined): this;
    merge(debugLogCollector: DebugLogCollector): this;
    increaseLevel(): this;
    decreaseLevel(): this;
    get length(): number;
    all(): Log[];
    toString(): string;
    clear(): this;
}
export {};
//# sourceMappingURL=DebugLogCollector.d.ts.map
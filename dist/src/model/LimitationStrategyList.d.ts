import LimitationStrategy from "./LimitationStrategy";
export default class LimitationStrategyList {
    private _limitationStrategies;
    private _isTaged;
    constructor(limitationStrategies: LimitationStrategy[]);
    get length(): number;
    get limitationStrategies(): LimitationStrategy[];
    get isTagged(): boolean;
}
//# sourceMappingURL=LimitationStrategyList.d.ts.map
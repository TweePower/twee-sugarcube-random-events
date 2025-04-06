import TagList from "./TagList";
export default class LimitationStrategy {
    private _max;
    private _isSeparate;
    private _tags;
    constructor(_max: number, _isSeparate: boolean, _tags: TagList);
    get max(): number;
    get isSeparate(): boolean;
    get tags(): TagList;
}
//# sourceMappingURL=LimitationStrategy.d.ts.map
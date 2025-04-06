import GroupList from "./GroupList";
import TagList from "./TagList";
import LimitationStrategyList from "./LimitationStrategyList";
export default class RandomEvent {
    private _passageName;
    private _isEnabled;
    private _groups;
    private _filter;
    private _type;
    private _threshold;
    private _tags;
    private _limitationStrategy;
    constructor(_passageName: string, _isEnabled: boolean, _groups: GroupList, _filter: string | boolean, _type: string, _threshold: number, _tags: TagList, _limitationStrategy: LimitationStrategyList);
    get passageName(): string;
    get isEnabled(): boolean;
    get groups(): GroupList;
    get filter(): string | boolean;
    get type(): string;
    get threshold(): number;
    get tags(): TagList;
    get limitationStrategy(): LimitationStrategyList;
}
//# sourceMappingURL=RandomEvent.d.ts.map
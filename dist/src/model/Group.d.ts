import { GroupTypeEnum } from "../enum/GroupTypeEnum";
export default class Group {
    private _name;
    private _weight;
    private _type;
    private _sequentialIndex;
    private _sequentialCount;
    constructor(_name: string, _weight: number, _type: GroupTypeEnum, _sequentialIndex: number | null, _sequentialCount: number | null);
    get name(): string;
    get weight(): number;
    get type(): GroupTypeEnum;
    get sequentialIndex(): number | null;
    get sequentialCount(): number | null;
}
//# sourceMappingURL=Group.d.ts.map
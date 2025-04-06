import Group from "./Group";
export default class GroupList {
    private _groups;
    private _nameIndex;
    constructor(groups: Group[]);
    get length(): number;
    get groups(): Group[];
    findByName(groupName: string): Group | null;
}
//# sourceMappingURL=GroupList.d.ts.map
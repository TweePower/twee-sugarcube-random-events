import { GroupPassageMetadataType } from "../type/PassageMetadata";
import GroupList from "../model/GroupList";
import GroupFactory from "./GroupFactory";
export default class GroupListFactory {
    private groupFactory;
    constructor(groupFactory: GroupFactory);
    createFromPassageMetadataObject(groupsListMetadata?: string | string[] | GroupPassageMetadataType | GroupPassageMetadataType[] | any): GroupList;
}
//# sourceMappingURL=GroupListFactory.d.ts.map
import Group from "./Group";
import { GroupPassageMetadataType } from "./type/PassageMetadata";

export default class GroupList {
    nameIndex: { [key: string]: number } = {};

    constructor(public groups: Group[]) {
        this.groups = groups;
        this.groups.forEach((group, index) => {
            if (this.nameIndex[group.name] !== undefined) {
                throw new Error(`"definition.group.name" should be unique in one RE`);
            }

            this.nameIndex[group.name] = index;
        });
    }

    static createFromGroupsPassageMetadata(groupsDefinitions: GroupPassageMetadataType[] | GroupPassageMetadataType | undefined) {
        if (groupsDefinitions === undefined) {
            return new GroupList([]);
        } else {
            if (!Array.isArray(groupsDefinitions)) {
                groupsDefinitions = [groupsDefinitions];
            }

            return new GroupList(groupsDefinitions.map((groupsDefinition) => {
                return Group.createFromGroupPassageMetadata(groupsDefinition);
            }));
        }
    }

    get length() {
        return this.groups.length;
    }

    all(): Group[] {
        return this.groups;
    }

    getByName(groupName: string): Group | null {
        if (this.nameIndex[groupName] === undefined) {
            return null;
        }

        return this.groups[this.nameIndex[groupName]];
    }
}

import PassageMetadataApp from "twee-sugarcube-passage-metadata-collector/src/PassageMetadataApp";
import TagsManager from "./TagsManager";
export default class RandomEventStats {
    private passageMetadataApp;
    private tagsManager;
    private passagesRunCountHistory;
    private passagesRunCountActual;
    private tagsRunCountHistory;
    private tagsRunCountActual;
    private _passagesByTagIndex;
    private _tagsStringKeysByPassageAndTagIndex;
    private _tagsStringKeysIndex;
    constructor(passageMetadataApp: PassageMetadataApp, tagsManager: TagsManager);
    incrementPassageRunCount(passageName: string, count?: number, isStoreImmediately?: boolean): void;
    incrementTagsRunCount(passageName: string, tagsList: string[][], count?: number, isStoreImmediately?: boolean): void;
    resetPassageRunCount(passageName: string, isStoreImmediately?: boolean): void;
    resetTagsRunCount(tags: string | string[], isStoreImmediately?: boolean): void;
    getPassageRunCountActual(passageName: string): number;
    getPassageRunCountHistory(passageName: string): number;
    getTagRunCountActual(tag: string): number;
    getTagRunCountHistory(tag: string): number;
}
//# sourceMappingURL=RandomEventStats.d.ts.map
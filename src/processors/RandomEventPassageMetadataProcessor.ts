import InvalidPassageMetadataValueType from "../error/InvalidPassageMetadataValueType";
import InvalidPassageMetadataValue from "../error/InvalidPassageMetadataValue";
import { isArray, isBoolean, isInteger, isNumber, isObject, isString, isTweeScript } from "../tools/TypeChecker";
import PassageMetadataValidationError from "../error/PassageMetadataValidationError";
import { GroupTypeEnum } from "../enum/GroupTypeEnum";
import RequiredPassageMetadataValue from "../error/RequiredPassageMetadataValue";
import { TypeEnum } from "../enum/Type";

export default class RandomEventPassageMetadataProcessor {
    // validate, normalize, enrich and build indexes for random event metadata
    public process(passageMetadataObject: {[key: string | number]: any}): void {
        if (!isObject(passageMetadataObject)) {
            // we shouldn't be here, passage metadata previously checked in PassageMetadataCollector, I added that check just in case
            throw new Error(`Invalid passage metadata type (expected JSON object, actual ${typeof passageMetadataObject})`);
        }

        if (!isString(passageMetadataObject.passageName)) {
            // we shouldn't be here, passage name is always a string, I added that check just in case
            throw new Error(`Invalid passage name type (expected string, actual ${typeof passageMetadataObject.passageName})`);
        }

        passageMetadataObject._isLimitationStrategiesTagged = false;
        passageMetadataObject._groupByNameIndex = {};
        passageMetadataObject._stringTags = [];

        passageMetadataObject._runCountHistory = 0;
        passageMetadataObject._runCountActual = 0;
        passageMetadataObject._runCountByTagsHistory = {};
        passageMetadataObject._runCountByTagsActual = {};

        this.processIsEnabled(passageMetadataObject);
        this.processGroups(passageMetadataObject);
        this.processFilter(passageMetadataObject);
        this.processType(passageMetadataObject);
        this.processThreshold(passageMetadataObject);
        this.processTags(passageMetadataObject);
        this.processLimitationStrategies(passageMetadataObject);
    }

    private processIsEnabled(passageMetadataObject: {[key: string | number]: any}): void {
        if (passageMetadataObject.isEnabled === undefined || passageMetadataObject.isEnabled === null) {
            passageMetadataObject.isEnabled = true;
        } else if (!isBoolean(passageMetadataObject.isEnabled)) {
            throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'isEnabled'], 'boolean', typeof passageMetadataObject.isEnabled);
        }
    }

    private processGroups(passageMetadataObject: {[key: string | number]: any}): void {
        if (passageMetadataObject.groups === undefined || passageMetadataObject.groups === null) {
            passageMetadataObject.groups = [];
        } else if (isString(passageMetadataObject.groups) || isObject(passageMetadataObject.groups) || isArray(passageMetadataObject.groups)) {
            if (isString(passageMetadataObject.groups) || isObject(passageMetadataObject.groups)) {
                passageMetadataObject.groups = [passageMetadataObject.groups];
            }

            for (let index = 0; index < passageMetadataObject.groups.length; index++) {
                if (isString(passageMetadataObject.groups[index])) {
                    passageMetadataObject.groups[index] = {
                        name: passageMetadataObject.groups[index],
                        weight: 10,
                        type: GroupTypeEnum.Random,
                        sequentialIndex: null,
                        sequentialCount: null,
                    };
                } else if (isObject(passageMetadataObject.groups[index])) {
                    if (!isString(passageMetadataObject.groups[index].name)) {
                        throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'groups', index, 'name'], 'string', typeof passageMetadataObject.groups[index].name);
                    }

                    if (passageMetadataObject.groups[index].weight === undefined || passageMetadataObject.groups[index].weight === null) {
                        passageMetadataObject.groups[index].weight = 10;
                    } else if (!isInteger(passageMetadataObject.groups[index].weight)) {
                        throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'groups', index, 'weight'], 'integer', typeof passageMetadataObject.groups[index].weight);
                    }

                    if (passageMetadataObject.groups[index].type === undefined || passageMetadataObject.groups[index].type === null) {
                        passageMetadataObject.groups[index].type = GroupTypeEnum.Random;
                    } else if (!isString(passageMetadataObject.groups[index].type)) {
                        throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'groups', index, 'type'], 'string', typeof passageMetadataObject.groups[index].type);
                    } else if (passageMetadataObject.groups[index].type !== GroupTypeEnum.Random && passageMetadataObject.groups[index].type !== GroupTypeEnum.Sequential) {
                        throw new InvalidPassageMetadataValue(passageMetadataObject.passageName, ['PassageMetadata', 'groups', index, 'type'], `"${GroupTypeEnum.Random}" or "${GroupTypeEnum.Sequential}"`, passageMetadataObject.groups[index].type);
                    }

                    if (passageMetadataObject.groups[index].type === GroupTypeEnum.Sequential) {
                        if (passageMetadataObject.groups[index].sequentialIndex === undefined) {
                            throw new RequiredPassageMetadataValue(`groupMetadata.type = "${GroupTypeEnum.Sequential}"`, passageMetadataObject.passageName, ['PassageMetadata', 'groups', index, 'sequentialIndex']);
                        }

                        if (!isInteger(passageMetadataObject.groups[index].sequentialIndex)) {
                            throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'groups', index, 'sequentialIndex'], 'integer', typeof passageMetadataObject.groups[index].sequentialIndex);
                        }

                        if (passageMetadataObject.groups[index].sequentialCount === undefined || passageMetadataObject.groups[index].sequentialCount === null) {
                            passageMetadataObject.groups[index].sequentialCount = 1;
                        } else if (!isInteger(passageMetadataObject.groups[index].sequentialCount)) {
                            throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'groups', index, 'sequentialCount'], 'integer', typeof passageMetadataObject.groups[index].sequentialCount);
                        }
                    }
                }
                passageMetadataObject._groupByNameIndex[passageMetadataObject.groups[index].name] = index;
            }
        } else {
            throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'groups'], 'string, object or array of strings or objects', typeof passageMetadataObject.groups);
        }
    }

    private processFilter(passageMetadataObject: {[key: string | number]: any}): void {
        if (passageMetadataObject.filter === undefined || passageMetadataObject.filter === null) {
            passageMetadataObject.filter = true;
        } else if (!isString(passageMetadataObject.filter) && !isBoolean(passageMetadataObject.filter)){
            throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'filter'], 'string or boolean', typeof passageMetadataObject.filter);
        }
    }

    private processType(passageMetadataObject: {[key: string | number]: any}): void {
        if (passageMetadataObject.type === undefined || passageMetadataObject.type === null) {
            passageMetadataObject.type = TypeEnum.Embedded;
        } else if (!isString(passageMetadataObject.type)){
            throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'type'], 'string', typeof passageMetadataObject.type);
        } else if (passageMetadataObject.type !== TypeEnum.Embedded && passageMetadataObject.type !== TypeEnum.Goto) {
            throw new InvalidPassageMetadataValue(passageMetadataObject.passageName, ['PassageMetadata', 'type'], `"${TypeEnum.Embedded}" or "${TypeEnum.Goto}"`, passageMetadataObject.type);
        }
    }

    private processThreshold(passageMetadataObject: {[key: string | number]: any}): void {
        if (passageMetadataObject.threshold === undefined || passageMetadataObject.threshold === null) {
            passageMetadataObject.threshold = 100;
        } else if (!isNumber(passageMetadataObject.threshold) && !isString(passageMetadataObject.threshold)) {
            throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'threshold'], 'integer or string', typeof passageMetadataObject.threshold);
        } else if (isNumber(passageMetadataObject.threshold)) {
            if (passageMetadataObject.threshold < 0) {
                throw new PassageMetadataValidationError('Should equal or greater than 0', passageMetadataObject.passageName, ['PassageMetadata', 'threshold']);
            } else if (passageMetadataObject.threshold > 100) {
                throw new PassageMetadataValidationError('Should equal or less than 100', passageMetadataObject.passageName, ['PassageMetadata', 'threshold']);
            }
        }
    }

    private processTags(passageMetadataObject: {[key: string | number]: any}): void {
        if (passageMetadataObject.tags === undefined || passageMetadataObject.tags === null) {
            passageMetadataObject.tags = [];
        } else if (isString(passageMetadataObject.tags) || isArray(passageMetadataObject.tags)) {
            if (isString(passageMetadataObject.tags)) {
                passageMetadataObject.tags = [passageMetadataObject.tags];
            }

            for (let index = 0; index < passageMetadataObject.tags.length; index++) {
                if (!isString(passageMetadataObject.tags[index])) {
                    throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'tags', index], 'string', typeof passageMetadataObject.tags[index]);
                }
                if (!isTweeScript(passageMetadataObject.tags[index])) {
                    passageMetadataObject._stringTags.push(passageMetadataObject.tags[index]);
                }
            }
        }
    }

    private processLimitationStrategies(passageMetadataObject: {[key: string | number]: any}): void {
        if (passageMetadataObject.limitationStrategies === undefined || passageMetadataObject.limitationStrategies === null) {

            passageMetadataObject.limitationStrategies = [];
        } else if (isObject(passageMetadataObject.limitationStrategies) || isArray(passageMetadataObject.limitationStrategies)) {
            if (isObject(passageMetadataObject.limitationStrategies)) {
                passageMetadataObject.limitationStrategies = [passageMetadataObject.limitationStrategies];
            }

            for (let index = 0; index < passageMetadataObject.limitationStrategies.length; index++) {
                if (!isObject(passageMetadataObject.limitationStrategies[index])) {
                    throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'limitationStrategies', index], 'object', typeof passageMetadataObject.limitationStrategies[index]);
                }

                if (!isInteger(passageMetadataObject.limitationStrategies[index].max)) {
                    throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'limitationStrategies', index, 'max'], 'integer', typeof passageMetadataObject.limitationStrategies[index].max);
                }

                if (passageMetadataObject.limitationStrategies[index].max < 0) {
                    throw new PassageMetadataValidationError('Should equal or greater than 0', passageMetadataObject.passageName, ['PassageMetadata', 'limitationStrategies', index, 'max'], null, passageMetadataObject.limitationStrategies[index].max);
                }

                if (passageMetadataObject.limitationStrategies[index].isSeparate === undefined || passageMetadataObject.limitationStrategies[index].isSeparate === null) {
                    passageMetadataObject.limitationStrategies[index].isSeparate = false;
                } else if (!isBoolean(passageMetadataObject.limitationStrategies[index].isSeparate)) {
                    throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'limitationStrategies', index, 'isSeparate'], 'boolean', typeof passageMetadataObject.limitationStrategies[index].isSeparate);
                }

                if (passageMetadataObject.limitationStrategies[index].tags === undefined || passageMetadataObject.limitationStrategies[index].tags === null) {
                    passageMetadataObject.limitationStrategies[index].tags = [];
                } else if (isString(passageMetadataObject.limitationStrategies[index].tags) || isArray(passageMetadataObject.limitationStrategies[index].tags)) {
                    if (isString(passageMetadataObject.limitationStrategies[index].tags)) {
                        passageMetadataObject.limitationStrategies[index].tags = [passageMetadataObject.limitationStrategies[index].tags];
                    }

                    for (let tagindex = 0; tagindex < passageMetadataObject.limitationStrategies[index].tags.length; tagindex++) {
                        if (!isString(passageMetadataObject.limitationStrategies[index].tags[tagindex])) {
                            throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'limitationStrategies', index, 'tags', tagindex], 'string', typeof passageMetadataObject.limitationStrategies[index].tags[tagindex]);
                        }

                        if (isTweeScript(passageMetadataObject.limitationStrategies[index].tags[tagindex])) {
                            throw new PassageMetadataValidationError('Should not contain twee scripts', passageMetadataObject.passageName, ['PassageMetadata', 'limitationStrategies', index, 'tags', tagindex], 'string', typeof passageMetadataObject.limitationStrategies[index].tags[tagindex]);
                        }
                    }
                }

                if (passageMetadataObject.limitationStrategies[index].tags.length > 0) {
                    passageMetadataObject.limitationStrategies[index]._isTagged = true;
                    passageMetadataObject._isLimitationStrategiesTagged = true;
                } else {
                    passageMetadataObject.limitationStrategies[index]._isTagged = false;
                }
            }
        } else {
            throw new InvalidPassageMetadataValueType(passageMetadataObject.passageName, ['PassageMetadata', 'limitationStrategies'], 'object or array', typeof passageMetadataObject.limitationStrategies);
        }
    }
}

import DebugLogCollector from "./DebugLogCollector";
import { RewriteConfigurationType } from "./type/RewriteConfiguration";
import TagsManager from "./TagsManager";
import { LimitationStrategyType, RandomEventType } from "./type/PassageMetadata";
import SugarcubeFacade from "./facade/SugarcubeFacade";
import { isNumber } from "./tools/TypeChecker";
import RandomEventStats from "./RandomEventStats";

type ConstraintsVerificatingResult = {
    result: boolean,
    debugLogCollector: DebugLogCollector
    additionalData?: { [key: string]: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
};

export default class ConstraintsVerificator {
    constructor(
        private sugarcubeFacade: SugarcubeFacade,
        private tagsManager: TagsManager,
        private randomEventStats: RandomEventStats,
    ) {
    }

    verify(randomEvent: RandomEventType, compiledTags: string[], rewriteConfiguration: RewriteConfigurationType): ConstraintsVerificatingResult {
        let result = true;
        let usedLimitationStrategyTags: string[][] = [];
        const debugLogCollector = new DebugLogCollector();

        // Verify isEnabled
        if (rewriteConfiguration.isValidateIsEnable === false) {
            debugLogCollector.addLog(true, 'skip IsEnable verify', 2);
        } else {
            const isEnabled = rewriteConfiguration.isEnabled ?? randomEvent.isEnabled;
            const checkResult = this.verifyIsEnable(isEnabled);
            result = checkResult.result;
            debugLogCollector
                .addLog(checkResult.result, `verify IsEnable using: ${rewriteConfiguration.isEnabled !== undefined ? 'rewrite configuration' : 'passage metadata'}`, 2)
                .increaseLevel()
                .merge(checkResult.debugLogCollector)
                .decreaseLevel();
        }

        // Verify filter if isEnabled check passed
        if (result) {
            if (rewriteConfiguration.isValidateFilter === false) {
                debugLogCollector.addLog(true, 'skip filter verify', 2);
            } else {
                const filter = rewriteConfiguration.filter ?? randomEvent.filter;
                const checkResult = this.verifyFilter(filter);
                result = checkResult.result;
                debugLogCollector
                    .addLog(checkResult.result, `verify filter using: ${rewriteConfiguration.filter !== undefined ? 'rewrite configuration' : 'passage metadata'}`, 2)
                    .increaseLevel()
                    .merge(checkResult.debugLogCollector)
                    .decreaseLevel();
            }
        }

        // Verify limitation strategies if previous checks passed
        if (result) {
            let checkResult: ConstraintsVerificatingResult;
            if (randomEvent._isLimitationStrategiesTagged) {
                checkResult = this.verifyTaggedLimitationStrategy(
                    randomEvent.passageName,
                    randomEvent.limitationStrategies,
                    compiledTags
                );
            } else {
                checkResult = this.verifyNotTaggedLimitationStrategy(
                    randomEvent.passageName,
                    randomEvent.limitationStrategies,
                    compiledTags
                );
            }

            result = checkResult.result;
            debugLogCollector
                .addLog(checkResult.result, `verify limitationStrategies using: 'passage metadata'`, 2)
                .increaseLevel()
                .merge(checkResult.debugLogCollector)
                .decreaseLevel();
            usedLimitationStrategyTags = checkResult.additionalData.usedLimitationStrategyTags;
        }

        // Verify threshold if previous checks passed
        if (result) {
            if (rewriteConfiguration.isValidateThreshold === false) {
                debugLogCollector.addLog(true, 'skip threshold verify', 2);
            } else {
                const threshold = rewriteConfiguration.threshold ?? randomEvent.threshold;
                const checkResult = this.verifyThreshold(threshold);
                result = checkResult.result;
                debugLogCollector
                    .addLog(
                        checkResult.result,
                        `verify threshold using: ${rewriteConfiguration.threshold !== undefined ? 'rewrite configuration' : 'passage metadata'}`,
                        2
                    ).increaseLevel()
                    .merge(checkResult.debugLogCollector)
                    .decreaseLevel();
            }
        }

        return {
            result,
            debugLogCollector,
            additionalData: {
                usedLimitationStrategyTags
            }
        }
    }

    verifyIsEnable(isEnabled: boolean): ConstraintsVerificatingResult {
        const result = isEnabled;

        return {
            result,
            debugLogCollector: new DebugLogCollector().addLog(result, result ? 'event enabled': 'event disabled', 3)
        };
    }

    verifyFilter(filter: string | boolean): ConstraintsVerificatingResult {
        if (filter === true || filter === false) {
            return {
                result: filter,
                debugLogCollector: new DebugLogCollector().addLog(filter, `filter expression returns ${filter ? 'true' : 'false'}`, 3)
            };
        }

        let result;
        try {
            result = this.sugarcubeFacade.runTeweeScript(filter);
        } catch (error) {
            error.message = "bad evaluation: " + error.message;
            throw error;
        }

        if (result !== true && result !== false) {
            throw new Error(`invalid filter expression return type (expected: boolean: actual: ${typeof result})`);
        }

        return {
            result,
            debugLogCollector: new DebugLogCollector().addLog(result, `filter expression returns ${result ? 'true' : 'false'}`, 3)
        };
    }

    verifyTaggedLimitationStrategy(passageName: string, limitationStrategies: LimitationStrategyType[], compiledTags: string[]): ConstraintsVerificatingResult {
        const debugLogCollector = new DebugLogCollector();
        const usedLimitationStrategyTags: [string[]?] = [];
        let isSuccess = true;

        if (limitationStrategies.length <= 0) {
            return {
                result: true,
                debugLogCollector: new DebugLogCollector(),
                additionalData: {
                    usedLimitationStrategyTags: []
                },
            };
        }

        limitationStrategies.forEach(limitationStrategy => {
            // skip all next if already found limitation which is not passed
            if (isSuccess === false) {
                return;
            }

            if (limitationStrategy.max <= 0) {
                debugLogCollector.addLog(true, 'limitationStrategy max value <= 0', 3);
                return;
            }

            if (limitationStrategy.tags.length > 0) {
                const limitationStrategyTags = [...this.tagsManager.prepareTags(limitationStrategy.tags)];

                // skip checking limitationStrategy when current compiled tags have not included `limitation.tags`
                for (let i = 0; i < limitationStrategyTags.length; i++) {
                    if (!compiledTags.includes(limitationStrategyTags[i])) {
                        debugLogCollector
                            .addLog(false, `tag '${limitationStrategyTags[i]}' not found in current tags`, 3)
                            .increaseLevel()
                            .increaseLevel()
                            .addLog(null, `current tags   : ${compiledTags.join(', ')}`, 3)
                            .addLog(null, `limitation tags: ${limitationStrategyTags.join(', ')}`, 3)
                            .decreaseLevel()
                            .decreaseLevel();
                        return;
                    }
                }

                const fullLimitationStrategyTags = [
                    ...limitationStrategyTags,
                    ...(limitationStrategy.isSeparate ? [passageName] : [])
                ];
                const fullLimitationStrategyTagsKey = this.tagsManager.convertTagsToStringKey(fullLimitationStrategyTags);
                const actualFiredTagCount = this.randomEventStats.getTagRunCountActual(fullLimitationStrategyTagsKey);
                if (actualFiredTagCount >= limitationStrategy.max) {
                    isSuccess = false;
                    debugLogCollector.addLog(
                        false,
                        `limitationStrategy with tags ['${limitationStrategyTags.join(', ')}'] have max value ${limitationStrategy.max} but already fired ${actualFiredTagCount} times`,
                        3
                    );
                    return;
                } else {
                    usedLimitationStrategyTags.push(fullLimitationStrategyTags);
                    debugLogCollector.addLog(
                        true,
                        `limitationStrategy with tags ['${limitationStrategyTags.join(', ')}'] have max value ${limitationStrategy.max} and already fired ${actualFiredTagCount} times`,
                        3
                    );
                }
            } else {
                const actualFiredEventCount = this.randomEventStats.getPassageRunCountActual(passageName);
                if (actualFiredEventCount >= limitationStrategy.max) {
                    isSuccess = false;
                    debugLogCollector.addLog(
                        false,
                        `limitationStrategy without tags have max value ${limitationStrategy.max} but already fired ${actualFiredEventCount} times`,
                        3
                    );
                    return;
                } else {
                    debugLogCollector.addLog(
                        true,
                        `limitationStrategy without tags have max value ${limitationStrategy.max} and already fired ${actualFiredEventCount} times`,
                        3
                    );
                }
            }
        });

        if (isSuccess && usedLimitationStrategyTags.length <= 0) {
            isSuccess = false;
            debugLogCollector.addLog(
                false,
                `not found any limitationStrategy where current tags cover all limitationStrategy tags (current tags: ${compiledTags.join(', ')}`,
                3
            );
        }

        return {
            result: isSuccess,
            debugLogCollector,
            additionalData: { usedLimitationStrategyTags }
        };
    }

    verifyNotTaggedLimitationStrategy(passageName: string, limitationStrategies: LimitationStrategyType[], compiledTags: string[]): ConstraintsVerificatingResult {
        const debugLogCollector = new DebugLogCollector();
        const usedLimitationStrategyTags: [string[]?] = [];
        let isSuccess = true;

        if (limitationStrategies.length <= 0) {
            return {
                result: true,
                debugLogCollector: new DebugLogCollector(),
                additionalData: {
                    usedLimitationStrategyTags: []
                },
            };
        }

        limitationStrategies.forEach(limitationStrategy => {
            if (limitationStrategy.max <= 0) {
                debugLogCollector.addLog(true, 'limitationStrategy max value <= 0', 3);
                return;
            }

            const actualFiredEventCount = this.randomEventStats.getPassageRunCountActual(passageName);
            if (actualFiredEventCount >= limitationStrategy.max) {
                isSuccess = false;
                debugLogCollector.addLog(
                    false,
                    `random event have max value ${limitationStrategy.max} but already fired ${actualFiredEventCount} times`,
                    3
                );
                return;
            } else {
                debugLogCollector.addLog(
                    true,
                    `random event have max value ${limitationStrategy.max} and already fired ${actualFiredEventCount} times`,
                    3
                );
            }
        });

        return {
            result: isSuccess,
            debugLogCollector,
            additionalData: { usedLimitationStrategyTags }
        };
    }

    verifyThreshold(threshold: number | string): ConstraintsVerificatingResult {
        let thresholdResult = 0;
        if (!isNumber(threshold)) {
            try {
                thresholdResult = this.sugarcubeFacade.runTeweeScript(threshold.toString());
            } catch (error) {
                error.message = "bad evaluation: " + error.message;
                throw error;
            }
        } else {
            thresholdResult = threshold as number;
        }

        if (thresholdResult >= 100) {
            return {
                result: true,
                debugLogCollector: new DebugLogCollector().addLog(
                    true,
                    'threshold is equal to or greater than 100',
                    3
                )
            }
        }

        const randomValue = Math.floor(Math.random() * 100);
        if (randomValue > thresholdResult) {
            return {
                result: false,
                debugLogCollector: new DebugLogCollector().addLog(
                    false,
                    `random value is greater than threshold (random=${randomValue} > threshold=${thresholdResult})`,
                    3
                )
            };
        }

        return {
            result: true,
            debugLogCollector: new DebugLogCollector().addLog(
                true,
                'threshold passed (random=' + randomValue + ' <= threshold=' + thresholdResult + ')',
                3
            )
        };
    }
}

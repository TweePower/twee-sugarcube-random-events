import History from "./History";
import LimitationStrategyList from "./model/LimitationStrategyList";
import DebugLogCollector from "./DebugLogCollector";
import { RewriteConfigurationType } from "./type/RewriteConfiguration";
import PassageMetadata from "./PassageMetadata";
import SugarcubeFacade from "./facade/SugarcubeFacade";
import TagsManager from "./TagsManager";

type ConstraintsVerificatingResult = {
    result: boolean,
    debugLogCollector: DebugLogCollector
    additionalData?: { [key: string]: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
};

export default class ConstraintsVerificator {
    constructor(
        private sugarcubeFacade: SugarcubeFacade,
        private tagsManager: TagsManager,
        private history: History,
    ) {
    }

    verify(passageMetadata: PassageMetadata, rewriteConfiguration: RewriteConfigurationType): ConstraintsVerificatingResult {
        let result = true;
        let usedLimitationStrategyTags = [];
        const debugLogCollector = new DebugLogCollector();
        const compiledTags = this.tagsManager.prepareTags(passageMetadata.tags);

        if (rewriteConfiguration.isValidateIsEnable === true) {
            const checkResult = this.verifyIsEnable(rewriteConfiguration.isEnable ?? passageMetadata.isEnabled);
            result = checkResult.result;
            debugLogCollector
                .addLog(
                    checkResult.result,
                    `verify IsEnable using: ${rewriteConfiguration.isEnable ? 'rewrite configuration' : 'definition configuration'}`,
                    2
                ).increaseLevel()
                .merge(checkResult.debugLogCollector)
                .decreaseLevel();
        } else {
            debugLogCollector.addLog(true, 'skip IsEnable verify', 2);
        }

        if (result) {
            if (rewriteConfiguration.isValidateFilter === true) {
                const checkResult = this.verifyFilter(rewriteConfiguration.filter ?? passageMetadata.filter);
                result = checkResult.result;
                debugLogCollector
                    .addLog(
                        checkResult.result,
                        `verify filter using: ${rewriteConfiguration.filter ? 'rewrite configuration' : 'definition configuration'}`,
                        2
                    ).increaseLevel()
                    .merge(checkResult.debugLogCollector)
                    .decreaseLevel();
            } else {
                debugLogCollector.addLog(true, 'skip filter verify', 2);
            }
        }

        if (result) {
            if (rewriteConfiguration.isValidateLimitationStrategy) {
                const checkResult = this.verifyLimitationStrategy(compiledTags, rewriteConfiguration.limitationStrategy ?? passageMetadata.limitationStrategy, passageMetadata.name);
                result = checkResult.result;
                debugLogCollector
                    .addLog(
                        checkResult.result,
                        `verify limitationStrategy using: ${rewriteConfiguration.limitationStrategy ? 'rewrite configuration' : 'definition configuration'}`,
                        2
                    ).increaseLevel()
                    .merge(checkResult.debugLogCollector)
                    .decreaseLevel();
                usedLimitationStrategyTags = checkResult.additionalData.usedLimitationStrategyTags;
            } else {
                debugLogCollector.addLog(true, 'skip limitationStrategy verify', 2);
            }
        }

        if (result) {
            if (rewriteConfiguration.isValidateThreshold) {
                const checkResult = this.verifyThreshold(rewriteConfiguration.threshold ?? passageMetadata.threshold);
                result = checkResult.result;
                debugLogCollector
                    .addLog(
                        checkResult.result,
                        `verify threshold using: ${rewriteConfiguration.threshold ? 'rewrite configuration' : 'definition configuration'}`,
                        2
                    ).increaseLevel()
                    .merge(checkResult.debugLogCollector)
                    .decreaseLevel();
            } else {
                debugLogCollector.addLog(true, 'skip threshold verify', 2);
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
        return {
            result: isEnabled,
            debugLogCollector: new DebugLogCollector().addLog(isEnabled, isEnabled ? 'event enabled': 'event disabled', 3)
        };
    }

    verifyFilter(filter: string | null): ConstraintsVerificatingResult {
        const debugLogCollector = new DebugLogCollector();

        if (filter !== null) {
            try {
                if (!this.sugarcubeFacade.runTeweeScript(filter)) {
                    debugLogCollector.addLog(false, 'filter expression returns false', 3);
                    return { result: false, debugLogCollector };
                }
            } catch (err) {
                err.message = "bad evaluation: " + err.message;
                throw err;
            }
        }

        debugLogCollector.addLog(true, 'filter expression returns true', 3);
        return { result: true, debugLogCollector };
    }

    verifyLimitationStrategy(compiledTags: string[], limitationStrategyList: LimitationStrategyList, passageName: string): ConstraintsVerificatingResult {
        const debugLogCollector = new DebugLogCollector();
        const usedLimitationStrategyTags: [string[]?] = [];
        let isSuccess = true;

        if (limitationStrategyList.length > 0) {
            if (limitationStrategyList.isTaged) {
                limitationStrategyList.all().forEach(limitationStrategy => {
                    // skip all next if already found limitation which is not passed
                    if (isSuccess === false) {
                        return;
                    }

                    // without limitation
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
                        const actualFiredTagCount = this.history.getActualFiredTagCount(fullLimitationStrategyTagsKey);
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
                        const actualFiredEventCount = this.history.getActualFiredEventCount(passageName);
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
            } else {
                limitationStrategyList.all().forEach(limitationStrategy => {
                    // without limitation
                    if (limitationStrategy.max <= 0) {
                        debugLogCollector.addLog(true, 'limitationStrategy max value <= 0', 3);
                        return;
                    }

                    const actualFiredEventCount = this.history.getActualFiredEventCount(passageName);
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
            }
        }

        return {
            result: isSuccess,
            debugLogCollector,
            additionalData: { usedLimitationStrategyTags }
        };
    }

    verifyThreshold(threshold: string | number): ConstraintsVerificatingResult {
        const debugLogCollector = new DebugLogCollector();
        let thresholdResult = 0;
        if (typeof threshold !== 'number' || isNaN(threshold) || threshold % 1 !== 0) {
            try {
                thresholdResult = this.sugarcubeFacade.runTeweeScript(threshold.toString());
            } catch (err) {
                err.message = "bad evaluation: " + err.message;
                throw err;
            }
        } else {
            thresholdResult = threshold;
        }

        const randomValue = Math.floor(Math.random() * 100);
        if (randomValue > thresholdResult) {
            debugLogCollector.addLog(
                false,
                `random value is greater than threshold (random=${randomValue} > threshold=${thresholdResult})`,
                3
            );
            return { result: false, debugLogCollector };
        }

        debugLogCollector.addLog(
            true,
            'threshold passed (random=' + randomValue + ' <= threshold=' + thresholdResult + ')',
            3
        );
        return { result: true, debugLogCollector };
    }
}

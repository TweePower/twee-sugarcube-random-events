import TypeChecker from "./tools/TypeChecker";
import LimitationStrategy from "./LimitationStrategy";

export default class LimitationStrategyList {
    isTaged = false;

    constructor(public limitationStrategies: LimitationStrategy[]) {
        const tagsValidation: { [key: string]: boolean } = {};
        this.limitationStrategies.forEach((limitationStrategy) => {
            if (!this.isTaged && limitationStrategy.tags.length > 0) {
                this.isTaged = true;
            }

            if (tagsValidation[limitationStrategy.tags.toStringKey()] !== undefined) {
                throw new Error(`"definition.limitationStrategy" should containg uniq tag sets (tags: "${limitationStrategy.tags.tags.map(tag => tag.tag).join('", "')}")`);
            }

            tagsValidation[limitationStrategy.tags.toStringKey()] = true;
        });
    }

    static createFromLimitationStrategiesDefinition(limitationStrategiesDefinition: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (limitationStrategiesDefinition === undefined) {
            return new LimitationStrategyList([]);
        } else {
            if (!TypeChecker.isArray(limitationStrategiesDefinition)) {
                throw new Error(`"definition.limitationStrategy" should be array`);
            }
            return new LimitationStrategyList(limitationStrategiesDefinition.map((limitationStrategyDefinition: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                return LimitationStrategy.createFromLimitationStrategyDefinition(limitationStrategyDefinition)
            }));
        }
    }

    get length() {
        return this.limitationStrategies.length;
    }

    all(): LimitationStrategy[] {
        return this.limitationStrategies;
    }
}

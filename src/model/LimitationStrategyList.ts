import LimitationStrategy from "./LimitationStrategy";

export default class LimitationStrategyList {
    isTaged = false;

    constructor(public limitationStrategies: LimitationStrategy[]) {
        this.limitationStrategies.forEach((limitationStrategy) => {
            if (!this.isTaged && limitationStrategy.tags.length > 0) {
                this.isTaged = true;
            }
        });
    }

    get length() {
        return this.limitationStrategies.length;
    }

    all(): LimitationStrategy[] {
        return this.limitationStrategies;
    }
}

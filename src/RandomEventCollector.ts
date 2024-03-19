import TypeChecker from "./tools/TypeChecker";
import RandomEvent from "./RandomEvent";
import RandomEventCollection from "./RandomEventCollection";
import { RandomEventDefinitionType } from "./type/Definition";

declare let Story: {
    lookup(): [{ tags: string[], title: string, element: { textContent: string } }];
};

export default class RandomEventCollector {
    isInit = false;

    constructor(
        private randomEventCollection: RandomEventCollection,
        private randomEventTag: string,
        private randomEventDefinitionRegex: RegExp,
    ) {
    }

    init() {
        if (this.isInit) {
            return;
        }

        const randomEventPassages = Story.lookup().filter((passge) => { return passge.tags.includes(this.randomEventTag) });

        randomEventPassages.forEach((passage) => {
            this.randomEventDefinitionRegex.lastIndex = 0;
            const randomEventDefinitionResult = this.randomEventDefinitionRegex.exec(passage.element.textContent);
            if (randomEventDefinitionResult === null) {
                throw new Error(`Random event definition not found in ${passage.title}`);
            }


            const randomEventDefinition = randomEventDefinitionResult[1];
            let randomEventDefinitionEvalResult: RandomEventDefinitionType;
            try {
                eval('randomEventDefinitionEvalResult = ' + randomEventDefinition);
                if (!TypeChecker.isObject(randomEventDefinitionEvalResult)) {
                    throw new Error("Random event definition JSON should contain object");
                }
            } catch (e) {
                e.message = `Invalid random event definition JSON in passage ${passage.title}: ${e.message}`;
                throw e;
            }
            randomEventDefinitionEvalResult.name = passage.title;
            this.randomEventCollection.add(RandomEvent.createFromDefinition(randomEventDefinitionEvalResult));

            passage.element.textContent = passage.element.textContent.replace(randomEventDefinitionResult[0], '').trim();
        });
        this.randomEventCollection.cleanUp();

        this.isInit = true;
    }
}

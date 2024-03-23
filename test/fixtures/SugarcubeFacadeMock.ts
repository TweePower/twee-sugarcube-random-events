import { default as BaseSugarcubeFacade } from "../../src/facade/SugarcubeFacade";

type PassageType = { tags: string[], title: string, element: { textContent: string } };

export default class SugarcubeFacade extends BaseSugarcubeFacade {
    passages: PassageType[] = [];

    createPassage(title: string, tags: string[], content: string, metadata: { [key: string]: any } | null = null ): PassageType {
        let resultContent = '';
        if (metadata !== null) {
            resultContent = `<<PassageMetadata>>\n${JSON.stringify(metadata, null, 4)}<</PassageMetadata>>\n`
        }
        resultContent += content;

        return {
            title: title,
            tags: tags,
            element: {
                textContent: resultContent
            }
        }
    }

    setPassagesList(passages: PassageType[]) {
        this.passages = passages;
    }

    getAllPassages(): PassageType[] {
        return this.passages;
    }

    // runTeweeScript(expression: string) {
    //     // TODO: cache result decorator
    //     return Scripting.evalJavaScript(Scripting.parse(expression));
    // }

    // hasPassage(passageName: string): boolean {
    //     return Story.has(passageName);
    // }

    // saveVariable(name: string, value: string | number | boolean): void {
    //     State.variables[name] = value;
    // }
}

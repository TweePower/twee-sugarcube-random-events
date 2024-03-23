declare let Story: {
    has(passageName: string): boolean;
    lookup(): { tags: string[], title: string, element: { textContent: string } }[];
};

declare let State: {
    variables: { [key: string]: any } // eslint-disable-line @typescript-eslint/no-explicit-any
}

// TODO: Add specific errors
export default class SugarcubeFacade {
    getAllPassages() {
        return Story.lookup();
    }

    runTeweeScript(expression: string) {
        // TODO: cache result decorator
        return Scripting.evalJavaScript(Scripting.parse(expression));
    }

    hasPassage(passageName: string): boolean {
        return Story.has(passageName);
    }

    saveVariable(name: string, value: string | number | boolean): void {
        State.variables[name] = value;
    }
}

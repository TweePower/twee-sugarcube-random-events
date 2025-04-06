declare let Story: {
    has(passageName: string): boolean;
    lookup(): { tags: string[], title: string, element: { textContent: string } }[];
};

declare let State: {
    variables: { [key: string]: any } // eslint-disable-line @typescript-eslint/no-explicit-any
}

declare function passage(): string;

export default class SugarcubeFacade {
    getAllPassages() {
        return Story.lookup();
    }

    runTeweeScript(expression: string) {
        return Scripting.evalJavaScript(Scripting.parse(expression));
    }

    getCurrentPassage(): string {
        return passage();
    }

    hasPassage(passageName: string): boolean {
        return Story.has(passageName);
    }

    getVariable(name: string): string | number | boolean {
        return State.variables[name];
    }

    saveVariable(name: string, value: string | number | boolean): void {
        State.variables[name] = value;
    }

    addMacros(name: string, options: any): void {
        Macro.add(name, options);
    }
}

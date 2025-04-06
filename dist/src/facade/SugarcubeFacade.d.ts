export default class SugarcubeFacade {
    getAllPassages(): {
        tags: string[];
        title: string;
        element: {
            textContent: string;
        };
    }[];
    runTeweeScript(expression: string): any;
    getCurrentPassage(): string;
    hasPassage(passageName: string): boolean;
    getVariable(name: string): string | number | boolean;
    saveVariable(name: string, value: string | number | boolean): void;
    addMacros(name: string, options: any): void;
}
//# sourceMappingURL=SugarcubeFacade.d.ts.map
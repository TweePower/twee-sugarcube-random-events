declare let Scripting: {
    evalJavaScript(expression: string): any; // eslint-disable-line @typescript-eslint/no-explicit-any
    parse(expression: string): string;
};

export default class Tags {
    isHaveTweeScriptTags = false;
    tags: null | { isHaveTweeScript: boolean; tag: string }[] = [];
    stringTags: null | string[] = [];

    constructor(tags: string[]) {
        tags.forEach((tag) => {
            if (Tags.isHaveTweeScript(tag)) {
                this.tags.push({
                    isHaveTweeScript: true,
                    tag: tag,
                });
                this.isHaveTweeScriptTags = true;
            } else {
                tag = tag.toLowerCase().trim().replace(' ', '__');
                this.tags.push({
                    isHaveTweeScript: false,
                    tag: tag,
                });
                this.stringTags.push(tag);
            }
        });
        this.stringTags.sort();

        if (!this.isHaveTweeScriptTags) {
            this.tags = null;
        }
    }

    static isHaveTweeScript(tag: string): boolean {
        return !(/^\w+[\w_\- ]+$/.test(tag));
    }

    static createFromTagsDefinition(tagsDefinition: string[] | undefined): Tags {
        if (tagsDefinition === undefined) {
            return new Tags([]);
        } else {
            if (!Array.isArray(tagsDefinition)) {
                throw new Error(`"definition.tags" should be array`);
            }
            return new Tags(tagsDefinition.map((tag) => {
                if (typeof tag !== 'string') {
                    throw new Error(`"definition.tags[...]" should be string`);
                }

                return tag;
            }));
        }
    }

    get length(): number {
        if (!this.isHaveTweeScriptTags) {
            return this.stringTags.length;
        } else {
            return this.tags.length;
        }
    }

    getStringTags(): string[] {
        return this.stringTags;
    }

    getCompiledTags(): string[] {
        if (!this.isHaveTweeScriptTags) {
            return this.stringTags;
        } else {
            return this.tags.map((tag) => {
                if (!tag.isHaveTweeScript) {
                    return tag.tag;
                } else {
                    try {
                        return Scripting.evalJavaScript((Scripting.parse(tag.tag))).toLowerCase().trim().replace(' ', '__');
                    } catch (err) {
                        throw new Error("Invalid random event scripted tag: " + tag.tag);
                    }
                }
            }).sort();
        }
    }

    toStringKey(): string {
        return this.getCompiledTags().join('_');
    }
}

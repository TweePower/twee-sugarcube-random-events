import RandomEventApp from "../RandomEventApp";
import PassageMetadataApp from "twee-sugarcube-passage-metadata-collector/src/PassageMetadataApp";
import SugarcubeFacade from "../facade/SugarcubeFacade";

import {EngineAPI as BaseEngineAPI} from "twine-sugarcube/engine";

declare interface EngineAPI extends BaseEngineAPI {
    minDomActionDelay: number;
}

declare let Engine: EngineAPI;

export default (randomEventApp: RandomEventApp, passageMetadataApp: PassageMetadataApp, sugarcubeFacade: SugarcubeFacade) => {
    sugarcubeFacade.addMacros('REEnable', {
        handler: function() {
            if (this.args.length === 0) {
                return this.error('No random event passage name specified');
            }

            var randomEventPassageName;
            if (typeof this.args[0] === 'object') {
                randomEventPassageName = this.args[0].link;
            } else {
                randomEventPassageName = this.args[0];
            }

            try {
                randomEventApp.enable(randomEventPassageName);
            } catch (err) {
                this.error(err.message);
            }
        },
    });

    // TODO: Currently work only with 1 tag, will add possibility to pass multiply tags later
    sugarcubeFacade.addMacros('REEnableByTag', {
        handler: function() {
            if (this.args.length !== 1) {
                return this.error('Need to pass just 1 tag');
            }

            if (typeof this.args[0] !== 'string') {
                return this.error('Random event tag should be a string value');
            }

            try {
                randomEventApp.enableByTag(this.args[0]);
            } catch(err) {
                this.error(err.message);
            }
        },
    });

    sugarcubeFacade.addMacros('REDisable', {
        handler: function() {
            if (this.args.length === 0) {
                return this.error('No random event passage name specified');
            }

            var randomEventPassageName;
            if (typeof this.args[0] === 'object') {
                randomEventPassageName = this.args[0].link;
            } else {
                randomEventPassageName = this.args[0];
            }

            try {
                randomEventApp.disable(randomEventPassageName);
            } catch (err) {
                this.error(err.message);
            }
        },
    });

    // TODO: Currently work only with 1 tag, will add possibility to pass multiply tags later
    sugarcubeFacade.addMacros('REDisableByTag', {
        handler: function() {
            if (this.args.length !== 1) {
                return this.error('Need to pass just 1 tag');
            }

            if (typeof this.args[0] !== 'string') {
                return this.error('Random event tag should be a string value');
            }

            try {
                randomEventApp.disableByTag(this.args[0]);
            } catch(err) {
                this.error(err.message);
            }
        },
    });

    sugarcubeFacade.addMacros('REReset', {
        handler: function() {
            if (this.args.length === 0) {
                return this.error('No random event passage name specified');
            }

            var randomEventPassageName;
            if (typeof this.args[0] === 'object') {
                randomEventPassageName = this.args[0].link;
            } else {
                randomEventPassageName = this.args[0];
            }

            try {
                randomEventApp.resetRunCounterByPassage(randomEventPassageName);
            } catch (err) {
                this.error(err.message);
            }
        },
    });

    // TODO: Currently work only with 1 tag, will add possibility to pass multiply tags later
    sugarcubeFacade.addMacros('REResetByTag', {
        handler: function() {
            if (this.args.length !== 1) {
                return this.error('Need to pass just 1 tag');
            }

            if (typeof this.args[0] !== 'string') {
                return this.error('Random event tag should be a string value');
            }

            try {
                randomEventApp.resetRunCounterByTag(this.args[0]);
            } catch (err) {
                this.error(err.message);
            }
        },
    });


    sugarcubeFacade.addMacros('RE', {
        handler: function() {
            if (this.args.length === 0) {
                return this.error('No random event passage name specified');
            }

            var randomEventPassageName: string;
            if (typeof this.args[0] === 'object') {
                randomEventPassageName = this.args[0].link;
            } else {
                randomEventPassageName = this.args[0];
            }

            try {
                // TODO: maybe need to add more rewrite widget arguments
                var result = randomEventApp.runRandomEvent(randomEventPassageName, {
                    threshold: this.args[1]
                });
            } catch (err) {
                this.error(err.message);
            }

            if (Config.debug) {
                var debugLog = '';
                if (result.debugLogCollector.debugLevel > 0) {
                    debugLog = result.debugLogCollector.toString();
                }
                this.debugView.name = 'RE "' + randomEventPassageName + '"';
                this.debugView.title = debugLog;
                this.debugView.modes({
                    nonvoid: true,
                    hidden: false,
                    invalid: !result.isSuccess
                });

                if (result.debugLogCollector.debugLevel > 0) {
                    console.log(debugLog);
                }
            }
            // TODO remove this
            if (result.debugLogCollector.debugLevel > 0) {
                var debugLog = '';
                debugLog += result.debugLogCollector.toString();

                console.log(debugLog);
            }

            if (result.isSuccess) {
                randomEventApp.incrementRunCounters(randomEventPassageName, result.resultList[0].usedTags);

                if (result.resultList[0].passageMetadata.type === 'embedded') {
                    var $el = jQuery(this.output);
                    $el.wiki(Story.get(randomEventPassageName).processText());
                } else {
                    randomEventApp.acquireLock();
                    setTimeout(function() { Engine.play(randomEventPassageName, true), Engine.minDomActionDelay });
                }
            }
        },
    });

    sugarcubeFacade.addMacros('REGroup', {
        handler: function() {
            if (typeof this.args[0] !== 'string') {
                return this.error('Random event group name should be a string value');
            }
            var groupName = this.args[0];

            if (this.args[1] !== undefined && this.args[1] !== null &&  typeof this.args[1] !== 'number') {
                return this.error('Random event result count should be a integer value');
            }
            var groupResultCount = this.args[1] ?? 1;

            if (this.args[2] !== undefined &&  typeof this.args[2] !== 'number') {
                return this.error('Random event group threshold should be a integer value');
            }
            var groupThreshold = this.args[2];

            try {
                // TODO: maybe need to add more arguments
                var result = randomEventApp.runGroup(groupName, groupThreshold, groupResultCount);
            } catch (err) {
                this.error(err.message);
            }

            if (Config.debug) {
                var debugLog = 'REGroup "' + groupName + '"';
                if (result.debugLogCollector.debugLevel > 0) {
                    debugLog = result.debugLogCollector.toString();
                }
                this.debugView.name = 'REGroup "' + groupName + '"';
                this.debugView.title = debugLog;
                this.debugView.modes({
                    nonvoid: true,
                    hidden: false,
                    invalid: !result.isSuccess
                });

                if (result.debugLogCollector.debugLevel > 0) {
                    console.log(debugLog);
                }
            }
            // TODO remove this
            if (result.debugLogCollector.debugLevel > 0) {
                var debugLog = '';
                debugLog += result.debugLogCollector.toString();

                console.log(debugLog);
            }

            if (result.isSuccess) {
                for (let index = 0; index < result.resultList.length; index++) {
                    if (result.resultList[index].passageMetadata.type !== 'embedded') {
                        randomEventApp.incrementRunCounters(result.resultList[index].passageMetadata.passageName, result.resultList[index].usedTags);

                        randomEventApp.acquireLock();
                        setTimeout(function() { Engine.play(result.resultList[index].passageMetadata.passageName, true), Engine.minDomActionDelay });
                        return;
                    }
                }

                for (let index = 0; index < result.resultList.length; index++) {
                    const passageMetadata = result.resultList[index].passageMetadata;
                    const usedTags = result.resultList[index].usedTags;

                    randomEventApp.incrementRunCounters(passageMetadata.passageName, usedTags);

                    var $el = jQuery(this.output);
                    $el.wiki(Story.get(passageMetadata.passageName).processText());
                }
            }
        },
    });
}

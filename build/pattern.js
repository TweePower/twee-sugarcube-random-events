// repository: https://github.com/TweePower/twee-sugarcube-random-events
(function () {
    'use strict';

/*<<RandomEventAppLibraryPlaceholder>>*/

    var RandomEventApp = RandomEventAppExport.default;

    ////////////////////////////////
    // Initialize random event block
    ////////////////////////////////

    var re = new RandomEventApp(
        /<<PassageMetadata>>(.*)<<\/PassageMetadata>>/gms,
        'byTag',
        { filterTag: 'passage_metadata' },
        3, // max debug level
    );
    re.init();

    // TODO start: If somebody knows how to rewrite these more beautifully/correctly, please let me know :)
    $(document).on(':passageend', function() {
        re.releaseLock();
    });

    Engine = new Proxy(Engine, {
        get: function(target, prop) {
            if (prop === 'backward' || prop === 'forward') {
                jQuery.event.trigger({
                    type: ':called_' + prop,
                });
            }

            return target[prop];
        }
    });

    $(document).on(':called_backward', function() {
        re.resetStateLoadedFlag();
    });
    $(document).on(':called_forward', function() {
        re.resetStateLoadedFlag();
    });

    Config.navigation.override = (destinationPassage) => {
        if (re.isLocked && !re.has(destinationPassage)) {
            // if random event fired in <<button>> or <<link>>, return previous passage to normal history forward work
            return passage();
        }

        return destinationPassage;
    };

    Save.onLoad.add((save) => {
        if (save.state.history.length > 0) {
            var historyVariables = save.state.history[save.state.history.length-1].variables;

            re.loadState(historyVariables);
        }
        re.setStateAsLoaded();
    });
    // TODO end

    ///////////////////////////
    // Macros declaration block
    ///////////////////////////

    Macro.add('REEnable', {
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
                re.loadState(State.variables);
                re.enable(randomEventPassageName);
            } catch (err) {
                this.error(err.message);
            }
        },
    });

    // TODO: Currently work only with 1 tag, will add possibility to pass multiply tags later
    Macro.add('REEnableByTag', {
        handler: function() {
            if (this.args.length !== 1) {
				return this.error('Need to pass just 1 tag');
			}

            if (typeof this.args[0] !== 'string') {
                return this.error('Random event tag should be a string value');
            }

            try {
                re.loadState(State.variables);
                re.enableByTag(this.args[0]);
            } catch(err) {
                this.error(err.message);
            }
        },
    });

    Macro.add('REDisable', {
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
                re.loadState(State.variables);
                re.disable(randomEventPassageName);
            } catch (err) {
                this.error(err.message);
            }
        },
    });

    // TODO: Currently work only with 1 tag, will add possibility to pass multiply tags later
    Macro.add('REDisableByTag', {
        handler: function() {
            if (this.args.length !== 1) {
				return this.error('Need to pass just 1 tag');
			}

            if (typeof this.args[0] !== 'string') {
                return this.error('Random event tag should be a string value');
            }

            try {
                re.loadState(State.variables);
                re.disableByTag(this.args[0]);
            } catch(err) {
                this.error(err.message);
            }
        },
    });

    Macro.add('REReset', {
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
                re.loadState(State.variables);
                re.resetFiredCounterByRandomEvent(randomEventPassageName);
            } catch (err) {
                this.error(err.message);
            }
        },
    });

    // TODO: Currently work only with 1 tag, will add possibility to pass multiply tags later
    Macro.add('REResetByTag', {
        handler: function() {
            if (this.args.length !== 1) {
				return this.error('Need to pass just 1 tag');
			}

            if (typeof this.args[0] !== 'string') {
                return this.error('Random event tag should be a string value');
            }

            try {
                re.loadState(State.variables);
                re.resetFiredCounterByTag(this.args[0]);
            } catch (err) {
                this.error(err.message);
            }
        },
    });

    Macro.add('RE', {
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
                // TODO: maybe need to add more rewrite widget arguments
                var result = re.runRandomEvent(randomEventPassageName, {
                    threshold: this.args[1]
                });
            } catch (err) {
                this.error(err.message);
            }

            if (Config.debug) {
                var debugLog = 'RE "' + result.passageMetadata.name + '"';
                if (result.debugLogCollector.debugLevel > 0) {
                    debugLog = result.debugLogCollector.toString();
                }
                this.debugView.name = 'RE "' + result.passageMetadata.name + '"';
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

            if (result.isSuccess) {
                re.incrementCounters(result.passageMetadata, result.usedTags);

                if (result.passageMetadata.type === 'embaded') {
                    var $el = jQuery(this.output);
                    $el.wiki(Story.get(result.passageMetadata.name).processText());
                } else {
                    re.acquireLock();
                    setTimeout(function() { Engine.play(result.passageMetadata.name, true), Engine.minDomActionDelay });
                }
            }
        },
    });

    Macro.add('REGroup', {
        handler: function() {
            if (typeof this.args[0] !== 'string') {
                return this.error('Random event group name should be a string value');
            }
            var groupName = this.args[0].toLowerCase();

            try {
                // TODO: maybe need to add more rewrite widget arguments
                var result = re.runGroup(groupName, this.args[1]);
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

            if (result.isSuccess) {
                re.incrementCounters(result.passageMetadata, result.usedTags);

                if (result.passageMetadata.type === 'embaded') {
                    var $el = jQuery(this.output);
                    $el.wiki(Story.get(result.passageMetadata.name).processText());
                } else {
                    re.acquireLock();
                    setTimeout(function() { Engine.play(result.passageMetadata.name, true), Engine.minDomActionDelay });
                }
            }
        },
    });

    ///////////////////////
    // Public methods block
    ///////////////////////

    window.isHasRE = (passageName = '') => {
        return re.has(passageName);
    }

    window.isPassageRE = function() {
        return re.has(passage());
    }

    window.isPreviousRE = function() {
        return randomEventCollection.has(previous());
    }

    window.isREFired = (passageName = '', isUseHistory = true) => {
        if (isUseHistory) {
            return re.history.getHistoryFiredEventCount(passageName) > 0;
        }

        return re.history.getActualFiredEventCount(passageName) > 0;
    }

    window.isRETagFired = (tag = '', isUseHistory = true) => {
        if (isUseHistory) {
            return re.history.getHistoryFiredTagCount(tag) > 0;
        }

        return re.history.getActualFiredTagCount(tag) > 0;
    }
}());

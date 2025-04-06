// repository: https://github.com/TweePower/twee-sugarcube-random-events

const debugLevel = 3; // max debug level

(function () {
    'use strict';

    /*<<RandomEventAppLibraryPlaceholder>>*/
    var RandomEventApp = RandomEventAppExport.default;

    function initialize() {
        var randomEventApp = new RandomEventApp(
            window.passageMetadataApp,
            debugLevel,
        );

        $(document).on(':passageend', function() {
            randomEventApp.releaseLock();
        });

        Config.navigation.override = (destinationPassage) => {
            if (randomEventApp.isLocked && !randomEventApp.has(destinationPassage)) {
                // if random event fired in <<button>> or <<link>>, return previous passage to normal history forward work
                return realCurrentPassage ?? passage();
            }

            return destinationPassage;
        };

        window.randomEventApp = randomEventApp;
    }

    window.addEventListener('passage-metadata-app-initialized', () => {
        initialize();
    });
    if (window.passageMetadataApp !== undefined) {
        initialize();
    }
}());

const specialCharsMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '`': '&#x60;',
    '"': '&quot;',
    "'": '&#039;',
    '\$': '&dollar;',
    "\\n": '<br>',
    '=': '&equals;',
    '_': '&lowbar;',
    '': '',
};

window.escapeSpecialChars = (code) => {
    return code.replace(/(&|<|>|`|"|'|\$|\\n|\=|_)/g, (word) => specialCharsMap[word]);
};

window.getDebug = () => {
    var debug = 'Stored passages state:<pre><code>';
    debug += State.variables.passageMetadataState !== undefined
    	? escapeSpecialChars(JSON.stringify(JSON.parse(State.variables.passageMetadataState), null, 4))
    	: 'empty';
    debug += '</code></pre><hr>';

    debug += 'Calculated statistic:<pre><code>';
    debug += escapeSpecialChars(JSON.stringify({
    	passagesRunCountActual: randomEventApp.randomEventStats.passagesRunCountActual,
    	passagesRunCountHistory: randomEventApp.randomEventStats.passagesRunCountHistory,
    	tagsRunCountActual: randomEventApp.randomEventStats.tagsRunCountActual,
    	tagsRunCountHistory: randomEventApp.randomEventStats.tagsRunCountHistory,
    }, null, 4));
    debug += '</code></pre>';

    return debug;
};

window.getDebug = () => {
    return State.variables.randomEventHistory !== undefined
        ? JSON.stringify(JSON.parse(State.variables.randomEventHistory), null, 4)
        : 'Currently empty';
}

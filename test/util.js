module.exports = {
  isValueInState: (state, valueToCheck) => {
    for (let i = 0; i < Object.keys(state).length; i++) {
      const value = state[Object.keys(state)[i]];
      if (value === valueToCheck) {
        return true;
      }
    }
  },
  noop: () => {},
};

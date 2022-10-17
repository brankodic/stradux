export const combineStateTransitioners = (stateTransitioners) => {
  const stateTransitionersKeys = Object.keys(stateTransitioners);
  return (state, event) => {
    const newState = {};
    stateTransitionersKeys.forEach((key) => {
      const stateTransitioner = stateTransitioners[key];

      // need to resolve the way initial state is set
      const prevTransitionedState = state?.[key];
      const newTransitionedState = stateTransitioner(prevTransitionedState, event);

      newState[key] = newTransitionedState;
    });

    return newState;
  };
};

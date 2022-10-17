export const createStore = (stateTransitioner, initialState, enhancer) => {
  if (typeof enhancer !== 'undefined') {
    return enhancer(createStore)(stateTransitioner, initialState);
  }

  // need to resolve the way initial state is set
  let state = stateTransitioner ? stateTransitioner() : initialState;

  const listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  const dispatch = (event) => {
    state = stateTransitioner(state, event);
    listeners.forEach((listener) => {
      listener();
    });
  };

  const getState = () => state;

  return { dispatch, getState, subscribe };
};

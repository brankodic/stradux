const compose = (...funcs) => {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args)),
  );
};

export const applyMiddleware =
  (...middlewares) =>
  (createStore) =>
  (...args) => {
    const store = createStore(...args);
    let dispatch = () => {};

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...argss) => dispatch(...argss),
    };

    const middlewaresChain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...middlewaresChain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };

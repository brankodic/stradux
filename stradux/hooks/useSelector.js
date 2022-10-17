import { useEffect, useReducer, useRef } from 'react';

import { useStore } from './useStore';

export const useSelector = (selector) => {
  const store = useStore();

  const [, forceUpdate] = useReducer((s) => s + 1, 0);

  const currentState = useRef();
  currentState.current = selector(store.getState());

  useEffect(
    () =>
      store.subscribe(() => {
        try {
          const nextState = selector(store.getState());
          if (nextState !== currentState.current) {
            forceUpdate();
          }
        } catch (err) {}
      }),
    [store, forceUpdate, selector],
  );

  return currentState.current;
};

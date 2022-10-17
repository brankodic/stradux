/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

import { StraduxContext } from './Context';

export const StraduxProvider = ({ store, children }) => {
  const { getState, dispatch, subscribe } = store;

  const value = useMemo(() => ({ getState, dispatch, subscribe }), [getState, dispatch, subscribe]);

  return <StraduxContext.Provider value={value}>{children}</StraduxContext.Provider>;
};

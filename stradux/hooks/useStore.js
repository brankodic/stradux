import { useContext } from 'react';

import { StraduxContext } from '../Context';

export const useStore = () => {
  const stradux = useContext(StraduxContext);

  if (stradux === undefined) {
    throw new Error('useStore must be used within a StraduxProvider');
  }

  return stradux;
};

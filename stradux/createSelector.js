const createPathArray = (pathString) => {
  const newString = pathString.replace(/\.|\[|\]/g, ' ').replace(/  +/g, ' ');
  return newString.split(' ');
};

export const createSelector = (paths, callbackFn) => (state) => {
  const selectedValues = paths.map((path) => {
    let selectedValue = { ...state };

    if (typeof path === 'function') {
      return path(state);
    }
    createPathArray(path).forEach((propertyName) => {
      selectedValue = selectedValue[propertyName];
    });

    return selectedValue;
  });

  if (callbackFn) {
    return callbackFn(...selectedValues);
  }

  if (selectedValues.length === 1) {
    return selectedValues[0];
  }

  return selectedValues;
};

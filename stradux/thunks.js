export const thunkMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (event) => {
    if (typeof event === 'function') {
      return event(dispatch, getState);
    }

    return next(event);
  };

const createEventType = (eventName) => ({
  request: `${eventName}/request`,
  success: `${eventName}/success`,
  error: `${eventName}/error`,
});

export const createThunk = (eventFn, eventName) => {
  const eventType = createEventType(eventName);

  const eventCreator =
    (...args) =>
    async (dispatch) => {
      const request = args;
      dispatch({ type: eventType.request, request });
      try {
        const payload = await eventFn(...args);
        dispatch({ type: eventType.success, request, payload });

        return payload;
      } catch (error) {
        dispatch({ type: eventType.error, request, error });

        return null;
      }
    };

  eventCreator.type = eventType;
  return eventCreator;
};

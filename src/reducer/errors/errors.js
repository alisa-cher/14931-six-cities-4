const initialState = {
  serverError: null
};

const ActionType = {
  SET_ERROR: `SET_ERROR`
};

const ActionCreator = {
  setError: (error) => ({
    type: ActionType.SET_ERROR,
    payload: error
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ERROR: return Object.assign({}, state, {
      serverError: action.payload
    });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};

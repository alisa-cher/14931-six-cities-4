const initialState = {
  city: {},
  sorting: `popular`,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORTING: `CHANGE_SORTING`
};

const ActionCreator = {
  setActiveLocation: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),

  setActiveSorting: (sorting) => ({
    type: ActionType.CHANGE_SORTING,
    payload: sorting
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY: return Object.assign({}, state, {
      city: action.payload
    });
    case ActionType.CHANGE_SORTING: return Object.assign({}, state, {
      sorting: action.payload
    });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};

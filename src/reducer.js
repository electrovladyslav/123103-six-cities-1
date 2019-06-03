import initialState from "./mocks/initial-state";
import adapter from "./adapter";

export const ActionTypes = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};

export const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionTypes.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  loadOffers: (offers) => {
    return {
      type: ActionTypes.LOAD_OFFERS,
      payload: offers,
    };
  },

  changeCity: (city) => ({
    type: ActionTypes.CHANGE_CITY,
    payload: city,
  }),
};

export const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`).then((response) => {
      dispatch(ActionCreator.loadOffers(adapter(response.data)));
    });
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload,
      });

    case ActionTypes.LOAD_OFFERS:
      return Object.assign({}, state, {
        allOffers: action.payload,
      });

    case ActionTypes.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
  }

  return state;
}

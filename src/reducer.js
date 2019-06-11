import initialState from "./mocks/initial-state";
import adapter from "./adapter";

export const ActionTypes = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_FAIL: `LOAD_FAIL`,
  CHANGE_ACTIVE_CITY: `CHANGE_ACTIVE_CITY`,
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

  loadFail: (message) => {
    return {
      type: ActionTypes.LOAD_FAIL,
      payload: message,
    };
  },

  changeActiveCity: (cityNumber) => ({
    type: ActionTypes.CHANGE_ACTIVE_CITY,
    payload: cityNumber,
  }),
};

export const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api
      .get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(adapter(response.data)));
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_ACTIVE_CITY:
      return Object.assign({}, state, {
        activeCityNumber: action.payload,
      });

    case ActionTypes.LOAD_OFFERS:
      return Object.assign({}, state, {
        allOffers: action.payload,
      });

    case ActionTypes.LOAD_FAIL:
      return Object.assign({}, state, {
        loading: action.payload,
      });

    case ActionTypes.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
  }

  return state;
}

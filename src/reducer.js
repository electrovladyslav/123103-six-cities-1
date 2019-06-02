import initialState from "./mocks/initial-state";
import api from "./api";
import adapter from "./adapter";
import {filterOffersByCity} from "./selectors";

export const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: `LOAD_OFFERS`,
      payload: offers,
    };
  },

  changeCity: (city) => ({
    type: `CHANGE_CITY`,
    payload: city,
  }),

  filterOffers: (offers, city) => {
    return {
      type: `GET_OFFERS`,
      payload: filterOffersByCity(offers, city),
    };
  },
};

export const Operation = {
  loadOffers: () => (dispatch) => {
    return api.get(`/hotels`).then((response) => {
      dispatch(ActionCreator.loadOffers(adapter(response.data)));
    });
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        city: action.payload,
      });

    case `GET_OFFERS`:
      return Object.assign({}, state, {
        offers: action.payload,
      });

    case `LOAD_OFFERS`:
      return Object.assign({}, state, {
        initialOffers: action.payload,
      });
  }

  return state;
}

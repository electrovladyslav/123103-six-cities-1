import initialState from "./mocks/initial-state";

export const filterOffersByCity = (offers, city) => {
  return offers.filter((offer) => offer.city.name === city.name);
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: `CHANGE_CITY`,
    payload: city,
  }),

  getOffers: (city) => {
    return {
      type: `GET_OFFERS`,
      payload: filterOffersByCity(initialState.initialOffers, city),
    };
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
  }

  return state;
}

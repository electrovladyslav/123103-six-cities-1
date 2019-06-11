import {createSelector} from "reselect";

import prepareCities from "./utils/prepareCities";

export const getAllOffers = (state) => {
  return state.allOffers;
};

export const getCities = (state) => {
  let cities = state.allOffers.map((offer) => offer.city);
  cities = prepareCities(cities);
  return cities;
};

// export const getActiveCity = (state) => {
//   return getCities(state)[state.activeCityNumber];
// };

export const getActiveCity = createSelector(
    (state) => {
      return state;
    },
    getCities,
    (state, cities) => {
      return cities[state.activeCityNumber];
    }
);

export const getLoadingStatus = (state) => {
  return state.loading;
};

export const filterOffersByCity = createSelector(
    getAllOffers,
    getActiveCity,
    (allOffers, city) => {
      if (allOffers.length && city) {
        return allOffers.filter((offer) => offer.city.name === city.name);
      } else {
        return [];
      }
    }
);

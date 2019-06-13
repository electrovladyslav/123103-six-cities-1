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

export const getActiveCityNumber = (state) => {
  return state.activeCityNumber;
};

export const getActiveCity = createSelector(
    getActiveCityNumber,
    getCities,
    (activeCityNumber, cities) => {
      return cities[activeCityNumber];
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

export const getAuthRequiredStatus = (state) => {
  return state.isAuthorizationRequired;
};


export const getUserEmail = (state) => {
  return state.user.email;
};

export const getUserAvatarUrl = (state) => {
  return state.user.avatar_url;
};

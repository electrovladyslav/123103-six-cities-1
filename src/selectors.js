import {createSelector} from "reselect";

export const getAllOffers = (state) => {
  return state.allOffers;
};

export const getCity = (state) => {
  return state.city;
};

export const filterOffersByCity = createSelector(
    getAllOffers,
    getCity,
    (allOffers, city) => {
      return allOffers.filter((offer) => offer.city.name === city.name);
    }
);

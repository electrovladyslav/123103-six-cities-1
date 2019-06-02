// import {createSelector} from "reselect";

// export const getInitialOffers = (state) => {
//   return state.initialOffers;
// };

// export const filterOffersByCity = createSelector(
//     (initialOffers, city) => {
//       return initialOffers.filter((offer) => offer.city.name === city.name);
//     }
// );
let cachedCity;
let cachedOffers;


export const filterOffersByCity = (offers, city) => {
  if (city !== cachedCity) {
    cachedCity = city;
    cachedOffers = offers.filter((offer) => offer.city.name === city.name);
  }
  return cachedOffers;
};

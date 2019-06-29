import {calcDistance} from "./calcDistance";

const getNearestOffers = (centerOffer, allOffers) => {
  const newOffers = allOffers.map((offer) => {
    offer.distance = calcDistance(
        centerOffer.location.latitude,
        centerOffer.location.longitude,
        offer.location.latitude,
        offer.location.longitude
    );
    return offer;
  });

  newOffers.sort((offer1, offer2) => {
    return offer1.distance - offer2.distance;
  });

  newOffers.forEach((offer) => {
    delete offer.distance;
  });

  return newOffers.slice(1, 4);
};

export default getNearestOffers;

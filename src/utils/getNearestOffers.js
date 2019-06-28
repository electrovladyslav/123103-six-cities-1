// import calcDistance from "./calcDistance";

const getNearestOffers = (allOffers) => {
  // const distances = allOffers.map((offer) => {
  //   return calcDistance(
  //       centerOffer.location.latitude,
  //       centerOffer.location.longitude,
  //       offer.location.latitude,
  //       offer.location.longitude
  //   );
  // });

  return allOffers.slice(1, 4);
};

export default getNearestOffers;

import {SortingVariants} from "../constants";

export default (sorting) => {
  switch (sorting) {
    case SortingVariants.HIGH_TO_LOW:
      return (offer1, offer2) => offer2.price - offer1.price;

    case SortingVariants.LOW_TO_HIGH:
      return (offer1, offer2) => offer1.price - offer2.price;

    case SortingVariants.TOP_RATED:
      return (offer1, offer2) => offer2.rating - offer1.rating;

    case SortingVariants.POPULAR:
    default:
      return () => {};
  }
};

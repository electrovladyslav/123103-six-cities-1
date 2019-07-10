export const Pathes = {
  BASE_URL: `https://es31-server.appspot.com/six-cities`,
  OFFERS: `hotels`,
  SIGN_IN: `login`,
  COMMENTS: `comments`,
  FAVORITE: `favorite`,
};

export const ServerResponseCode = {
  OK: 200,
  NOT_FOUND: 404,
  NOT_AUTHORIZED: 403,
  SERVER_ERROR: 500
};

export const ReviewConstants = {
  MIN_CHARACTERS: 50,
  MAX_CHARACTERS: 300,
  MAX_REVIEWS_PER_PAGE: 10,
};

export const MAX_OFFER_IMAGES = 6;
export const CITIES_QUANTITY = 6;
export const RATING_VALUES = [`perfect`, `good`, `not bad`, `badly`, `terribly`];
export const NEAR_OFFERS_QUANTITY = 3;
export const BookmarkSize = {
  BIG: {
    width: 31,
    height: 33,
  },
  NORMAL: {
    width: 18,
    height: 19,
  },
};

export const RentCardClassesEnum = {
  RENT_PLACE: `property`,
  RENT_CARD: `place-card`,
  FAVORITES: `favorites`
};

export const SortingVariants = {
  POPULAR: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`,
};

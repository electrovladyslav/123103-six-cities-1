import {reducer, filterOffersByCity} from "./reducer";

const initialState = {
  city: {
    name: `Amsterdam`,
    coordinates: [52.38333, 4.9],
    rentsCount: 312,
  },
  offers: [
    {
      isPremium: true,
      imageSource: `img/apartment-01.jpg`,
      price: 120,
      isBookmarked: false,
      rating: 4.5,
      name: `Beautiful & luxurious apartment at great location`,
      type: `Apartment`,
      coordinates: [52.3909553943508, 4.85309666406198],
    },
    {
      isPremium: false,
      imageSource: `img/room.jpg`,
      price: 80,
      isBookmarked: true,
      rating: 4,
      name: `Wood and stone place`,
      type: `Private room`,
      coordinates: [52.369553943508, 4.85309666406198],
    },
    {
      isPremium: false,
      imageSource: `img/apartment-02.jpg`,
      price: 132,
      isBookmarked: false,
      rating: 4,
      name: `Canal View Prinsengracht`,
      type: `Apartment`,
      coordinates: [52.3909553943508, 4.929309666406198],
    },
    {
      isPremium: true,
      imageSource: `img/apartment-03.jpg`,
      price: 180,
      isBookmarked: false,
      rating: 5,
      name: `Nice, cozy, warm big bed apartment`,
      type: `Apartment`,
      coordinates: [52.3809553943508, 4.939309666406198],
    },
  ],
};

it(`Offers filter correctly`, () => {
  expect(
      filterOffersByCity(
          [
            {city: `Amsterdam`},
            {city: `Moscow`},
            {city: `Amsterdam`},
            {city: `New York`},
          ],
          `Amsterdam`
      )
  ).toEqual([{city: `Amsterdam`}, {city: `Amsterdam`}]);

  expect(
      filterOffersByCity(
          [
            {city: `Amsterdam`},
            {city: `Moscow`},
            {city: `Amsterdam`},
            {city: `New York`},
          ],
          `Moscow`
      )
  ).toEqual([{city: `Moscow`}]);

  expect(
      filterOffersByCity(
          [
            {city: `Amsterdam`},
            {city: `Moscow`},
            {city: `Amsterdam`},
            {city: `New York`},
          ],
          `Barselona`
      )
  ).toEqual([]);
});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should change city correctly`, () => {
  expect(
      reducer(
          {
            city: {
              name: `Amsterdam`,
              coordinates: [52.38333, 4.9],
            },
            offers: [{
              coordinates: [1, 1],
            },
            {
              coordinates: [2, 2],
            }]
          },
          {
            type: `CHANGE_CITY`,
            payload: {
              name: `Melbourne`,
              coordinates: [-37.840935, 144.946457],
            },
          }
      )
  ).toEqual({
    city: {
      name: `Melbourne`,
      coordinates: [-37.840935, 144.946457],
    },
    offers: [{
      coordinates: [1, 1],
    },
    {
      coordinates: [2, 2],
    }]
  });
});

it(`Reducer should get offers correctly`, () => {
  expect(
      reducer(
          {
            city: {
              name: `Amsterdam`,
              coordinates: [52.38333, 4.9],
            },
            offers: [{
              coordinates: [1, 1],
            },
            {
              coordinates: [2, 2],
            }]
          },
          {
            type: `GET_OFFERS`,
            payload: [{
              coordinates: [3, 3],
            },
            {
              coordinates: [4, 4],
            }],
          }
      )
  ).toEqual({
    city: {
      name: `Amsterdam`,
      coordinates: [52.38333, 4.9],
    },
    offers: [{
      coordinates: [3, 3],
    },
    {
      coordinates: [4, 4],
    }]
  });
});

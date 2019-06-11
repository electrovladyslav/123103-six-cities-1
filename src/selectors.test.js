import {filterOffersByCity} from "./selectors";

const mockState = {
  activeCityNumber: 0,
  allOffers: [
    {
      city: {
        name: `Amsterdam`,
      },
    },
    {
      city: {
        name: `Moscow`,
      },
    },
    {
      city: {
        name: `Amsterdam`,
      },
    },
    {
      city: {
        name: `New York`,
      },
    },
  ],
};

const mockState1 = {
  activeCityNumber: 1,
  allOffers: [
    {
      city: {
        name: `Amsterdam`,
      },
    },
    {
      city: {
        name: `Moscow`,
      },
    },
    {
      city: {
        name: `Amsterdam`,
      },
    },
    {
      city: {
        name: `New York`,
      },
    },
  ],
};

const mockStateEmpty = {
  allOffers: []
};

it(`Offers filter correctly`, () => {
  expect(filterOffersByCity(mockState)).toEqual([
    {city: {name: `Amsterdam`}},
    {city: {name: `Amsterdam`}},
  ]);


  expect(filterOffersByCity(mockState1)).toEqual([
    {city: {name: `Moscow`}},
  ]);

  expect(filterOffersByCity(mockStateEmpty)).toEqual([]);
});

it(`Cached results for same city`, () => {
  const result1 = filterOffersByCity(mockState);
  const result2 = filterOffersByCity(mockState);
  expect(result1).toStrictEqual(result2);
});
